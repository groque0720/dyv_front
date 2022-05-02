<template>
    <div class="p-3 bg-white">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-actividad text-lg"></i>
                <span class=" text-lg">Historial</span>
            </div>
            <div class="py-1">
            </div>
        </div>
        <div  class="mt-2 w-full border shadow p-3 rounded">
            <table class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Fecha</th>
                        <th>Modificacion</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="cursor-pointer border-b hover:bg-indigo-100">
                        <!-- Empresa // direccion -->
                        <td>
                            <div class="flex justify-center gap-3">
                                <span class="text-indigo-500 font-semibold"> xx/xx/xxxx </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-auto items-center gap-3">
                                <i class="icon-perfil"></i>
                                <span>Actulización de perfil</span>
                            </div>
                        </td>
                        <!-- Acciones -->
                        <td>
                            <div class="flex justify-center items-center">
                                <img title="Usuario xxx" class=" h-8 w-8 rounded-full" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr class="cursor-pointer border-b hover:bg-indigo-100">
                        <!-- Empresa // direccion -->
                        <td>
                            <div class="flex justify-center gap-3">
                                <span class="text-indigo-500 font-semibold"> xx/xx/xxxx </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-auto items-center gap-3">
                                <i class="icon-puesto"></i>
                                <span>Actulización de Puesto</span>
                            </div>
                        </td>
                        <!-- Acciones -->
                        <td>
                            <div class="flex justify-center items-center">
                                <img title="Usuario xxx" class=" h-8 w-8 rounded-full" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr class="cursor-pointer border-b hover:bg-indigo-100">
                        <!-- Empresa // direccion -->
                        <td>
                            <div class="flex justify-center gap-3">
                                <span class="text-indigo-500 font-semibold"> xx/xx/xxxx </span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-auto items-center gap-3">
                                <i class="icon-familia"></i>
                                <span>Se agrego un nuevo familiar</span>
                            </div>
                        </td>
                        <!-- Acciones -->
                        <td>
                            <div class="flex justify-center items-center">
                                <img title="Usuario xxx" class=" h-8 w-8 rounded-full" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                            </div>
                        </td>
                    </tr>
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
    name: 'EmpleadoActividades',
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