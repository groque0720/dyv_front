export default {
    name: 'empresas',
    component:  () => import('../layouts/empresaLayout.vue'),

    children: [
        {
            path:'',
            name: 'empresas_index',
            component:  () => import('../views/empresas.vue'),
        },
        {
            path:'nueva_empresa',
            name: 'empresa_create',
            component:  () => import('../views/empresa.vue'),

        },
        {
            path:':id',
            name: 'empresa_show',
            component:  () => import('../views/empresa.vue'),
            props: ( route ) => {
                return { id: route.params.id } 
            }

        },
        {
            path:':id/nueva_sucursal',
            name: 'sucursal_create',
            component:  () => import('../views/sucursal.vue'),
            props: ( route ) => {
                return { id: route.params.id } 
            }
        },
        {
            path:':id/sucursal/:sucursal_id',
            name: 'sucursal_show',
            component:  () => import('../views/sucursal.vue'),
            props: ( route ) => {
                return {    id: route.params.id,
                            sucursal_id: route.params.sucursal_id } 
            }
        },
        // {
        //     path:'sucursal/:sucursal_id',
        //     name: 'sucursal_show',
        //     component:  () => import('../views/sucursal.vue'),
        //     props: ( route ) => {
        //         return { sucursal_id: route.params.sucursal_id } 
        //     }
        // },

    ] 
}