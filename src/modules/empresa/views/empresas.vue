<template>

    <Loading v-if="isLoading"></Loading>
    
    <div v-else class="bg-white">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg">Empresas</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                   @click.prevent="nuevaEmpresa()">
                    <i class="icon-nuevo"></i>
                    <span> Nueva Empresa</span> 
                </a>
            </div>
        </div>

        <div  class="mt-2 w-full border shadow rounded">

            <table>
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Cuit</th>
                        <th>Sucursales</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( empresa, idx ) in empresas" :key="empresa.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickEmpresa( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ empresa.nombre }}</span>
                                        <span class="text-xs">
                                            {{ empresa.sucursales.length
                                                ? empresa.sucursales[0].direccion
                                                : ' - '  }} </span>
                                        <span v-if="empresa.id == ''" class=" italic text-red-500"> (nuevo)</span>
                                    </div>
                                </div>
                            </td>
                            <!-- Cuit -->
                            <td>
                                <div class="flex justify-center items-center">
                                    <span>{{ empresa.cuit }}</span>
                                </div>
                            </td>
                            <!-- Sucursales -->
                            <td>
                                <div class="flex justify-center items-center">
                                    <span>{{ empresa.sucursales.length }}</span>
                                </div>
                            </td>
                            <!-- Acciones -->
                            <td>
                                <i class="icon-editar"></i>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <modal v-if="isOpenModalEmpresa" @on:close="closeModalEmpresa" clase=" w-full sm:w-10/12 md:w-9/12 lg:w-7/12">
            <template v-slot:body>
                <Empresa @on:close="closeModalEmpresa"></Empresa>
            </template>
        </modal>

    </div>
</template>

<script>

import { mapActions, mapState } from "pinia"
import { useEmpresaStore } from "../store"
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import router from "../router";
import Modal from "../../../components/Modal.vue";
import Empresa from "./empresa.vue";
import Loading from "../../../components/Loading.vue";

export default {
    name: 'Empresas',
    setup() {
        const empresaStore = useEmpresaStore()

        const isOpenModalEmpresa = ref(false)
        const isLoading = ref(true)
        
        return {
            isLoading,
            empresas: computed( ()=> empresaStore.empresas ),
            isOpenModalEmpresa,
            openModalEmpresa: () => isOpenModalEmpresa.value = true,
            closeModalEmpresa: () => isOpenModalEmpresa.value = false,
        };
    },
    async created() {
        await this.loadEmpresas()
        this.isLoading = false
    },
    methods: {
        ...mapActions(useEmpresaStore, ["loadEmpresas", "selectedEmpresa", "clearEmpresa"]),
         async onClickEmpresa(idx) {
            //  this.isLoading = true
            const { ok } = await this.selectedEmpresa(idx)
            if ( ok ) {
                this.openModalEmpresa()
                // this.isLoading = false
            }
        },
        nuevaEmpresa() {
            this.openModalEmpresa()
        }
    },
    // computed: {
    //     ...mapState(useEmpresaStore, ["empresas"])
    // },
    components: { Modal, Empresa, Loading }
}
</script>