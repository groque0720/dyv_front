<template>
    <div class="p-3 bg-white border">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-licencia text-lg"></i>
                <span class=" text-lg">Licencias</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                    <i class="icon-nuevo"></i>
                    <span> Nuevo Licencia </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow p-3 rounded">
            <table class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Licencia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( licencia, idx ) in licencias" :key="licencia.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickEmpresa( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ licencia.licencia_tipo }}</span>
                                    </div>
                                </div>
                            </td>
                            <!-- Acciones -->
                            <td>
                                <i class="icon-editar"></i>
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import router from "../router";

export default {
    setup() {
        const router = useRouter()
        const rrhhStore = useRrhhStore()

        const loadLicencias = async() => {
            const { ok } = await rrhhStore.loadLicencias()
            if ( !ok ) Swal.fire("Error", message, "error");
        }

        loadLicencias()


        return {
            router,
            licencias: computed( () => rrhhStore.licencias )
        }
    },
}
</script>