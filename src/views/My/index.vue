<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span>风景旧曾谙</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>沙</p>
          <p>头条</p>
        </li>
        <li>
          <p>雕</p>
          <p>头条</p>
        </li>
        <li>
          <p>余</p>
          <p>头条</p>
        </li>
        <li>
          <p>虎</p>
          <p>头条</p>
        </li>
      </ul>
    </div>
    <!-- 登陆前 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid class="nav-grid" :column-num="2" clickable>
      <van-grid-item text="收藏" to="/home">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字" to="/home">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小虎同学"  is-link/>
    </van-cell-group>
    <van-button class="loginout" type="default" block v-if="user && user.token" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  // opacity: 0.8;
  background: rgba(50, 150, 250) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}

.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }

  p {
    font-size: 28px;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
    padding-left: 6.5px;
    margin: 0;
  }
}

.header-login {
  padding-top: 116px;
  .avatar {
    padding: 0 32px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    .button {
      width: 115px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: 400;
      color: #666666;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
        margin-left: 20px;
      }
    }
  }

  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #fff;
        font-weight: 400;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}

.nav-grid {
  background: #fff;
  .toutiao {
    font-size: 45px;
  }
  .toutiao-shoucang {
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}

.van-cell-group{
  margin: 9px 0;
}
.loginout{
  color: #d86262;
}
</style>
