import {createRouter, createWebHistory} from 'vue-router'
import MainPage from './MainPage.vue'
import AddStudent from './AddStudent.vue'
import DeleteStudent from './DeleteStudent.vue'
import UpdateStudent from './UpdateStudent.vue'
import QueryStudent from './QueryStudent.vue'
import Login from './Login.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/add',
        name: 'AddStudent',
        component: AddStudent,
    },
    {
        path: '/delete',
        name: 'DeleteStudent',
        component: DeleteStudent,
    },
    {
        path: '/update',
        name: 'UpdateStudent',
        component: UpdateStudent,
    },
    {
        path: '/query',
        name: 'QueryStudent',
        component: QueryStudent,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
