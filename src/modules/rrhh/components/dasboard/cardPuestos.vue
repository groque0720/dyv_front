<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <template v-for="puesto in puestos" :key="puesto.id">
            <div v-if="puesto.view"  class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !puesto.activo }">
                <div class="w-6/12">
                    <span>{{ puesto.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ puesto.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(puesto.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': puesto.activo }"></i>
                </div>
            </div>
        </template>
        <div class="flex justify-between gap-2 items-center">
            <div class="w-6/12">
                <span>Total</span></div>
            <div class="w-3/12 text-center">
                <span>{{ cantidadEmpleados }}</span></div>
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
        const isLoading = ref(false)
        const cantidadEmpleados = ref(0)

        const clickFiltro = async ( id = '' ) => {
            const idx = rrhhStore.filtro.puestos.findIndex( puesto => puesto.id == id )
            if ( rrhhStore.filtro.puestos[idx].activo ) rrhhStore.filtro.puestos[idx].activo = false
            else rrhhStore.filtro.puestos[idx].activo = true

            rrhhStore.empleados.forEach( ( empleado_ ) => {
                if ( empleado_.puestos[0] && empleado_.puestos[0].puesto.id == id ) empleado_.puesto_filtro = rrhhStore.filtro.puestos[idx].activo
            })

        }

        const sumCantidadEmpleado = async() => {
            let suma = 0
            rrhhStore.filtro.puestos.forEach( puesto_ => {
                let cantidadEmpleado = 0
                if (puesto_.activo) {
                    let puesto_empleado = rrhhStore.empleados.filter( empleado_ => {
                        if (empleado_.puestos[0] && empleado_.puestos[0].puesto.id == puesto_.id ) {
                            if ( empleado_.empresa_filtro && empleado_.sucursal_filtro && empleado_.sector_filtro && empleado_.area_filtro ){
                                return empleado_.id
                            }
                        }
                    })
                    cantidadEmpleado = puesto_empleado.length
                }
                puesto_.cantidad = cantidadEmpleado
                if ( puesto_.activo && puesto_.view) suma += cantidadEmpleado
            })
            return suma
        }


        watch( rrhhStore.filtro, async() => {
            cantidadEmpleados.value = await sumCantidadEmpleado()           
        })

        return {
            isLoading,
            puestos: computed( () => rrhhStore.filtro.puestos ),
            clickFiltro,
            cantidadEmpleados
        };
    },
    components: { Loading }
}

</script>