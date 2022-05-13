<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <template v-for="sucursal in sucursales" :key="sucursal.id">
            <div v-if="sucursal.view"  class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !sucursal.activo }">
                <div class="w-6/12">
                    <span>{{ sucursal.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ sucursal.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(sucursal.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': sucursal.activo }"></i>
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
    name: "DashboardSucursales",
    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        const cantidadEmpleados = ref(0)

        const clickFiltro = async ( id = '' ) => {
            const idx = rrhhStore.filtro.sucursales.findIndex( sucursal => sucursal.id == id )
            if ( rrhhStore.filtro.sucursales[idx].activo ) rrhhStore.filtro.sucursales[idx].activo = false
            else rrhhStore.filtro.sucursales[idx].activo = true

            rrhhStore.empleados.forEach( ( empleado_ ) => {
                if ( empleado_.sucursal.id == id ) empleado_.sucursal_filtro = rrhhStore.filtro.sucursales[idx].activo
            })

        }

        const sumCantidadEmpleado = async() => {
            let suma = 0
            rrhhStore.filtro.sucursales.forEach( sucursal_ => {
                let cantidadEmpleado_ = rrhhStore.empleados.filter( empleado_ => empleado_.sucursal.id == sucursal_.id ).length
                sucursal_.cantidad = cantidadEmpleado_
                // if ( sucursal_.view) sucursal_.cantidad = cantidadEmpleado_
                if ( sucursal_.activo && sucursal_.view) suma += cantidadEmpleado_
            })
            return suma
        }


        watch( rrhhStore.filtro, async() => {
            isLoading.value = true
            cantidadEmpleados.value = await sumCantidadEmpleado()
            isLoading.value = false
        })

        isLoading.value = true


        return {
            isLoading,
            sucursales: computed( () => rrhhStore.filtro.sucursales ),
            clickFiltro,
            cantidadEmpleados
        };
    },
    components: { Loading }
}

</script>