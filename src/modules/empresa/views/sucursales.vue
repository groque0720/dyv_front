<template>
    <div>
        <div class="flex justify-between items-center pb-1">
            <span class=" font-semibold"> Lista de Sucursales </span>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="nuevaSucursal">
                    <i class="icon-nuevo"></i>
                    <span> Nueva Sucursal</span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border rounded">
            <table>
                <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Dirección</th>
                        <th>Casa Central</th>
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( sucursal, idx ) in empresaForm.sucursales" :key="sucursal.id">
                        <tr @click="onclickSucursal( idx )">
                            <td>
                                <span class=" text-indigo-500 font-semibold">{{ sucursal.nombre }}</span>
                                <span v-if="sucursal.id == ''" class=" italic text-red-500"> (nuevo)</span>
                                </td>
                            <td>{{ sucursal.calle }} {{ sucursal.nro }} {{ sucursal.localidad }} {{ sucursal.provincia }} </td>
                            <td><div class="text-center">
                                    <template v-if="sucursal.central == 1">
                                        <i class="icon-check"></i>
                                    </template>
                                </div></td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <modal v-if="isOpenModalSucursal" @on:close="closeModalSucursal" clase="mt-6 w-6/12">
            <template v-slot:body>
                <Sucursal @on:close="closeModalSucursal" :id="sucursalIdSelected"></Sucursal>
            </template>
        </modal>
     
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import Sucursal from "./sucursal.vue";
import Modal from "../../../components/Modal.vue";
import { mapActions, mapState } from 'pinia';

export default {
    setup() {
        const empresaStore = useEmpresaStore();
        const router = useRouter();
        const isOpenModalSucursal = ref(false);

        return {
            router,
            empresaForm: computed(() => empresaStore.empresa),
            sucursalIdSelected: ref(),
            isOpenModalSucursal,
            openModalSucursal: () => isOpenModalSucursal.value = true,
            closeModalSucursal: () => isOpenModalSucursal.value = false,            
        };
    },
    methods: {

        ...mapActions(useEmpresaStore, ['loadSucursal','clearSucursal']),

        async onclickSucursal(idx) {
            const { ok } = this.loadSucursal(idx);
            if( !ok ) Swal.fire("Error", message, "error");
            this.openModalSucursal();
        },

        async nuevaSucursal() {
            const { ok } = await this.clearSucursal()
            this.openModalSucursal();
        }

    },
    computed: {
        ...mapState(useEmpresaStore, ['empresa'])
    },
    components: { Sucursal, Modal }
}
</script>