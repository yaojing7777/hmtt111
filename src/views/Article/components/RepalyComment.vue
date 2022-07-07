<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon
        name="cross"
      />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复"></van-cell>
    <CommentItem :item="item" v-for="item in list" :key="item.com_id">
    </CommentItem>
    <div class="addfn"></div>
    <div class="bottom">
        <van-button type="primary" block round plain
        @click="isAddCommentShow = true"
        >评论</van-button>
    </div>
    <!-- // -->
    <van-popup position="bottom" v-model="isAddCommentShow">
        <AddComment
         :target="comment.com_id"
         :art_id="$route.params.article_id"
         v-if="isAddCommentShow"
         @add-comment="list.unshift($event);
         isAddCommentShow = false
         comment.reply_count++
         "
         ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment'
import { getCommentList } from '@/api/commentjs'
import CommentItem from '@/components/CommentItem.vue'
export default {
  data () {
    return {
      offset: null,
      limit: 9,
      list: [],
      isAddCommentShow: false
    }
  },
  created () {
    this.getCommentList()
  },
  components: {
    CommentItem, AddComment
  },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment{
    margin-top: 46px;
}
.addfn {
    margin-bottom: 108px;
}
.bottom{
    width: 750px;
    position: fixed;
    bottom: 0;
    padding: 10px 30px;
    box-sizing: border-box;
    background-color: pink;
}

</style>