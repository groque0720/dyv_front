<template>
    <div class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-familia text-lg"></i>
                <span class=" text-lg">Grupo Familiar</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                    <i class="icon-nuevo"></i>
                    <span> Nuevo integrante </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow p-3 rounded">
            <table class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Personas</th>
                        <th>Vinculo</th>
                        <th>Fecha Nac.</th>
                        <th>Documento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( i ) in 5" :key="i">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> Famliar {{ i }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center  gap-3">
                                    <span>Relacion</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    <span>xx/xx/xxxx</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex justify-center gap-3">
                                    <span>xx.xxx.xxx</span>
                                </div>
                            </td>
                            <!-- Acciones -->
                            <td>
                                <i class="fas fa-file-alt"></i>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="form-row mt-2 w-full border shadow p-3 rounded p-2">
            <label for="">Observación General</label>
            <textarea class="w-full border form-input"  name="" id="" cols="30" rows="10"></textarea>
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