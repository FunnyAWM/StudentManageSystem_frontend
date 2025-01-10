import {createApp, reactive} from 'vue'
import router from './router'
import axios from 'axios'
import MainPage from './MainPage.vue'
import VueCookies from 'vue-cookies'

axios.defaults.baseURL = 'http://localhost:8080'
const app = createApp(MainPage)
app.use(router)
app.use(VueCookies)
const tokenWrapper = reactive({
    token: ''
})
const adminName = reactive({
    name: '未登录',
})
app.provide('token', tokenWrapper)
app.provide('adminName', adminName)
app.mount('#main')
