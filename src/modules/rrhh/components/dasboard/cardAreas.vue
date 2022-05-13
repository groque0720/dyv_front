<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <template v-for="area in areas" :key="area.id">
            <div v-if="area.view"  class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !area.activo }">
                <div class="w-6/12">
                    <span>{{ area.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ area.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(area.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': area.activo }"></i>
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
    name: "DashboardAreas",
    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        const cantidadEmpleados = ref(0)

        const clickFiltro = async ( id = '' ) => {
            const idx = rrhhStore.filtro.areas.findIndex( area => area.id == id )
            if ( rrhhStore.filtro.areas[idx].activo ) rrhhStore.filtro.areas[idx].activo = false
            else rrhhStore.filtro.areas[idx].activo = true

            rrhhStore.empleados.forEach( ( empleado_ ) => {
                if ( empleado_.area.id == id ) empleado_.area_filtro = rrhhStore.filtro.areas[idx].activo
            })

        }

        const sumCantidadEmpleado = async() => {
            let suma = 0
            rrhhStore.filtro.areas.forEach( area_ => {
                let cantidadEmpleado_ = rrhhStore.empleados.filter( empleado_ => empleado_.area.id == area_.id && empleado_.sucursal_filtro   && empleado_.sector_filtro ).length
                area_.cantidad = cantidadEmpleado_
                // if ( area_.view) area_.cantidad = cantidadEmpleado_
                if ( area_.activo && area_.view) suma += cantidadEmpleado_
            })
            return suma
        }


        watch( rrhhStore.filtro, async() => { 
            cantidadEmpleados.value = await sumCantidadEmpleado()           
        })

        return {
            isLoading,
            areas: computed( () => rrhhStore.filtro.areas ),
            clickFiltro,
            cantidadEmpleados
        };
    },
    components: { Loading }
}

</script>