<template>
    <div class="p-3 bg-white">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg">Empresas</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                   @click.prevent="router.push({ name: 'empresa_create' })">
                    <i class="icon-nuevo"></i>
                    <span> Nueva Empresa</span> 
                </a>
            </div>
        </div>

        <div  class="mt-2 w-full border shadow p-3 rounded">

            <table class=" table-auto w-full">
            
                <thead class="">
                    <tr class="border-b-2 h-9">
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
                                            {{ empresa.sucursals.length
                                                ? empresa.sucursals[0].direccion
                                                : ' - '  }} </span>
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
                                    <span>{{ empresa.sucursals.length }}</span>
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
 
    </div>
</template>

<script>

import { mapActions, mapState } from "pinia"
import { useEmpresaStore } from "../store"
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import router from "../router";

export default {
    setup() {
        const router = useRouter();
        const empresaStore = useEmpresaStore()

        return {
            router,
        }
    },
    created() {
        this.cargarEmpresas();
    },
    methods: {
        ...mapActions(useEmpresaStore,['cargarEmpresas','onEmpresaSelected']),

        onClickEmpresa( idx ){
            this.router.push({ name: 'empresa_show',  params: { id: this.empresas[idx].id }  })
        }
    },
    computed: {
        ...mapState(useEmpresaStore,['empresas'])
    }
}
</script>