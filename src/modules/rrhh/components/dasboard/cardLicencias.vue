<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <template v-for="licencia in licencias" :key="licencia.id">
            <div v-if="licencia.view"  class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !licencia.activo }">
                <div class="w-6/12">
                    <span>{{ licencia.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ licencia.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(licencia.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': licencia.activo }"></i>
                </div>
            </div>
        </template>
        <div class="flex justify-between gap-2 items-center">
            <div class="w-6/12">
                <span>Total</span></div>
            <div class="w-3/12 text-center">
                <span>{{ cantidad_empleados }}</span></div>
            <div class="w-3/12 flex items-center justify-center">
            </div>
        </div>
    </div>

</template>

<script>

import { ref, computed, watch } from 'vue';
import { useRrhhStore } from '../../store'
import { useEmpresaStore } from '@/modules/empresa/store';
import Loading from '@/components/Loading.vue';


export default {
    name: "DashboardPuestos",
    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(true)
        const cantidad_empleados = ref(0)

        const clickFiltro = async ( id = '' ) => {
            const idx = rrhhStore.filtro.licencias.findIndex( licencia => licencia.id == id )
            if ( rrhhStore.filtro.licencias[idx].activo ) rrhhStore.filtro.licencias[idx].activo = false
            else rrhhStore.filtro.licencias[idx].activo = true

            rrhhStore.empleados.forEach( ( empleado_ ) => {
                if ( empleado_.licencias[0] && empleado_.licencias[0].licencia.id == id ) empleado_.licencia_filtro = rrhhStore.filtro.licencias[idx].activo
            })

        }

        const sumCantidadEmpleado = async() => {
            let suma = 0
            let empleados_licencia_activo = 0

            rrhhStore.filtro.licencias.forEach( licencia_ => {
                let cantidadEmpleado = 0
                empleados_licencia_activo = 0
                if (licencia_.activo) {
                    let licencia_empleado = rrhhStore.empleados.filter( empleado_ => {
                        // valido que el empleado esta activo en cada uno de los filtros
                        if ( empleado_.empresa_filtro && empleado_.sucursal_filtro &&
                                empleado_.sector_filtro && empleado_.area_filtro &&
                                empleado_.puesto_filtro  ){
                                    empleados_licencia_activo +=1
                            // valido si el empleado esta activo en la licencia que estoy recorriendo
                            if (empleado_.licencias[0] && empleado_.licencias[0].licencia_tipo_id == licencia_.id ) {
                                return empleado_.id
                            }
                        }

                    })
                    cantidadEmpleado = licencia_empleado.length
                }
                licencia_.cantidad = cantidadEmpleado
                if ( licencia_.activo && licencia_.view) suma += cantidadEmpleado
            })

            rrhhStore.filtro.licencias[0].cantidad = empleados_licencia_activo

            return suma
        }


        watch( rrhhStore.filtro, async() => {
            cantidad_empleados.value = await sumCantidadEmpleado()           
        })
       
        
        const loadLicencias = async () => {
            const { ok, message } = await rrhhStore.loadLicencias()
            if (!ok) Swal.fire("Error", message, "error")

            let licencias = new Array

                let new_ = {
                    id: 0,
                    nombre: 'Activos',
                    cantidad: 0,
                    view: true,
                    activo: true
                }
                licencias.push(new_)

            rrhhStore.licencias.forEach(licencia_ => {
                    let new_ = {
                        id: licencia_.id,
                        nombre: licencia_.licencia_tipo,
                        cantidad: 0,
                        view: true,
                        activo: true
                    }
                    licencias.push(new_)
                })

            rrhhStore.filtro.licencias = licencias
            isLoading.value = false
        };

        loadLicencias()

        return {
            isLoading,
            licencias: computed( () => rrhhStore.filtro.licencias ),
            clickFiltro,
            cantidad_empleados
        };
    },
    components: { Loading }
}

</script>