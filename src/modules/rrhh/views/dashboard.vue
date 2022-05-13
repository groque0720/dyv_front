<template>
    <Loading v-if="isLoading"></Loading>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">

    <div class="h-72 border p-3 rounded">
        <CardEmpresa></CardEmpresa>
    </div>

    <div class="h-72 border p-3 rounded">
        <CardSucursales></CardSucursales>
    </div>

    <div class="h-72 border p-3 rounded">
        <CardSectores></CardSectores>
    </div>

    <div class="h-72 border p-3 rounded">
        <CardAreas></CardAreas>
    </div>
    
    <div class="h-72 border p-3 rounded">
        <CardPuestos></CardPuestos>
    </div>

    

    <!-- <div class="h-72 border p-3 rounded">
        {{ empresas  }}
    </div> -->

    <div class="h-72 border p-3 rounded">
        <div v-for="empleado in empleados">
            <span>{{ empleado.nombre_completo }}</span>
        </div>
    </div>

    <!-- {{ filtroEmpleado }} -->



    </div>
</template>

<script>

import { ref, computed } from 'vue';
import { useRrhhStore } from '../store'
import { useEmpresaStore } from '@/modules/empresa/store';
import Loading from '../../../components/Loading.vue';
import CardEmpresa from '../components/dasboard/cardEmpresa.vue';
import CardSucursales from '../components/dasboard/cardSucursales.vue';
import CardAreas from '../components/dasboard/cardAreas.vue';
import CardSectores from '../components/dasboard/cardSectores.vue';
import CardPuestos from '../components/dasboard/cardPuestos.vue';


export default {
    name: "Dashboard",
    setup() {
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
 
        const loadEmpleados = async() => {
            const { ok, message } = await rrhhStore.loadEmpleados()
            if ( !ok ) Swal.fire("Atención", message, "info")
            else
            // rrhhStore.empleados_filtro = rrhhStore.empleados
            rrhhStore.empleados.forEach ( empleado_ => {
                empleado_.empresa_filtro = true
                empleado_.sucursal_filtro = true
                empleado_.sector_filtro = true
                empleado_.area_filtro = true
                empleado_.puesto_filtro = true
                empleado_.licencia_filtro = true
            })

        }

        // const loadLicencias = async () => {
        //     const { ok, message } = await rrhhStore.loadLicencias()
        //     if (!ok)
        //         Swal.fire("Error", message, "error")
        //     isLoading.value = false
        // };

        loadEmpleados()
        // loadLicencias()

        return {
            isLoading,
            empleados: computed( () => rrhhStore.empleados.filter( (empleado_) => empleado_.empresa_filtro &&
                                                                                   empleado_.sucursal_filtro &&
                                                                                   empleado_.sector_filtro &&
                                                                                   empleado_.area_filtro &&
                                                                                   empleado_.puesto_filtro &&
                                                                                   empleado_.licencia_filtro ))
        };
    },
    components: { Loading, CardEmpresa, CardSucursales, CardAreas, CardSectores, CardPuestos }
}

</script>
