<template>
    <div class="p-3 bg-white ">

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
                        <th>Tipo de Licencia</th>
                        <th>Fec. Inicio</th>
                        <th>Fec. Fin</th>
                        <th>Documento</th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="cursor-pointer border-b hover:bg-indigo-100" >
                        <!-- Empresa // direccion -->
                        <td>
                            <div class="flex items-center gap-3">
                                <i class="icon-vacaciones"></i>
                                <span class="text-indigo-500 font-semibold"> Vacaciones</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <span>xx/xx/xxxx</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <span>xx/xx/xxxx</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <i class="fas fa-paperclip"></i>
                            </div>
                        </td>
                    </tr>
                    <tr class="cursor-pointer border-b hover:bg-indigo-100" >
                        <!-- Empresa // direccion -->
                        <td>
                            <div class="flex items-center gap-3">
                                <i class="icon-cumpleanio"></i>
                                <span class="text-indigo-500 font-semibold">Cumpleaños</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <span>xx/xx/xxxx</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <span>xx/xx/xxxx</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex justify-center gap-3">
                                <i class="fas fa-paperclip"></i>
                            </div>
                        </td>
                    </tr>
                    <!-- </template> -->
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
    name: 'EmpleadoLicencia',
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