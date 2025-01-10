<template>
  <div>
    <form id="addstu" @submit.prevent="addStudent">
      <input type="text" v-model="student.name" id="stuContent" placeholder="姓名"/><br/>
      <input type="text" v-model="student.gender" id="stuContent" placeholder="性别"/><br/>
      <input type="text" v-model="student.address" id="stuContent" placeholder="地址"/><br/>
      <input type="text" v-model="student.phone" id="stuContent" placeholder="手机号码"/><br/>
      <input type="text" v-model="student.major" id="stuContent" placeholder="专业"/><br/>
      <input type="submit" id="submit" value="提交"/>
      <RouterLink to="/" style="text-decoration: none;">
        <button id="returnMainMenu">返回主菜单</button>
      </RouterLink>
      <br>
      批量导入（支持使用CSV文件）
      <input type="file" id="submit" @change="addStudentByCSV" accept="text/csv">
    </form>
  </div>
</template>
<script setup>
import {inject, ref} from 'vue'
import axios from 'axios'
import Papa from 'papaparse'
import router from "@/router.js";

const student = ref({
  name: '',
  gender: '',
  address: '',
  phone: '',
  major: '',
})

const studentlist = ref([])

const read = ref(true)

function addStudentByCSV(event) {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      const studentList = results.data;

      // 检查是否可以继续执行
      if (!read.value) {
        alert("导入已取消！");
        return;
      }

      // 使用Promise.all处理多个请求
      const promises = studentList.map((item) => {
        if (item.name !== null && item.name !== undefined) {
          student.value = item;
          return axios.post('/addStudent', student.value);
        }
      });

      Promise.all(promises)
          .then(() => {
            alert("所有学生导入成功！");
            router.push('/')
          })
          .catch((error) => {
            alert("导入失败！");
          });
      student.value = ''
    },
    error: ((results) => {
      alert("导入失败！")
    })
  })
}

function addStudent() {
  axios
      .post('/addStudent', student.value)
      .then(() => {
        alert('提交成功')
      })
      .catch(err => {
        if (err.response.data === "SQL injection was not allowed!") {
          alert('再注我让你飞起来！')
          return
        } else if (err.response.data === "Empty Field detected!") {
          alert('检测到空字段，请重新检查！')
          return
        }
        alert('提交失败')
      })
}
</script>
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

#stuContent {
  width: 200px;
}
</style>