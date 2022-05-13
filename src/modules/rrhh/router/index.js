
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
            path:'empleados',
            name: 'rrhh_empleados',
            component:  () => import('../views/empleados.vue'),
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
                    path: '',
                    name: 'rrhh_empleado_perfil',
                    component: () => import('../views/empleadoPerfil.vue')
                },
                {
                    path: 'preocupacional',
                    name: 'rrhh_empleado_preocupacional',
                    component: () => import('../views/preocupacional.vue')
                },
                {
                    path: 'grupo_familiar',
                    name: 'rrhh_empleado_grupo_familiar',
                    component: () => import('../views/grupo_familiar.vue')
                },
                {
                    path: 'puestos',
                    name: 'rrhh_empleado_puestos',
                    component: () => import('../views/empleadoPuestos.vue'),
                },
                {
                    path: 'puestos/:puesto_id',
                    name: 'rrhh_empleado_puesto',
                    component: () => import('../views/empleadoPuestosPuesto.vue'),
                    props: ( route ) => {
                        return {
                            id: route.params.id,
                            puesto_id: route.params.puesto_id
                        }
                    }
                },
                {
                    path: 'talles',
                    name: 'rrhh_empleado_talles',
                    component: () => import('../views/talles.vue')
                },
                {
                    path: 'uniformes',
                    name: 'rrhh_empleado_uniformes',
                    component: () => import('../views/uniformes.vue')
                },
                {
                    path: 'capacitacion',
                    name: 'rrhh_empleado_capacitacion',
                    component: () => import('../views/capacitacion.vue')
                },
                {
                    path: 'licencias',
                    name: 'rrhh_empleado_licencias',
                    component: () => import('../views/empleadoLicencias.vue')
                },
                {
                    path: 'licencias/:licencia_id',
                    name: 'rrhh_empleado_licencia',
                    component: () => import('../views/empleadoLicenciasLicencia.vue'),
                    props: ( route ) => {
                        return {
                            id: route.params.id,
                            licencia_id: route.params.licencia_id
                        }
                    }
                },
                {
                    path: 'actividades',
                    name: 'rrhh_empleado_actividades',
                    component: () => import('../views/empleadoActividades.vue')
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
                    component: () => import('../../empresa/views/empresas.vue'),
                },
                {
                    path: 'sindicatos',
                    name: 'rrhh_configuracion_sindicatos',
                    component: () => import('../../sindicato/views/sindicatos.vue'),
                },
                {
                    path: 'sexos',
                    name: 'rrhh_configuracion_sexos',
                    component: () => import('../views/configuracion/sexos.vue')
                },
                {
                    path: 'estados_civiles',
                    name: 'rrhh_configuracion_estados_civiles',
                    component: () => import('../views/configuracion/estadoCiviles.vue')
                },
                {
                    path: 'vinculos',
                    name: 'rrhh_configuracion_vinculos',
                    component: () => import('../views/configuracion/vinculos.vue')
                },
                {
                    path: 'licencias',
                    name: 'rrhh_configuracion_licencias',
                    component: () => import('../views/configuracion/licencias.vue')
                }                                
            ]
        },
    ] 
}