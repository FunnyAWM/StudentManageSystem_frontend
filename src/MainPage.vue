<script setup>
import {inject, ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from "axios";

const token = inject('token')
const router = useRouter()
const notSelected = ref(true)
const username = inject('adminName')
const actions = [
  {route: '/login', id: 'button-login', text: '管理员登录'},
  {route: '/add', id: 'button-add', text: '添加学生'},
  {route: '/delete', id: 'button-delete', text: '删除学生'},
  {route: '/query', id: 'button-query', text: '查询学生'},
  {route: '/update', id: 'button-update', text: '更新学生'}
]

function handleClick(route) {
  if (route !== '/login') {
    if (token.token === '') {
      alert("请先登录！")
      notSelected.value = false
      router.push('/login')
      return
    }
    axios
        .post("/token/verify", {token: token.token})
        .then(() => {
          notSelected.value = false
          router.push(route)
        })
        .catch(() => {
          alert("token已失效，请重新登录！")
          router.push('/login')
        })
  } else if (username.name !== '未登录') {
    alert('用户已登录！')
    return
  }
  notSelected.value = false
  router.push(route)
}
</script>
<template>
  <div v-if="notSelected" id="welcome">
    <h1>欢迎来到FunnyAWM的学生管理系统！</h1>
    <p>当前登录：{{ username.name }}</p>
    <RouterLink v-for="action in actions" :key="action.route" :to="action.route" :id="action.id"
                @click="handleClick(action.route)" style="text-decoration: none;">
      <button>{{ action.text }}</button>
    </RouterLink>
  </div>
  <RouterView v-if="!notSelected"/>
</template>
<style scoped>
#welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#welcome button {
  display: inline-flex;
  justify-content: center;
  width: 100px;
  text-decoration: none;
  background-color: lightgreen;
}

* {
  font-family: "Microsoft YaHei UI", serif;
}

button {
  border: none;
  border-radius: 5px;
  padding: 5px;
}
</style>