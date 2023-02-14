import { createRouter, createWebHistory } from "vue-router";
import HomePage from './../views/HomePage.vue'
import LoginPage from './../views/LoginPage.vue'
import EditPage from './../views/EditPage.vue'

const routes = [
    {path: '/', component: HomePage}, 
    {path: '/login', component: LoginPage}, 
    {path: '/post', component: HomePage, children: [{path: ':id', component: EditPage}]}
]
const router = createRouter({history: createWebHistory(process.env.BASE_URL), routes})

export default router;