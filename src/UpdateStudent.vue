<script setup>
import axios from 'axios'
import {ref} from 'vue'

const id = ref('')

const submitted = ref(false)
const student = ref({
  id: 0,
  name: '',
  gender: '',
  address: '',
  phone: '',
  major: '',
})

function submitQuery() {
  if (id.value === "") {
    alert("ID不能为空！")
    return
  }
  axios
      .post('/getStudent', {id: parseInt(id.value)})
      .then((response) => {
        student.value = response.data
        if (student.value.name == null) {
          alert('学生不存在')
          return
        }
        submitted.value = true
      })
      .catch(() => {
        alert('查询失败！')
      })
}

function submitUpdate() {
  axios
      .post('/updateStudent', student.value)
      .then(() => {
        alert('更新成功！')
      })
      .catch(err => {
        if (err.response.data === "SQL injection was not allowed!") {
          alert('再注我让你飞起来！')
          return
        } else if (err.response.data === "Empty Field detected!") {
          alert('检测到空字段，请重新检查！')
          return
        }
        alert('更新失败！')
      })
}
</script>
<template>
  <form @submit.prevent="submitQuery" id="queryForm">
    <input type="text" v-model="id" placeholder="ID"/><br/>
    <img src="./components/icons/search.png" id="querySubmit" alt="提交" @click="submitQuery">
  </form>
  <RouterLink v-if="!submitted" to="/" style="text-decoration: none;">
    <button id="returnMainMenu">返回主菜单</button>
  </RouterLink>
  <div id="addstu" v-if="submitted">
    <form @submit.prevent="submitUpdate">
      <input type="text" v-model="student.name" id="stuContent"/><br/>
      <input type="text" v-model="student.gender" id="stuContent"/><br/>
      <input type="text" v-model="student.address" id="stuContent"/><br/>
      <input type="text" v-model="student.phone" id="stuContent"/><br/>
      <input type="text" v-model="student.major" id="stuContent"/><br/>
      <input type="submit" id="submit" value="提交更改"/>
      <RouterLink to="/" style="text-decoration: none;">
        <button id="returnMainMenu">返回主菜单</button>
      </RouterLink>
    </form>
  </div>
</template>
<style>
#addstu {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: start;
  gap: 5px;
}

#submit, #returnMainMenu {
  border: none;
  border-radius: 5px;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  margin: 2px auto;
  padding: 5px;
  width: 150px;
}

#stuContent {
  width: 200px;
  margin: 2px auto;
}

#queryForm {
  display: flex;
  padding: 5px;
  justify-content: center;
}

#querySubmit {
  width: 20px;
  height: 20px;
}
</style>