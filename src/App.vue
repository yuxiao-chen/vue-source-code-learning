<template>
  <div id="app">
    <!-- vue-router 示例 -->
    <div>
      <CVueRouterLink to="/">home</CVueRouterLink>
      |
      <CVueRouterLink to="/about">about</CVueRouterLink>
      <h3> CVueRouterLink: </h3>
      <CVueRouterView></CVueRouterView>
      <h3>CVueRouterLink End.</h3>
    </div>
    <!-- vuex 示例 -->
    <div>
      <h3>
        CVuex:
      </h3>
      <div>
        <h4>boys {{$store.state.boysTotal}} + girls {{$store.state.girlsTotal}} = {{$store.getters.peopleTotal}}</h4>
        <button @click="$commit('addBoy')">boys++</button>
        |
        <button @click="$dispatch('asyncAddGirl')">async girls++</button>
      </div>
      <h3>
        Cvuex End.
      </h3>
    </div>
    <!-- 组件化 示例 -->
    <CForm ref="formTable" :model="userInfo" :rules="rules">
      <CFormItem label="用户名" prop="name">
        <CInput v-model="userInfo.name" placeholder="请输入..."></CInput>
      </CFormItem>
      <CFormItem label="密码" prop="pwd">
        <CInput type="password" v-model="userInfo.pwd"></CInput>
      </CFormItem>
      <CFormItem>
        <button @click="submit">提交</button>
      </CFormItem>
    </CForm>
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import CNotice from './components/CNotice';
import CForm from './components/form/CForm';
import CFormItem from './components/form/CFormItem';
import CInput from './components/form/CInput';
import Create from './utils/create';
export default {
  name: 'App',
  data() {
    return {
      userInfo: {
        name: '123',
        pwd: '',
      },
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    }
  },
  components: {
    // HelloWorld, 
    CInput, CFormItem, CForm
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    submit() {
      this.$refs.formTable.validate(e=>{
        console.log('validate', e)
        let msg = e ? '验证成功' : '验证失败' ;
         // 创建notice实例
        Create(CNotice, {
          title: '!!!村长喊你来搬砖!!!',
          message: msg,
          duration: 3000
        }).show()
      })
    }
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
