<template lang="pug">
.editor.single-post
  header.header-banner
    .container.full-width
      uploader(
        hint="头图，请上传图片，尺寸 1440x600，格式为 JPG",
      )

  .container.summary.full-width
    .summary-info.section
      text-editor.summary-title(
        tag-name="h1",
        v-model="title",
      )
      text-editor.address(
        tag-name="p",
        v-model="address"
      )
      text-editor.info(
        tag-name="p",
        v-model="description",
        :is-multiline="true",
        :is-markdown="true",
      )

      list-editor.summary-details(
        v-model="summary",
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
      v-model="gallery",
    )

  .container.peripheral.section.mt-row
    h2 周边配套
    .peripheral-content

  .container.attributes.section.mt-row
    h2 房屋属性
    house-type-editor(
      v-model="houseType",
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
    h2 泰国
    article

  .container.city.section.mt-row
    h2 曼谷
    article

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
import TextEditor from '@/components/editor/text-editor';
import Uploader from "@/components/editor/uploader";
import GalleryEditor from "@/components/editor/gallery-editor";
import HouseTypeEditor from "@/components/editor/house-type-editor";
import ListEditor from '@/components/editor/list-editor';

export default {
  components: {
    HouseTypeEditor,
    GalleryEditor,
    TextEditor,
    Uploader,
    ListEditor,
  },

  data() {
    return {
      title: 'Vue全家桶+Nuxt.js+Serverless 全栈开发企业分销系统',
      address: '5 Saladaeng soi 1 , Rama IV Rd., Silom , Bangrak , Bangkok 10500 Thailand',
      description: 'All Inspire Development Co.,Ltd. 集团所有项目均集中于BTS 沿线，由于集团选址，均选择轻轨可以步行到达距离，并且总价均在250万泰铢（50万人民币）左右，很适合大部分普通民众以及初级投资者投资，所以集团所开发项目均在开盘或事建成后即告售罄。',
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
      ]
    };
  },
}
</script>
