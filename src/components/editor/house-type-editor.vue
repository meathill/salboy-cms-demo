<template lang="pug">
.house-type-editor(@change="onChange")
  button.btn.btn-outline-primary.btn-sm.edit-button(
    type="button",
    @click="isEditing = !isEditing",
  ) 编辑

  table.table.table-bordered
    thead
      tr
        th(v-for="type in houseType") {{type.title}}

    tbody
      tr(v-for="item in localValue")
        td(
          v-for="type in houseType",
        )
          template(v-if="isEditing")
            input.form-control(
              v-if="type.type !== 'select'",
              v-model="item[type.id]",
              :type="type.type",
              :min="type.min",
              :max="type.max",
            )
            select.form-control(
              v-else,
              v-model="item[type.id]",
            )
              option(v-for="v in type.values", :value="v") {{v}}
          template(v-else) {{item[type.id]}}
</template>

<script>
import {houseType} from '@/data/constant';

export default {
  props: {
    value: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      houseType,
      localValue: null,
      isEditing: false,
    };
  },

  methods: {
    onChange() {
      this.$emit('input', this.localValue);
    },
  },

  beforeMount() {
    this.localValue = [...this.value];
  }
}
</script>
