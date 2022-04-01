<template>
    <div class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-puesto text-lg"></i>
                <span class=" text-lg">Puestos</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                    <i class="icon-nuevo"></i>
                    <span> Nuevo Puestos </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow p-3 rounded">
            <table class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Puestos</th>
                        <th>Fec. Inicio</th>
                        <th>Reemplazo</th>
                        <th>Descrip.</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( puesto, idx ) in puestos" :key="puesto.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickEmpresa( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ puesto.puesto }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    <span>xx/xx/xxxx</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    <span>Empleado X</span>
                                </div>
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import router from "../router";

export default {
    setup() {
        const router = useRouter()
        const rrhhStore = useRrhhStore()

        const loadPuestos = async() => {
            const { ok } = await rrhhStore.loadPuestos()
            if ( !ok ) Swal.fire("Error", message, "error");
        }

        loadPuestos()


        return {
            router,
            puestos: computed( () => rrhhStore.puestos )
        }
    },
}
</script>