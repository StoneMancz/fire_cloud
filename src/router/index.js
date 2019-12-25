import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/login/Login';
import Index from '../pages/home/Index'
Vue.use(Router);
export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },{
        path: '/index',
        name: 'Index',
        meta: {
            requireAuth: true
        },
        component: Index
    }]
})