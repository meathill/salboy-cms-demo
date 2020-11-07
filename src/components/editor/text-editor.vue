<template lang="pug">
.text-editor(v-if="isEditing")
  input.form-control(
    ref="input",
    v-model="localValue",
    @blur="doStopEdit",
    :style="style",
  )

component.text-editor-static(
  v-else,
  :is="tagName",
  @click="doStartEdit",
) {{value}}
</template>

<script>
export default {
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isEditing: false,
      style: null,
      localValue: null,
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
    this.style = {
      fontSize,
      lineHeight,
      color,
      fontWeight,
      marginBottom,
    };
  },
}
</script>
