<template>
    <Loading v-if="isLoading" ></Loading>
    <div class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-licencia text-lg"></i>
                <span class=" text-lg">Licencias</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="onSelected('nuevo')">
                    <i class="icon-nuevo"></i>
                    <span> Crear Licencia </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 border rounded">
            <table class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th class="w-1/12">Icono</th>
                        <th class="w-2/12">Tipo de Licencia</th>
                        <th class="w-2/12">Fec. Inicio</th>
                        <th class="w-2/12">Fec. Fin</th>
                        <th class="w-5/12">Observación</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( licencia, idx ) in licencias" :key="licencia.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onSelected(licencia.id)">
                            <td class="text-center">
                                <span class="font-semibold text-xl"
                                        :style="`color: ${ licencia.licencia_tipo.icono_color }`"
                                         v-html=" licencia.licencia_tipo.licencia_icono "></span>
                            </td>
                            <td>
                                <div class="flex flex-start items-center gap-3">
                                    <span class="text-indigo-500 font-semibold">{{ licencia.licencia_tipo.licencia_tipo }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    {{ getFecha( licencia.fecha_inicio ) }}
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    {{ getFecha( licencia.fecha_fin ) }}
                                </div>
                            </td>
                            <td>
                                <p>{{ licencia.observacion }}</p>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
 
    </div>
</template>

<script>

import { useRrhhStore } from "../store"
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
// import router from "../router";
import Loading from "../../../components/Loading.vue";
import getDateFormat from "@/helpers/getDateFormat"

export default {
    name: "EmpleadoLicencia",
    setup() {
        const router = useRouter()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        const id = router.currentRoute.value.params.id;

        const loadEmpleado = async () => {
            if (rrhhStore.empleado.id != undefined)
                return;
            isLoading.value = true;
            const { ok, message } = await rrhhStore.loadEmpleado( id );
            if (!ok)
                Swal.fire("Error", message, "error");
            else
                isLoading.value = false;
        };

        loadEmpleado();

        return {
            router,
            isLoading,
            licencias: computed(() => rrhhStore.empleado.licencias),
            onSelected: ( licencia_id ) => router.push({ name: 'rrhh_empleado_licencia', params: { licencia_id } } ),
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