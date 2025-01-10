<script setup>
import {inject, ref} from 'vue';
import axios from 'axios';
import router from "@/router.js";

const admin = ref({
  id: 0,
  name: '',
  password: '',
})
const token = inject("token");
const username = inject("adminName");

function handleLogin() {
  axios
      .post("/admin/login", admin.value)
      .then(res => {
        token.token = res.data;
        username.name = admin.value.name;
        router.push("/");
      })
      .catch(() => {
        alert("登录失败！");
      })
}
</script>

<template>
  <div id="login">
    <form>
      用户名：<input type="text" v-model="admin.name" required/><br>
      密码：<input type="password" v-model="admin.password" required/><br>
      <button @click.prevent="handleLogin">登录</button>
      <RouterLink to="/" style="text-decoration: none; margin-left: 40px;">
        <button id="returnMainMenu">返回主菜单</button>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>
#login {
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

#login * {
  margin-top: 3px;
  margin-bottom: 3px;
}

#login input {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}

#login button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
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