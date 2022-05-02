<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else> 
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-estado-civil text-lg"></i>
                <span class=" text-lg">Estados Civiles</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="newEstadoCivil">
                    <i class="icon-nuevo"></i>
                    <span> Crear Estado Civil </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow rounded">
            <table>
                <thead class="">
                    <tr>
                        <th>Estado Civil</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="( estado_civil, idx ) in estados_civiles" :key="estado_civil.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickEstadoCivil( idx )">
                            <!-- Empresa // direccion -->
                            <td>
                                <div class="flex flex-auto gap-3">
                                    <div class="flex flex-col justify-center">
                                        <span class="text-indigo-500 font-semibold"> {{ estado_civil.estado_civil }}</span>
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
        <modal v-if="isOpenModalEstadoCivil" @on:close="closeModalEstadoCivil" clase="mt-6 w-6/12">
            <template v-slot:body>
                <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
                    <div class="flex gap-3">
                        <i class="icon-estado-civil text-lg"></i>
                        <span class=" text-lg"> {{ estadoCivilForm.estado_civil }}</span>
                    </div>
                    <div class="flex gap-3">
                        <span class=" text-lg">{{ estadoCivilForm.id != undefined ? 'Editar ' : 'Crear' }} Estado Civil</span>
                    </div> 
                </div>
                <form action="#" @submit.prevent="submitForm()">
                    <div class="form-row flex justify-between gap-3">
                        <div class=" flex-1">
                            <label class="required" for="">Estado Civil</label>
                            <input class="form-input" type="text" v-model="estadoCivilForm.estado_civil" required>
                        </div>
                    </div>
                    <div class="form-row flex justify-between border-t-2 mt-3 pt-3">
                        <span class="form-btn-cancelar" @click.prevent="closeModalEstadoCivil" type="text">Volver</span>
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
        const estadoCivilForm = ref({})
        const isOpenModalEstadoCivil = ref(false)
        const isLoading = ref(true)

        const loadEstadosCiviles = async () => {
            const { ok } = await rrhhStore.loadEstadosCiviles()
            if (!ok)
                Swal.fire("Error", message, "error")
            isLoading.value = false
        };

        const newEstadoCivil = () => {
            estadoCivilForm.value = {}
            isOpenModalEstadoCivil.value = true
        }

        const onClickEstadoCivil = async( idx ) => {
            const { ok, estado_civil } = await rrhhStore.selectedEstadoCivil(idx);
            if ( ok ) {
                estadoCivilForm.value = estado_civil
                isOpenModalEstadoCivil.value = true
            }else{
                Swal.fire("Error", message, "error");
            }
        }

        const createEstadoCivil = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.createEstadoCivil( estadoCivilForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")  
            onProcess.value = false
            isOpenModalEstadoCivil.value = false
        }

        const editEstadoCivil = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.editEstadoCivil( estadoCivilForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")
            onProcess.value = false
            isOpenModalEstadoCivil.value = false 
        }


        const submitForm = async() => {
            if ( estadoCivilForm.value.id != undefined ) editEstadoCivil()
            else createEstadoCivil()
        }

        loadEstadosCiviles();

        return {
            isLoading,
            onProcess,
            isOpenModalEstadoCivil,
            estadoCivilForm,
            newEstadoCivil,
            onClickEstadoCivil,
            submitForm,
            estados_civiles: computed(() => rrhhStore.estados_civiles),
            closeModalEstadoCivil: (() => isOpenModalEstadoCivil.value = false)
        };
    },
    components: { Modal, Loading }
}
</script>