<template lang="pug">
.page-list.container.pt-3
  header.d-flex.align-items-end.mb-3
    h1 全部页面

    router-link.btn.btn-success.ml-auto(
      :to="{name: 'page.new'}",
    )
      i.bi.bi-plus.mr-2
      | 添加新页面

  .alert.alert-danger(
    v-if="message",
  ) {{message}}

  table.table.table-bordered
    thead
      tr
        th ID
        th 二级目录
        th 作者
        th 创建时间
        th 更新时间
        th 发布时间
        th
    tbody
      tr(v-for="(item, index) in list", :key="item.id")
        td {{item.id}}
        td
          router-link(
            :to="{name: 'page.edit', params: {id: item.id, data: item}}",
          ) {{item.subDomain}}
        td {{item.author && item.author.username}}
        td {{item.createdAt}}
        td {{item.updatedAt}}
        td {{item.publishedAt}}
        td.btn-group-sm
          button.btn.btn-danger(
            type="button",
            @click="doRemove(item, index)",
            :disabled="item.isSaving",
          )
            span.spinner-border.spinner-border-sm(v-if="item.isSaving")
            i.bi.bi-trash-fill(v-else)
</template>

<script>
import {Query} from "leancloud-storage";
import {POSTS_TABLE} from "@/data/constant";
import {datetime} from "@/utils/format";

export default {
  data() {
    return {
      isLoading: false,
      isLoaded: false,
      message: null,
      list: [],
    };
  },

  methods: {
    async doRemove(item) {
      if (!confirm('删除的楼盘无法恢复，您确定要删除么？')) {
        return;
      }
      item.model.set('deletedAt', Date.now());
      await item.model.save();
      this.list.splice(index, 1);
    },
  },

  async beforeMount() {
    this.isLoading = true;
    this.message = null;
    const query = new Query(POSTS_TABLE)
      .include('author')
      .doesNotExist('deletedAt')
      .descending('createdAt');
    try {
      this.count = await query.count();
      const results = await query
        .limit(20)
        .skip(0)
        .find();
      this.list = results.map(item => {
        const json = item.toJSON();
        return {
          ...json,
          createdAt: datetime(json.createdAt),
          updatedAt: datetime(json.updatedAt),
          publishedAt: datetime(json.publishedAt),
          model: item,
          id: item.id,
          isSaving: false,
        };
      });
    } catch (e) {
      this.message = '加载数据失败。' + e.message;
    }
    this.isLoading = false;
  },
}
</script>
