<template>
    <div class="p-3 bg-white">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-preocupacional text-lg"></i>
                <span class=" text-lg">Preocupacional</span>
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
                        <th class="w-2/12">Estudios Realizados</th>
                        <th class="w-7/12">Observación</th>
                        <th class="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( i ) in 5" :key="i">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> Estudio {{ i }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
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