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
                    component: () => import('../views/configuracionEmpresas.vue')
                },
                {
                    path: 'sexo',
                    name: 'rrhh_configuracion_sexo',
                    component: () => import('../views/configuracionSexo.vue')
                },
                {
                    path: 'relaciones',
                    name: 'rrhh_configuracion_relaciones',
                    component: () => import('../views/configuracionRelacion.vue')
                }
            ]
        },
    ] 
}