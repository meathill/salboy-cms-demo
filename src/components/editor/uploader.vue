<template lang="pug">
.uploader
  .preview(v-if="previewSrc", :class="isUploaded ? '' : 'temp'")
    img(
      v-if="hasPreview",
      :src="previewSrc",
    )
    .uploading(v-if="isUploading") 上传中... {{progress}}%
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
    .p-3(v-if="hint")
      p
        small.text-white {{hint}}
      label.btn.btn-secondary(
        :for="'uploader-input-' + count",
        :class="size ? 'btn-' + size: ''",
      )
        slot
          i.fas.fa-upload.mr-2
          | {{label}}
      .alert.alert-danger(v-if="error") {{error}}

    label.btn.btn-secondary(
      v-else,
      :for="'uploader-input-' + count",
      :class="size ? 'btn-' + size: ''",
    )
      slot
        i.fas.fa-upload.mr-2
        | {{label}}
    .alert.alert-danger(v-if="error") {{error}}
</template>

<script>
import {File} from 'leancloud-storage';
import {sleep}  from '@/utils/helper';
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
    hasPreview: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isUploading: false,
      isUploaded: false,
      count: 0,
      previewSrc: null,
      error: null,
      progress: null,
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
      let url = URL.createObjectURL(file)
      this.previewSrc = url;
      this.isUploading = true;
      this.$emit('start', name);

      const avFile = new File(name, file);
      try {
        await avFile.save({
          onprogress: event => {
            const {total, loaded} = event;
            this.progress = Math.round(loaded / total * 10000) / 100;
          },
        });
      } catch (e) {
        this.error = e.message;
      }

      url = avFile.url();
      this.previewSrc = url;
      this.$emit('change', url, name);
      this.$refs.file.value = '';
      this.isUploading = false;
    },
  },

  created() {
    this.count = count;
    count++;
  },
}
</script>
