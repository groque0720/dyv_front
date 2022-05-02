import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import authRouter from '../modules/auth/router'
import isAuthenticatedGuard from '../modules/auth/router/auth-guard';
import rrhhRouter from '../modules/rrhh/router';
import empresaRouter from '../modules/empresa/router';


const routes = [
    // {
    // path: '/',
    // name: 'Home',
    // beforeEnter: [ isAuthenticatedGuard ],
    // component: HelloWorld
    // },
    {
        path: '/auth',
        ...authRouter
    },
    {
        path: '/',
        name: 'Home',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import('../layouts/Principal.vue'),

        children: [
            {
                path:'rrhh',
                ...rrhhRouter
            },
            {
                path:'empresas',
                ...empresaRouter
            },
        ],
        // path: '/rrhh',
        // ...rrhhRouter
    }
];

const router = createRouter({
    // mode: 'history',
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
  })
  
  export default router