export default {
    name: 'rrhh',
    component:  () => import('../layouts/rrhhLayout.vue'),

    children: [
        {
            path:'',
            name: 'rrhh_dashboard',
            component:  () => import('../views/dashboard.vue'),
        },
        {
            path:'nomina',
            name: 'rrhh_nomina',
            component:  () => import('../views/nomina.vue'),
        },
        {
            path: 'empleado/:id',
            name: 'rrhh_empleado',
            component:  () => import('../views/empleado.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            },
            children: [
                {
                    path: 'perfil',
                    name: 'rrhh_empleado_perfil',
                    component: () => import('../views/empleadoPerfil.vue')
                },
                {
                    path: 'perfil',
                    name: 'rrhh_empleado_grupo_familiar',
                    component: () => import('../views/empleadoGrupoFamiliar.vue')
                }
            ]
        },
        {
            path:'configuracion',
            name: 'rrhh_configuracion',
            component:  () => import('../views/configuracion.vue'),
            children: [
                {
                    path: 'empresas',
                    name: 'rrhh_configuracion_empresas',
                    component: () => import('../../empresa/views/empresas.vue')
                    // component: () => import('../views/empresas.vue')
                },
                {
                    path: 'sexos',
                    name: 'rrhh_sexos',
                    component: () => import('../views/sexos.vue')
                },
                {
                    path: 'vinculos',
                    name: 'rrhh_vinculos',
                    component: () => import('../views/vinculos.vue')
                },
                {
                    path: 'puestos',
                    name: 'rrhh_puestos',
                    component: () => import('../views/puestos.vue')
                },
                {
                    path: 'areas',
                    name: 'rrhh_areas',
                    component: () => import('../views/areas.vue')
                },
                {
                    path: 'licencias',
                    name: 'rrhh_licencias',
                    component: () => import('../views/licencias.vue')
                }                                
            ]
        },
    ] 
}