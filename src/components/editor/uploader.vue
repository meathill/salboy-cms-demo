<template lang="pug">
.uploader
  .preview(v-if="previewSrc", :class="isUploaded ? '' : 'temp'")
    img(:src="previewSrc")
    .uploading(v-if="isUploading") 上传中...
    .uploaded.text-success(v-if="isUploaded")
      i.fas.fa-check.mr-2
      | 已上传

  input(
    ref="file",
    type="file",
    :id="'uploader-input-' + count",
    :accept="accept",
    :multiple="multiple",
    @change="onChange",
  )

  .uploader-inner
    .p-3
      p
        small.text-white(v-if="hint") {{hint}}
      label.btn.btn-secondary(
        :for="'uploader-input-' + count",
        :class="size ? 'btn-' + size: ''",
      )
        slot
          i.fas.fa-upload.mr-2
          | {{label}}
      .alert.alert-danger(v-if="error") {{error}}
</template>

<script>

let count = 0;

export default {
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Upload',
    },
    hint: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isUploading: false,
      isUploaded: false,
      count: 0,
      previewSrc: null,
      error: null,
    };
  },

  methods: {
    async onChange({target}) {
      const {files} = target;
      if (files.length === 0) {
        return;
      }

      const [file] = files;
      const {name} = file;
      this.previewSrc = URL.createObjectURL(file);
      this.isUploading = true;

      /*
      const formData = new FormData();
      formData.append('file', file);
      const avFile = new AV.File(name, file);
      try {
        const result = await avFile.save({
          onprogress: progress => {

          },
        });
      } catch (e) {
        this.error = e.message;
      }

      const url = avFile.url();
      */
      this.$refs.file.value = '';
    },
  },

  created() {
    this.count = count;
    count++;
  },
}
</script>
