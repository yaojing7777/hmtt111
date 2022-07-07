<template>
  <van-button
              :disabled="isAjax"
              :loading="isAjax"
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              :icon="value ? '' : 'plus'"
              :plain="value"
              @click="onclick"
              >{{ value ? "已关注" : "关注" }}</van-button
            >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  data () {
    return {
      isAjax: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onclick () {
      this.isAjax = true
      if (this.value) {
        try {
          await delUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  }

}
</script>

<style lang="less" scoped>

</style>