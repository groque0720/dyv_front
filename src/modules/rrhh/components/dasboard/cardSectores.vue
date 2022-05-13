<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <template v-for="sector in sectores" :key="sector.id">
            <div v-if="sector.view"  class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !sector.activo }">
                <div class="w-6/12">
                    <span>{{ sector.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ sector.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(sector.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': sector.activo }"></i>
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
    name: "DashboardSectores",
    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        const cantidadEmpleados = ref(0)

        const clickFiltro = async ( id = '' ) => {
            const idx = rrhhStore.filtro.sectores.findIndex( sector => sector.id == id )
            if ( rrhhStore.filtro.sectores[idx].activo ) rrhhStore.filtro.sectores[idx].activo = false
            else rrhhStore.filtro.sectores[idx].activo = true
            rrhhStore.empleados.forEach( ( empleado_ ) => {
                if ( empleado_.sector.id == id ) empleado_.sector_filtro = rrhhStore.filtro.sectores[idx].activo
            })
        }

        const sumCantidadEmpleado = async() => {
            let suma = 0
            rrhhStore.filtro.sectores.forEach( sector_ => {
                let cantidadEmpleado_ = rrhhStore.empleados.filter( empleado_ => empleado_.sector.id == sector_.id && empleado_.sucursal_filtro  ).length
                sector_.cantidad = cantidadEmpleado_
                // if ( sector_.view) sector_.cantidad = cantidadEmpleado_
                if ( sector_.activo && sector_.view) suma += cantidadEmpleado_
            })
            return suma
        }


        watch( rrhhStore.filtro, async() => {
            cantidadEmpleados.value = await sumCantidadEmpleado()           
        })

        return {
            isLoading,
            sectores: computed( () => rrhhStore.filtro.sectores ),
            clickFiltro,
            cantidadEmpleados
        };
    },
    components: { Loading }
}

</script>