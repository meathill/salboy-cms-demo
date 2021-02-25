<template lang="pug">
dl.list-editor(@change="onChange")
  template(v-for="(item, index) in localValue")
    text-editor(
      ref="title",
      v-model="item.title",
      tag-name="dt",
      placeholder="标题",
    )
    text-editor(
      ref="content",
      v-model="item.content",
      tag-name="dd",
      placeholder="内容",
    )
    dd.delete-button
      button.btn.btn-outline-danger.btn-sm(
        type="button",
        @click="doRemoveItem(index)",
      ) &times;
  dt.action-bar
    button.btn.add-button.btn-outline-info(
      type="button",
      @click="doAddItem",
    ) 添加

</template>

<script>

import TextEditor from "@/components/editor/text-editor";
export default {
  components: {TextEditor},
  props: {
    value: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      localValue: null,
    };
  },

  methods: {
    async doAddItem() {
      this.localValue.push({
        title: '标题',
        content: '内容',
        isEditing: true,
      });
      await this.$nextTick();
      const index = this.localValue.length - 1;
      this.$refs.title[index].doStartEdit();
      this.$refs.content[index].isEditing = true;
      this.onChange();
    },
    doRemoveItem(index) {
      this.localValue.splice(index, 1);
      this.onChange();
    },

    onChange() {
      this.$emit('input', this.localValue);
    },
  },

  beforeMount() {
    this.localValue = [...this.value];
  }
}
</script>
