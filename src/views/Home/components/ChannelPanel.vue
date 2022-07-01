<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button size="mini" plain type="danger" round @click="isCloseShow = !isCloseShow">{{isCloseShow?"完成":"编辑"}}</van-button>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="index">
          <div @click="onClick(index)"  class="inner" :style="{ color: active === index ? 'red' : '' }">
            {{ item.name }}
            <van-icon
              name="close"
              size="20px"
              v-if="index !==0"
              v-show="isCloseShow"
              @click="subFn(item.id)"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <br />
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col
          span="6"
          v-for="(item, index) in recommendChannels"
          :key="index"
        >
          <div class="inner van-ellipsis" @click="addFn(item.id)">+{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Channels',
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    addFn (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    subFn (id) {
      const index = this.channels.findIndex(item => item.id === id)
      this.recommendChannels.push(this.channels[index])
      this.channels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        // const obj = this.channels[index]
        // this.channels.splice(index, 1)
        // this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  watch: {
    channels: {
      async handler (newVal) {
        console.log(123)
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          //
          console.log(123)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          // 先把频道数据处理一下
          try {
            console.log(111)
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 0 24px;
    margin-bottom: 16px;
    h3 {
      font-size: 35px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
}

.inner {
  position: relative;
  width: 160px;
  height: 86px;
  line-height: 86px;
  background: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  text-align: center;
  margin-left: 14px;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(20%, -50%);
  }
}

.van-col {
  margin-bottom: 20px;
}
</style>>
