<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in newList"
          :key="index"
          :article="item"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResult } from '@/api/search'
export default {
  components: {
    ArticleItem
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      newList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 数据加载完
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.newList.push(...res.data.data.results)
        this.loading = false
        // console.log(this.newList)
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      // 清空列表数据
      this.newList = []
      // this.finished = false
      this.page = 1

      // 重新加载数据
      this.getSearchResult()
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>