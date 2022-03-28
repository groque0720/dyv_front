// import AuthLayout from '../layouts/AuthLayout.vue';


export default {
    name: 'auth',
    component:  () => import('../layouts/AuthLayout.vue'),

    children: [
        {
            path:'',
            name: 'Login',
            component:  () => import('../views/login.vue'),
        },
    ] 
}