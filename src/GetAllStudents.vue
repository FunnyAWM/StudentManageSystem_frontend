<script setup>

</script>

<template>
  <table id="result" v-for="student in studentlist">
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
    <tr>
      <td>{{ student.id }}</td>
      <td>{{ student.name }}</td>
      <td>{{ student.gender }}</td>
      <td>{{ student.address }}</td>
      <td>{{ student.phone }}</td>
      <td>{{ student.major }}</td>
    </tr>
    </tbody>
  </table>
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
  top: 60%;
  left: 50%;
  transform: translate(-50%);
}
</style>