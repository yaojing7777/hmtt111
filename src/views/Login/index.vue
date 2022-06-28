<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
        <van-icon name="cross" slot="left"/>
    </van-nav-bar>

  <van-form @submit="onSubmit" ref='form'>
  <van-field
    v-model.trim="mobile"
    name="mobile"
    placeholder="手机号"
    :rules="[
    { required: true, message: '请填写手机号' },
    { pattern:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/,message: '手机号码不符合' }
    ]"
  >
    <i class="toutiao toutiao-shouji" slot="left-icon"></i>
  </van-field>
  <van-field
    v-model.trim="code"
    type="password"
    name="code"
    placeholder="验证码"
    :rules="[
    { required: true, message: '请填写验证码' },
    { pattern: /^\d{6}$/, message: '验证码长度必须是6位' }
    ]"
  >
    <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
    <!-- <MyIcon :name='yanzhengma'></MyIcon> -->
    <template #button>
      <van-count-down v-if="isShow" :time='time' format="ss s"
      @finish="isShow = false"/>
      <van-button @click="onSendSms" v-else native-type="button" size="small">发送验证码</van-button>
    </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button round block class="login-btn" native-type="submit">登录</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '15512345678',
      code: '246810',
      time: 5 * 1000,
      isShow: false // 默认不显示倒计时
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        // token有效期2小时， 两种思路
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送失败')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
        // console.log('校验通过')
      } catch (err) {
        // console.log('校验失败')
        this.$toast.fail('手机格式不对')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.toutiao {
    font-size: 37px;
}

// /deep/ .van-field__label {
//     width: 70px !important;
// }

.login-btn{
    width: 694px;
    height: 88px;
    background-color: #6db4fb;
    border-radius: 10px;
    color: #ffffff;
    font-size: 30px;
}
</style>