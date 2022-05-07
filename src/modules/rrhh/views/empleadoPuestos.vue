<template>
    <Loading v-if="isLoading" ></Loading>

    <div v-else class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-puesto text-lg"></i>
                <span class=" text-lg">Puestos</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="onSelected('nuevo')">
                    <i class="icon-nuevo"></i>
                    <span> Nuevo Puestos </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow rounded">
            <table>
                <thead class="">
                    <tr>
                        <th>Puestos</th>
                        <th>Fec. Inicio</th>
                        <th>Fec. Fin</th>
                        <th>Reemplazo</th>
                        <th>Descrip.</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( puesto, idx ) in puestos" :key="puesto.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onSelected(puesto.id)">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ puesto.puesto.puesto }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    {{ getFecha(puesto.fecha_inicio) }}
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    {{ getFecha(puesto.fecha_fin) }}
                                </div>
                            </td>
                            <td>
                                <div v-for="reemplazo in puesto.reemplazos" :key="reemplazo.user_id" 
                                    class="flex justify-start items-center gap-1">
                                    <img    :src="baseURL+reemplazo.reemplazo.img"
                                            :alt="reemplazo.reemplazo.nombre_completo"
                                            :title="reemplazo.reemplazo.nombre_completo"
                                            class=" h-8 w-8 rounded-full border-2 border-white shadow object-cover" >
                                    <span>{{ reemplazo.reemplazo.nombre_completo }}</span>
                                </div>


                                    <!-- <template v-for="reemplazo in puesto.reemplazos" :key="reemplazo.user_id">
                                    {{ reemplazo.reemplazo.nombre_completo }}
                                        <div class="flex items-center" :class="{'-ml-2': idx > 0 }">
                                            <img    :src="baseURL+reemplazo.reemplazo.img"
                                                    :alt="reemplazo.reemplazo.nombre_completo"
                                                    :title="reemplazo.reemplazo.nombre_completo"
                                                    class=" h-8 w-8 rounded-full border-2 border-white shadow object-cover" >
                                        </div>
                                    </template> -->

                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    <i class="fas fa-paperclip"></i>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
 
    </div>
</template>

<script>

import { mapActions, mapState } from "pinia"
import { useRrhhStore } from "../store"
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import router from "../router";
import getDateFormat from "@/helpers/getDateFormat"
import Loading from '@/components/Loading.vue';

export default {
    setup() {
        const router = useRouter();
        const rrhhStore = useRrhhStore();
        const id = router.currentRoute.value.params.id;
        const isLoading = ref(false);
        const loadPuestos = async () => {
            const { ok } = await rrhhStore.loadPuestos();
            if (!ok)
                Swal.fire("Error", message, "error");
        };
        const loadEmpleado = async () => {
            // if (rrhhStore.empleado.id != undefined)
            //     return;
            isLoading.value = true;
            const { ok, message } = await rrhhStore.loadEmpleado(id);
            if (!ok)
                Swal.fire("Error", message, "error");
            else
                isLoading.value = false;
        };

        // const reemplazoPuesto = ( puesto_id ) => {
        //     const reemplazos = rrhhStore.empleado.reemplazos
        //     const reemplazo_users = reemplazos.filter( reemplazo => reemplazo.user_reemplazo.puesto_id == puesto_id)
        //     return reemplazo_users
        // }

        loadEmpleado();

        return {
            isLoading,
            // reemplazoPuesto,
            puestos: computed(() => rrhhStore.empleado.puestos),
            baseURL: import.meta.env.VITE_API_URL_FILES,
            onSelected: ( puesto_id ) => router.push({ name: 'rrhh_empleado_puesto', params: { puesto_id } } ),
        };
    },
    methods: {
        getFecha( fecha ) {
            return getDateFormat(fecha)
        }
    },
    components: { Loading }
}
</script>