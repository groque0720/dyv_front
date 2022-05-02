<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else> 
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-sexo text-lg"></i>
                <span class=" text-lg">Sexos</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="newSexo">
                    <i class="icon-nuevo"></i>
                    <span> Crear Sexo </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow rounded">
            <table>
                <thead class="">
                    <tr>
                        <th>sexo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="( sexo, idx ) in sexos" :key="sexo.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickSexo( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ sexo.sexo }}</span>
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
        <modal v-if="isOpenModalSexo" @on:close="closeModalSexo" clase="mt-6 w-6/12">
            <template v-slot:body>
                <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
                    <div class="flex gap-3">
                        <i class="icon-sexo text-lg"></i>
                        <span class=" text-lg"> {{ sexoForm.sexo }}</span>
                    </div>
                    <div class="flex gap-3">
                        <span class=" text-lg">{{ sexoForm.id != undefined ? 'Editar ' : 'Crear' }} Sexo</span>
                    </div> 
                </div>
                <form action="#" @submit.prevent="submitForm()">
                    <div class="form-row flex justify-between gap-3">
                        <div class=" flex-1">
                            <label class="required" for="">Sexo</label>
                            <input class="form-input" type="text" v-model="sexoForm.sexo" required>
                        </div>
                    </div>
                    <div class="form-row flex justify-between border-t-2 mt-3 pt-3">
                        <span class="form-btn-cancelar" @click.prevent="closeModalSexo" type="text">Volver</span>
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
    name: 'Sexo',
    setup() {
        const rrhhStore = useRrhhStore()
        const onProcess = ref(false)
        const sexoForm = ref({})
        const isOpenModalSexo = ref(false)
        const isLoading = ref(true)

        const loadSexos = async () => {
            const { ok } = await rrhhStore.loadSexos()
            if (!ok)
                Swal.fire("Error", message, "error")
            isLoading.value = false
        };

        const newSexo = () => {
            sexoForm.value = {}
            isOpenModalSexo.value = true
        }

        const onClickSexo = async( idx ) => {
            const { ok, sexo } = await rrhhStore.selectedSexo(idx);
            if ( ok ) {
                sexoForm.value = sexo
                isOpenModalSexo.value = true
            }else{
                Swal.fire("Error", message, "error");
            }
        }

        const createSexo = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.createSexo( sexoForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")  
            onProcess.value = false
            isOpenModalSexo.value = false
        }

        const editSexo = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.editSexo( sexoForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")
            onProcess.value = false
            isOpenModalSexo.value = false 
        }


        const submitForm = async() => {
            if ( sexoForm.value.id != undefined ) editSexo()
            else createSexo()
        }

        loadSexos();

        return {
            isLoading,
            onProcess,
            isOpenModalSexo,
            sexoForm,
            newSexo,
            onClickSexo,
            submitForm,
            sexos: computed(() => rrhhStore.sexos),
            closeModalSexo: (() => isOpenModalSexo.value = false)
        };
    },
    components: { Modal, Loading }
}
</script>