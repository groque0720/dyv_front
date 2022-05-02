<template>
    <div>
        <div class="flex justify-between items-center pb-1">
            <span class=" font-semibold"> Lista de Sectores </span>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="newSector()">
                    <i class="icon-nuevo"></i>
                    <span> Nuevo Sector</span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border rounded">
            <table>
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Observación</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( sector, idx ) in sectores" :key="sector.id">
                        <tr @click="onclickSector( idx )">
                            <td>
                                <span class=" text-indigo-500 font-semibold">{{ sector.sector }}</span>
                                <span v-if="sector.id == ''" class=" italic text-red-500"> (nuevo)</span>
                                </td>
                            <td>{{ sector.observacion }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <modal v-if="isOpenModalSector" @on:close="closeModalSector" clase="mt-6 w-6/12">
            <template v-slot:body>
                <Sector @on:close="closeModalSector"></Sector>
            </template>
        </modal>
     
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"
import { ref, computed } from 'vue';
import Modal from "../../../components/Modal.vue";
import Sector from "./sector.vue";

export default {
    setup(_, context) {
        const empresaStore = useEmpresaStore();
        const isOpenModalSector = ref(false);

        const newSector = async() => {
            await empresaStore.clearSector()
            isOpenModalSector.value = true
        }

        const onclickSector = ( idx ) => {
            empresaStore.loadSector(idx)
            isOpenModalSector.value = true
        }

        return {
            sectores: computed(() => empresaStore.empresa.sectores),
            newSector,
            onclickSector,
            isOpenModalSector,
            openModalSector: () => isOpenModalSector.value = true,
            closeModalSector: () => isOpenModalSector.value = false,            
        };
    },
    components: { Modal, Sector }
}
</script>