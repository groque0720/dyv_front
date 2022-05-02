<template>
    <div>
        <div class="flex justify-between items-center pb-1">
            <span class=" font-semibold"> Lista de Áreas </span>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="newArea()">
                    <i class="icon-nuevo"></i>
                    <span> Crear Área</span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border rounded">

            <!-- <div class=" grid grid-rows-6 grid-flow-col gap-2">
                <template v-for="( area, idx ) in areas" :key="area.id">
                    <div class="p-2 border border-indigo-500 rounded-full flex items-center justify-center">
                        <span>{{ area.area }}</span>
                    </div>
                </template>
            </div> -->


            <table>
                <thead>
                    <tr>
                        <th>Área</th>
                        <th>Observación</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( area, idx ) in areas" :key="area.id">
                        <tr @click="onclickArea( idx )">
                            <td>
                                <span class=" text-indigo-500 font-semibold">{{ area.area }}</span>
                                <span v-if="area.id == ''" class=" italic text-red-500"> (nuevo)</span>
                                </td>
                            <td>
                                <div class="w-full relative">
                                    <p class="verflow-hidden truncate w-40 md:w-96">{{ area.observacion }}</p>
                                </div></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <modal v-if="isOpenModalArea" @on:close="closeModalArea" clase="mt-6 w-6/12">
            <template v-slot:body>
                <Area @on:close="closeModalArea"></Area>
            </template>
        </modal>
     
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"
import { ref, computed } from 'vue';
import Modal from "../../../components/Modal.vue";
import Area from "./area.vue";

export default {
    name: 'Areas',
    setup(_, context) {
        const empresaStore = useEmpresaStore();
        const isOpenModalArea = ref(false);

        const newArea = () => {
            empresaStore.clearArea()
            isOpenModalArea.value = true
        }

        const onclickArea = ( idx ) => {
            empresaStore.loadArea(idx)
            isOpenModalArea.value = true
        }

        return {
            areas: computed(() => empresaStore.empresa.areas),
            newArea,
            onclickArea,
            isOpenModalArea,
            openModalArea: () => isOpenModalArea.value = true,
            closeModalArea: () => isOpenModalArea.value = false,            
        };
    },
    components: { Modal, Area }
}
</script>