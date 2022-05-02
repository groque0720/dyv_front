<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else> 
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-vinculo text-lg"></i>
                <span class=" text-lg">Vínculo</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="newVinculo">
                    <i class="icon-nuevo"></i>
                    <span> Crear Vínculo </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow rounded">
            <table>
                <thead class="">
                    <tr>
                        <th>Vínculo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="( vinculo, idx ) in vinculos" :key="vinculo.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickVinculo( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ vinculo.vinculo }}</span>
                                    </div>
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
        <modal v-if="isOpenModalVinculo" @on:close="closeModalVinculo" clase="mt-6 w-6/12">
            <template v-slot:body>
                <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
                    <div class="flex gap-3">
                        <i class="icon-sexo text-lg"></i>
                        <span class=" text-lg"> {{ vinculoForm.vinculo }}</span>
                    </div>
                    <div class="flex gap-3">
                        <span class=" text-lg">{{ vinculoForm.id != undefined ? 'Editar ' : 'Crear' }} Vínculo</span>
                    </div> 
                </div>
                <form action="#" @submit.prevent="submitForm()">
                    <div class="form-row flex justify-between gap-3">
                        <div class=" flex-1">
                            <label class="required" for="">Vínculo</label>
                            <input class="form-input" type="text" v-model="vinculoForm.vinculo" required>
                        </div>
                    </div>
                    <div class="form-row flex justify-between border-t-2 mt-3 pt-3">
                        <span class="form-btn-cancelar" @click.prevent="closeModalVinculo" type="text">Volver</span>
                        <button class="form-btn-submit" :disabled="onProcess">
                            <i v-if="onProcess" class="fas fa-spinner animate-spin mr-2"></i>
                            <span v-if="onProcess">Procesando...</span>
                            <span v-else>Aceptar</span>    
                        </button>
                    </div>
                </form>
            </template>
        </modal>
    </div>
</template>

<script>

import { useRrhhStore } from "../../store"
import { computed, ref } from 'vue';
import Modal from "@/components/Modal.vue";
import Swal from 'sweetalert2'
import Loading from "@/components/Loading.vue";

export default {
    name: 'Vinculos',
    setup() {
        const rrhhStore = useRrhhStore()
        const onProcess = ref(false)
        const vinculoForm = ref({})
        const isOpenModalVinculo = ref(false)
        const isLoading = ref(true)

        const loadVinculos = async () => {
            const { ok } = await rrhhStore.loadVinculos()
            if (!ok)
                Swal.fire("Error", message, "error")
            isLoading.value = false
        };

        const newVinculo = () => {
            vinculoForm.value = {}
            isOpenModalVinculo.value = true
        }

        const onClickVinculo = async( idx ) => {
            const { ok, vinculo } = await rrhhStore.selectedVinculo(idx);
            if ( ok ) {
                vinculoForm.value = vinculo
                isOpenModalVinculo.value = true
            }else{
                Swal.fire("Error", message, "error");
            }
        }

        const createVinculo = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.createVinculo( vinculoForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")  
            onProcess.value = false
            isOpenModalVinculo.value = false
        }

        const editVinculo = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.editVinculo( vinculoForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")
            onProcess.value = false
            isOpenModalVinculo.value = false 
        }


        const submitForm = async() => {
            if ( vinculoForm.value.id != undefined ) editVinculo()
            else createVinculo()
        }

        loadVinculos();

        return {
            isLoading,
            onProcess,
            isOpenModalVinculo,
            vinculoForm,
            newVinculo,
            onClickVinculo,
            submitForm,
            vinculos: computed(() => rrhhStore.vinculos),
            closeModalVinculo: (() => isOpenModalVinculo.value = false)
        };
    },
    components: { Modal, Loading }
}
</script>