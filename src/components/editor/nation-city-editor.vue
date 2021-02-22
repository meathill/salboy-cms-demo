<template lang="pug">
.nation-city-editor(@change="onChange")
  .row
    .col-sm-6
      text-editor(
        tag-name="h2",
        v-model="localValue.title",
      )

    .col-sm-2
      button.btn.btn-outline-primary(
        type="button",
        @click="doSave",
      ) 保存

    .col-sm-2
      select.form-control(
        v-model="selectedItem",
        @change="doSelect",
      )
        option(
          v-for="(item, index) in items",
          :value="index",
        ) {{item.title}}

  text-editor(
    tag-name="article",
    :is-multiline="true",
    v-model="localValue.article",
  )
</template>

<script>
import {mapState} from 'vuex';
import capitalize from 'lodash/capitalize';
import TextEditor from "@/components/editor/text-editor";
import {MUTATIONS} from "@/store";

export default {
  components: {TextEditor},

  props: {
    value: {
      type: Object,
      default: null,
    },
    stateKey: {
      type: String,
      default: 'nations',
    },
  },

  computed: {
    ...mapState({
      items(state) {
        return state[this.stateKey];
      },
    }),
  },

  data() {
    return {
      localValue: null,
      selectedItem: null,
    };
  },

  methods: {
    doSave() {
      this.$store.commit(MUTATIONS['SET_' + this.stateKey.toUpperCase()], this.localValue);
    },
    doSelect() {
      const data = this.items[this.selectedItem];
      this.localValue = {
        ...data,
      };
      this.onChange();
    },
    onChange() {
      this.$emit('input', this.localValue);
    },
  },

  beforeMount() {
    this.$store.dispatch(`get${capitalize(this.stateKey)}`);
    this.localValue = {
      ...this.value,
    };
  },
}
</script>
