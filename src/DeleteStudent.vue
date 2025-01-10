<script setup>
import axios from 'axios'
import {ref} from 'vue'

const id = ref()

function submitDelete() {
  axios
      .post('/deleteStudent', {id: parseInt(id.value)})
      .then(() => {
        alert('删除成功！')
      })
      .catch(() => {
        alert('删除失败，请检查输入')
      })
}
</script>
<template>
  <form @submit.prevent="submitDelete" id="deletestu">
    <input type="text" v-model="id" placeholder="ID"/><br/>
    <input type="submit" id="submit" value="提交"/>
    <RouterLink to="/" style="text-decoration: none;">
      <button id="returnMainMenu">返回主菜单</button>
    </RouterLink>
  </form>
</template>
<style>
#deletestu {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: start;
  gap: 5px;
}
</style>
