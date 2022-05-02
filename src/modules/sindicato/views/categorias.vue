<template>
    <div>
        <div class="flex justify-between items-center pb-1">
            <span class=" font-semibold"> Lista de categorías </span>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="newCategoria()">
                    <i class="icon-nuevo"></i>
                    <span> Nueva Categoria</span> 
                </a>
            </div>
        </div>
        <div class="w-full border rounded">
            <table>
                <thead>
                    <tr>
                        <th>Categorías</th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( categoria, idx ) in sindicatoForm.categorias" :key="categoria.id">
                        <tr @click="onclickCategoria( idx )">
                            <td><span class=" text-indigo-500 font-semibold">{{ categoria.categoria }}</span></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <Modal v-if="isOpenModalCategoria" @on:close="closeModalCategoria" clase="mt-6 w-5/12">
            <template v-slot:body>
                <Categoria @on:close="closeModalCategoria"></Categoria>
            </template>
        </Modal>
     
    </div>
</template>

<script>
import Modal from "../../../components/Modal.vue";
import { useSindicatoStore } from "../store";
import Categoria from "./categoria.vue";
import { computed, ref } from 'vue';

export default {
    setup(context){
        const sindicatoStore = useSindicatoStore()
        const isOpenModalCategoria = ref(false)

        const newCategoria = async() => {
            await sindicatoStore.newCategoria()
            isOpenModalCategoria.value = true
        }

        const onclickCategoria = async (idx) => {
            await sindicatoStore.selectedCategoria(idx)
            isOpenModalCategoria.value = true
        }
        
        return {
            sindicatoForm: computed( ()=> sindicatoStore.sindicato ),
            newCategoria,
            onclickCategoria,
            isOpenModalCategoria,
            openModalCategoria: () => isOpenModalCategoria.value = true,
            closeModalCategoria: () => isOpenModalCategoria.value = false,
        }
    },
    components: { Modal, Categoria }
}

</script>