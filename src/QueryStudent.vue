<script setup>
import {ref} from 'vue'
import axios from 'axios'
import Papa from "papaparse";

const id = ref()
const submitted = ref(false)
const student = ref({
  id: 0,
  name: '',
  gender: '',
  address: '',
  phone: '',
  major: '',
})
const studentlist = ref([]);

function clear() {
  studentlist.value.length = 0
}

function queryAll() {
  clear()
  axios
      .post("/allStudents").then((res) => {
    res.data.forEach(studentEntity => {
      studentlist.value.push(studentEntity);
    })
  })
  submitted.value = true
}

function allToCSV() {
  clear(); // 清空现有数据

  axios.post("/allStudents")
      .then((res) => {
        res.data.forEach(studentEntity => {
          studentlist.value.push(studentEntity);
        });
        const csvFile = Papa.unparse(studentlist.value);
        const BOM = '\uFEFF';
        const csvWithBOM = BOM + csvFile;
        const blob = new Blob([csvWithBOM], {type: "text/csv;charset=utf-8"});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'students.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("请求失败！", error);
        alert("请求失败，请稍后再试！");
      });
}

function submitQuery() {
  if (id.value === undefined || (id.value === '' && studentlist.value.length === 0 && !submitted)) {

  } else if (id.value.includes('1=1')) {
    alert('你注你🐎呢')
  } else {
    clear()
    axios
        .post('/getStudent', {id: parseInt(id.value)})
        .then((response) => {
          student.value = response.data;
          if (student.value.name == null) {
            alert('学生不存在')
            return
          }
          studentlist.value.push(student.value)
          submitted.value = true
        })
        .catch(() => {
          submitted.value = false
          alert('查询失败！')
        })
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="submitQuery" id="query">
      <input type="text" v-model="id" id="queryContent" placeholder="ID"/><br/>
      <input type="submit" id="submit" value="提交"/>
      <button id="returnMainMenu" @click.prevent="queryAll">尝试All All叫</button>
      <button id="returnMainMenu" @click.prevent="allToCSV">导出所有学生信息到CSV文件</button>
      <RouterLink to="/" style="text-decoration: none;">
        <button id="returnMainMenu">返回主菜单</button>
      </RouterLink>
    </form>
  </div>
  <div id="resultDiv" v-if="submitted">
    <table id="result">
      <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>地址</th>
        <th>手机号码</th>
        <th>专业</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="student in studentlist" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.gender }}</td>
        <td>{{ student.address }}</td>
        <td>{{ student.phone }}</td>
        <td>{{ student.major }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
#result {
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;
}

#result th {
  border: 1px solid black;
  width: auto;
}

#result td {
  padding-left: 3px;
  padding-right: 3px;
  border: 1px solid black;
  width: auto;
}

#query {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: start;
  gap: 5px;
}

#resultDiv {
  display: grid;
  align-self: center;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%);
}
</style>
