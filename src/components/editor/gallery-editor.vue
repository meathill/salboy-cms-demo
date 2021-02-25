<template lang="pug">
.gallery-editor(@change="onChange")
  .swiper-container.gallery-top(ref="top")
    .swiper-wrapper
      .swiper-slide(
        v-for="item in localValue",
      )
        img(
          :src="item.image",
          :alt="item.title",
        )
    .swiper-button-next.swiper-button-white(ref="next")
    .swiper-button-prev.swiper-button-white(ref="prev")
  .swiper-container.gallery-thumbnails(ref="thumbnails")
    .swiper-wrapper
      .swiper-slide(
        v-for="(item, index) in localValue",
      )
        img(
          :src="item.image",
          :alt="item.title",
        )
        .form-group
          input(v-model="item.title")
        button.btn.btn-outline-danger.btn-sm.delete-button(
          type="button",
          @click="doRemove(index)",
        ) &times;

      .swiper-slide.add-image-button
        uploader(
          v-model="image",
          @change="onUploaded",
          :has-preview="false",
          title="插入图片",
        )
</template>

<script>
import Swiper from 'swiper';
import Uploader from "@/components/editor/uploader";
import base from "@/components/editor/base";

export default {
  mixins: [base],
  components: {Uploader},
  props: {
    value: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      localValue: [],
      image: null,
    };
  },

  methods: {
    doRemove(index) {
      this.localValue.splice(index, 1);
      this.onChange();
    },

    async onUploaded(url, name) {
      this.localValue.push({
        image: url,
        title: name,
      });
      await this.$nextTick();
      this.thumbnails.update();
      this.top.update();
      this.onChange();
    },

    onChange() {
      this.$emit('input', this.localValue);
    },
  },

  beforeMount() {
    this.localValue = [...this.value];
  },

  mounted() {
    const thumbnails = this.thumbnails = new Swiper(this.$refs.thumbnails, {
      spaceBetween: 0,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    this.top = new Swiper(this.$refs.top, {
      spaceBetween: 10,
      navigation: {
        nextEl: this.$refs.next,
        prevEl: this.$refs.prev,
      },
      thumbs: {
        swiper: thumbnails
      },
    });
  },
}
</script>
