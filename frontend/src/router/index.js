import { createRouter, createWebHistory } from "vue-router";
import HomePage from './../views/HomePage.vue'
import LoginPage from './../views/LoginPage.vue'
import EditPost from './../views/EditPost.vue'

const routes = [
    {path: '/', component: HomePage}, 
    {path: '/login', component: LoginPage},
    {path: '/post/:id', component: EditPost}
]
const router = createRouter({history: createWebHistory(), routes})

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth && !localStorage.getItem('id')){
        next('/login')
    } else {
        next();
    }
})

export default router;