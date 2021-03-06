<template lang="pug">
.text-editor(v-if="isEditing")
  form.text-editor-editing(
    @submit.prevent="doStopEdit",
  )
    textarea.form-control(
      v-if="isMultiline",
      ref="input",
      v-model="localValue",
      @blur="onBlur",
      :placeholder="placeholder",
      :style="style",
    )
    input.form-control(
      v-else,
      ref="input",
      v-model="localValue",
      @blur="onBlur",
      :placeholder="placeholder",
      :style="style",
    )

    .action-bar.btn-group-sm.p-2
      uploader(
        v-if="isMarkdown",
        size="sm",
        title="插入图片",
        :has-preview="false",
        @start="onUploaderStart",
        @change="onUploaderComplete",
      ) 插入图片

      button.btn.btn-primary.ml-auto
        i.bi.bi-check
      button.btn.btn-secondary.ml-2(
        type="button",
        @click="doCancel",
      )
        i.bi.bi-x

component.text-editor-static(
  v-else,
  :is="tagName",
  @click="doStartEdit",
)
  article(v-if="isMarkdown", v-html="mdContent")
  template(v-else) {{value}}
</template>

<script>
import marked from 'marked';
import Uploader from "@/components/editor/uploader";
import base from './base';

export default {
  components: {Uploader},
  mixins: [base],
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    isMultiline: {
      type: Boolean,
      default: false,
    },
    isMarkdown: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },

  computed: {
    mdContent() {
      return marked(this.localValue);
    },
  },

  data() {
    return {
      isEditing: false,
      style: null,
    };
  },

  methods: {
    async doStartEdit() {
      this.isEditing = true;
      await this.$nextTick();
      this.$refs.input.select();
      this.$refs.input.focus();
    },
    doStopEdit() {
      this.isEditing = false;
      this.$emit('input', this.localValue);
    },
    doCancel() {
      this.isEditing = false;
      this.localValue = this.value;
    },

    onBlur() {
      if (!this.localValue || this.localValue === this.value) {
        this.doCancel();
      }
    },
    onUploaderStart(name) {
      const {input} = this.$refs;
      const placeholder = `![Uploading ${name}]`;
      if (input.selectionStart || input.selectionStart === 0) {
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        this.localValue = input.value.substring(0, startPos)
          + placeholder
          + input.value.substring(endPos);
      } else {
        this.localValue += placeholder;
      }
    },
    onUploaderComplete(url, name) {
      const placeholder = `![Uploading ${name}]`;
      this.localValue = this.localValue.replace(placeholder, `![${name}](${url})`);
    },
  },

  beforeMount() {
    this.localValue = this.value;
  },

  mounted() {
    const style = getComputedStyle(this.$el);
    const fontSize = style.getPropertyValue('font-size');
    const color = style.getPropertyValue('color');
    const lineHeight = style.getPropertyValue('line-height');
    const fontWeight = style.getPropertyValue('font-weight');
    const marginBottom = style.getPropertyValue('margin-bottom');
    const rect = this.$el.getBoundingClientRect();
    this.style = {
      fontSize,
      lineHeight,
      color,
      fontWeight,
      marginBottom,
      height: this.isMultiline ? rect.height + 'px' : lineHeight,
    };
  },
}
</script>
