<template>
    <div class="bg-white">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-sindicato text-lg"></i>
                <span class=" text-lg">Sindicatos</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                   @click.prevent="onNewSindicato()">
                    <i class="icon-nuevo"></i>
                    <span> Crear Sindicato </span> 
                </a>
            </div>
        </div>

        <div  class="mt-2 w-full border shadow rounded">

            <table>
                <thead>
                    <tr>
                        <th>Sindicato</th>
                        <th>Cuit</th>
                        <th>Categorías</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sindicato,idx) in sindicatos" :key="idx" @click="onSelectedSindicato(idx)">
                        <td>{{ sindicato.sindicato }}</td>
                        <td><div class="text-center">{{ sindicato.cuit }}</div></td>
                        <td><div class="text-center">{{ sindicato.categorias.length}}</div></td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div> 

    <Modal v-if="isOpenModalSindicato" @on:close="closeModalSindicato" clase=" w-full md:w-6/12">
        <template v-slot:body>
            <sindicato @on:close="closeModalSindicato"></sindicato> 
        </template>
    </Modal>   
    <!-- <modal v-if="isOpenModalEmpresa" @on:close="closeModalEmpresa" clase=" w-full md:w-7/12">
            <template v-slot:body>
                <Empresa @on:close="closeModalEmpresa" :id="empresaIdSelected"></Empresa>
            </template>
    </modal>     -->
</template>

<script>

import { useSindicatoStore } from "../store"
import { ref, computed } from 'vue';
import { mapActions } from "pinia";
import Modal from "../../../components/Modal.vue";
import sindicato from "./sindicato.vue";
import empleadoPerfilVue from "../../rrhh/views/empleadoPerfil.vue";


export default {
    setup() {
        const sindicatoStore = useSindicatoStore();
        const isOpenModalSindicato = ref(false)
        return {
            sindicatos: computed(() => sindicatoStore.sindicatos),
            isOpenModalSindicato,
            openModalSindicato: () => isOpenModalSindicato.value = true,
            closeModalSindicato: () => isOpenModalSindicato.value = false,
        };
    },
    created() {
        this.loadSindicatos();
    },
    methods: {
        ...mapActions(useSindicatoStore, ['loadSindicatos', 'selectedSindicato','newSindicato']),

        async onSelectedSindicato(idx) {
            await this.selectedSindicato(idx)
            this.isOpenModalSindicato = true
        },

        async onNewSindicato(){
            await this.newSindicato()
            this.isOpenModalSindicato = true
        },
    },
    components: { Modal, sindicato }
}

</script>