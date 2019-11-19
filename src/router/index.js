import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Information from '@/components/Information'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/information',
            name: 'Information',
            component: Information
        }
    ]
})
