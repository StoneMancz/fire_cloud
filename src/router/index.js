import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/login/Login';
import Index from '../pages/home/Index';
import FireMonitor from '../pages/fireMonitor/fireMonitoring.vue';
import EquipmentManage from '../pages/equipmentManage/Index.vue';
import PersonMange from '../pages/personnelManag/Index.vue'
Vue.use(Router);
export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },{
        path: '/home',
        name: 'home',
        meta: {
            requireAuth: true
        },
        component: Index
    },{
        path: '/Monitor',
        name: 'FireMonitor',
        meta: {
            requireAuth: true
        },
        component: FireMonitor
    },{
        path: '/equipmentManage',
        name: 'EquipmentManage',
        meta: {
            requireAuth: true
        },
        component: EquipmentManage
    },{
        path:"/personnel",
        name:"PersonnelManagement",
        meta: {
            requireAuth: true
        },
        component:PersonMange
    }]
})