<template lang="pug">
.editor.single-post(@change="isChanged = true")
  .container
    h2 页面属性
    .row

      .col-sm-6
        .form-group
          label(for="sub-domain") 目录名
          input#sub-domain.form-control(
            v-model="formData.subDomain",
          )
        .form-group
          label(for="keywords") 关键词
          input#keywords.form-control(
            v-model="formData.keywords",
          )

        .form-group
          label(for="description") 描述
          textarea#description.form-control(
            v-model="formData.description",
            rows="2",
          )
      .col-sm-6
        .alert.alert-danger(v-if="message") {{message}}

        button.btn.btn-lg.btn-primary(
          type="button",
          @click="doSave",
          :disabled="isSaving",
        )
          span.spinner-border.spinner-border-sm.mr-2(v-if="isSaving")
          i.bi.bi-check.mr-2(v-else)
          | 保存
  header.header-banner
    .container.full-width
      uploader(
        hint="头图，请上传图片，尺寸 1440x600，格式为 JPG",
        v-model="content.header",
      )

  .container.summary.full-width
    .summary-info.section
      text-editor.summary-title(
        tag-name="h1",
        v-model="content.title",
      )
      text-editor.address(
        tag-name="p",
        v-model="content.address"
      )
      text-editor.info(
        tag-name="p",
        v-model="content.info",
        :is-multiline="true",
        :is-markdown="true",
      )

      list-editor.summary-details(
        v-model="content.summary",
      )

    aside.summary-aside
      section.sales.section
        h5 销售奖励
        p 免费注册 查看项目佣金

      section.owner.section
        h5 卖家
        p 免费注册
        p 查询开发商项目方并在线直连
        a.btn.btn-danger.register-button(href="#") 搜项目免费注册

  .container.gallery.section.mt-row
    h2 楼盘效果图
    gallery-editor.gallery-photos(
      v-model="content.gallery",
    )

  .container.peripheral.section.mt-row
    h2 周边配套
    .peripheral-content

  .container.attributes.section.mt-row
    h2 房屋属性
    house-type-editor(
      v-model="content.houseType",
    )
    table.table.attributes-table

    .d-flex
      section.floor-plan
        h3 户型图
        .floor-plan-image

      section.recommended
        h3 推荐理由
        .recomended-text

  .container.location.section.mt-row
    h2 位置

  .container.introduction.section.mt-row
    h2 楼盘介绍
    article

  .container.nation.section.mt-row
    nation-city-editor(
      v-model="content.nation",
    )

  .container.city.section.mt-row
    nation-city-editor(
      v-model="content.city",
      state-key="city",
    )

  .container.download.section.mt-row
    h2 资料下载
    p.description 资料包含：楼盘详情、户型介绍、价格明细、如何贷款、商圈介绍、国家城市介绍
    a.btn.btn-danger.download-button(href="#") 下载资料

  footer#the-footer.container.full-width.mt-row
    h3 400-123-1233
    p 全国统一服务热线(工作日6:00-24:00)
    p 地址：成都市锦江区新光华街7号航天科技大厦4301
    p Email：www.baidu.com
    p Copyright © 2012 www.baidu.com All Rights Reserved

</template>

<script>
import each from 'lodash/each';
import TextEditor from '@/components/editor/text-editor';
import Uploader from "@/components/editor/uploader";
import GalleryEditor from "@/components/editor/gallery-editor";
import HouseTypeEditor from "@/components/editor/house-type-editor";
import ListEditor from '@/components/editor/list-editor';
import NationCityEditor from "@/components/editor/nation-city-editor";
import {Query} from "leancloud-storage";
import {POST_CONTENT_TABLE, POSTS_TABLE} from "@/data/constant";
import Post from "@/model/Post";
import PostContent from "@/model/PostContent";

export default {
  components: {
    NationCityEditor,
    HouseTypeEditor,
    GalleryEditor,
    TextEditor,
    Uploader,
    ListEditor,
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    meta() {
      return this.$route.params.data;
    },
  },

  data() {
    return {
      isSaving: false,
      isChanged: false,
      message: null,
      formData: {
        keywords: '',
        description: '',
        subDomain: '',
      },
      content: {
        title: 'Vue全家桶+Nuxt.js+Serverless 全栈开发企业分销系统',
        address: '5 Saladaeng soi 1 , Rama IV Rd., Silom , Bangrak , Bangkok 10500 Thailand',
        info: 'All Inspire Development Co.,Ltd. 集团所有项目均集中于BTS 沿线，由于集团选址，均选择轻轨可以步行到达距离，并且总价均在250万泰铢（50万人民币）左右，很适合大部分普通民众以及初级投资者投资，所以集团所开发项目均在开盘或事建成后即告售罄。',
        gallery: [],
        houseType: [
          {
            number: 5,
            price: 10000,
            status: '待售',
          },
        ],
        summary: [
          {
            title: '规划面积',
            label: '31413万平方米',
          },
          {
            title: '产权年限',
            label: '永久产权',
          },
          {
            title: '户数',
            label: '5624',
          },
          {
            title: '交房日期',
            label: '2019年第三季度',
          },
        ],
        nation: {
          title: '国家',
          description: '国家描述',
        },
        city: {
          title: '城市',
          description: '城市描述',
        },
      },
    };
  },

  methods: {
    async getPageData() {
      let query;
      let post;
      if (!this.meta) {
        query = new Query(POSTS_TABLE);
        post = await query.get(this.id);
      } else {
        post = this.meta.model;
      }
      const postJson = post.toJSON();
      this.formData = {
        ...this.formData,
        ...postJson,
      };
      this.postModel = post;
      query = new Query(POST_CONTENT_TABLE);
      query.equalTo('post', post);
      const result = await query.find();
      if (!result || result.length === 0) {
        alert('Not exists');
        return;
      }
      const [content] = result;
      this.content = content.toJSON();
      this.contentModel = content;
    },
    async doSave() {
      if (this.$el.querySelector(':invalid')) {
        alert('表单有误，请检查后再提交。');
        return;
      }

      this.isSaving = true;
      const isNew = !this.id;

      // 保存 posts
      const {keywords, description, subDomain} = this.formData;
      each({keywords, description, subDomain}, (value, key) => {
        this.postModel.set(key, value);
      });
      try {
        await this.postModel.save();
        if (isNew) {
          const id = this.postModel.id;
          this.$router.push({
            name: 'page.edit',
            params: {
              id,
            },
          });
        }
      } catch (e) {
        this.message = '保存页面属性失败。' + e.message;
      }

      // 保存 post_content
      each(this.content, (key, value) => {
        this.contentModel.set(key, value);
      });
      if (isNew) {
        this.contentModel.set('post', this.postModel);
      }
      try {
        await this.contentModel.save();
      } catch (e) {
        this.message = '保存页面内容失败。' + e.message;
      }

      this.isSaving = false;
    },
  },

  beforeMount() {
    if (this.id) {
      this.getPageData();
    } else {
      this.postModel = new Post();
      this.contentModel = new PostContent();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.isChanged && !confirm('当前页面内容已修改，但尚未保存，是否离开？')) {
      return;
    }
    next();
  },
}
</script>
