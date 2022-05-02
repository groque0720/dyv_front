<template>
    <div>
        <div class="flex justify-between items-center pb-1">
            <span class=" font-semibold"> Lista de Puestos </span>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="newPuesto()">
                    <i class="icon-nuevo"></i>
                    <span> Crear Puesto</span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border rounded">
            <table>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Observación</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( puesto, idx ) in puestos" :key="puesto.id">
                        <tr @click="onclickPuesto( idx )">
                            <td>
                                <span class=" text-indigo-500 font-semibold">{{ puesto.puesto }}</span>
                                <span v-if="puesto.id == ''" class=" italic text-red-500"> (nuevo)</span>
                                </td>
                            <td>
                                <div class="w-full relative">
                                    <p class="verflow-hidden truncate w-40 md:w-96">{{ puesto.observacion }}</p>
                                </div></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <modal v-if="isOpenModalPuesto" @on:close="closeModalPuesto" clase="mt-6 w-6/12">
            <template v-slot:body>
                <Puesto @on:close="closeModalPuesto"></Puesto>
            </template>
        </modal>
     
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"
import { ref, computed } from 'vue';
import Modal from "../../../components/Modal.vue";
import Puesto from "./Puesto.vue";

export default {
    setup(_, context) {
        const empresaStore = useEmpresaStore();
        const isOpenModalPuesto = ref(false);

        const newPuesto = async() => {
            await empresaStore.clearPuesto()
            isOpenModalPuesto.value = true
        }

        const onclickPuesto = ( idx ) => {
            empresaStore.loadPuesto(idx)
            isOpenModalPuesto.value = true
        }

        return {
            puestos: computed(() => empresaStore.empresa.puestos),
            newPuesto,
            onclickPuesto,
            isOpenModalPuesto,
            openModalPuesto: () => isOpenModalPuesto.value = true,
            closeModalPuesto: () => isOpenModalPuesto.value = false,            
        };
    },
    components: { Modal, Puesto }
}
</script>