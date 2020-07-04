import Vue from 'vue'
import CVueRouter from './cvue-router'
Vue.use(CVueRouter);
const routes = [
    {
        path: '/',
        component: () => import('../view/home'),
        children: [
            {
                path: '/homeChild',
                component: () => import('../view/home-child'),
            }
        ]
    },
    {
        path: '/about',
        component: () => import('../view/about')
    }
];
const router = new CVueRouter({
    routes
});
export default router;