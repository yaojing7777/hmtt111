<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="default" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu1"></div>
        <div class="menu" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isChannelShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%',paddingTop: '1.2rem' }"
    >
     <ChannelPanel
       :active="active"
       :channels="channels"
       @change-active="
         active = $event;
         isChannelShow = false
         "
       @del-event="active = $event
       "
       >
      </ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'Home',
  components: {
    ArticleList, ChannelPanel
  },
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelShow: false
    }
  },
  methods: {
    // 三种情况
    // 1没有登录
    // 2没有登录，但是第二次打开
    // 3登录过
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && this.channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  // opacity: 0.2;
  border-radius: 32px;
  color: #fff;
}

/deep/ .van-nav-bar__title {
  max-width: unset;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}

/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}

.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 72px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}

/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
}

/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
