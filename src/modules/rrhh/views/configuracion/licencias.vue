<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else> 
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-licencia text-lg"></i>
                <span class=" text-lg">Licencia</span>
            </div>
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="newLicencia">
                    <i class="icon-nuevo"></i>
                    <span> Crear Licencia </span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow rounded">
            <table>
                <thead class="">
                    <tr>
                        <th class="w-3/12">Licencia</th>
                        <th class="w-7/12">Observación</th>
                        <th class="w-2/12">Icono</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="( licencia, idx ) in licencias" :key="licencia.id">
                        <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onClickLicencia( idx )">
                            <td>
                                <div class="flex flex-col justify-center">
                                    <span class="text-indigo-500 font-semibold"> {{ licencia.licencia_tipo }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex">
                                    <!-- <p v-html="licencia.observacion"></p> -->
                                    <textarea class="w-full resize-none overflow-hidden bg-transparent" v-text="licencia.observacion" readonly disabled></textarea>
                                </div>
                            </td>
                            <td>
                                <div class="flex flex-col justify-center items-center">
                                    <span class="font-semibold text-xl" :style="`color: ${ licencia.icono_color }`" v-html=" licencia.licencia_icono "></span>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <modal v-if="isOpenModalLicencia" @on:close="closeModalLicencia" clase="mt-6 w-6/12">
            <template v-slot:body>
                <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
                    <div class="flex gap-3">
                        <i class="icon-licencia text-lg"></i>
                        <span class=" text-lg"> {{ licenciaForm.licencia }}</span>
                    </div>
                    <div class="flex gap-3">
                        <span class=" text-lg">{{ licenciaForm.id != undefined ? 'Editar ' : 'Crear' }} Licencia</span>
                    </div> 
                </div>
                <form action="#" @submit.prevent="submitForm()">
                    <div class="form-row flex justify-between gap-3">
                        <div class=" flex-1">
                            <label class="required" for="">Licencia</label>
                            <input class="form-input" type="text" v-model="licenciaForm.licencia_tipo" required>
                        </div>
                    </div>
                    <div class="form-row flex justify-between gap-3">
                        <div class=" flex-1">
                            <label for="">Observación</label>
                            <textarea class="form-textarea" rows="5" type="text" v-model="licenciaForm.observacion"></textarea>
                        </div>
                    </div>
                    <div class="form-row flex justify-between items-center gap-3">
                        <div class="w-7/12">
                            <label class="required" for="">
                                Clase Icono
                                <a target="_blank" href="https://fontawesome.com/v5/search?m=free">
                                <i class="fas fa-search text-indigo-500"></i></a></label>
                            <input class="form-input" type="text" v-model="licenciaForm.licencia_icono">
                        </div>
                        <div class="w-3/12">
                            <label for="">
                                Color
                            </label>
                            <select class="form-select" name="" id="" v-model="licenciaForm.icono_color">
                                <option v-for="color in colores" :value="color.name">{{ color.nombre }}</option>
                            </select>
                        </div>
                        <div class="w-2/12">
                            <div class="m-auto flex flex-col justify-center items-center">
                                <label for="">Icono</label>
                                <div :style="`color: ${ licenciaForm.icono_color }`">
                                    <span class="text-4xl"  v-html="licenciaForm.licencia_icono"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row flex justify-between border-t-2 mt-3 pt-3">
                        <span class="form-btn-cancelar" @click.prevent="closeModalLicencia" type="text">Volver</span>
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
    name: 'Licencias',
    setup() {
        const rrhhStore = useRrhhStore()
        const onProcess = ref(false)
        const licenciaForm = ref({})
        const isOpenModalLicencia = ref(false)
        const isLoading = ref(true)

        const colores = [   { name:'black', nombre:'Negro' },
                            { name:'gray', nombre:'Gris' },
                            { name:'red', nombre:'Rojo' },
                            { name:'orange', nombre:'Naranja' },
                            { name:'teal', nombre:'Verde Azulado' },
                            { name:'cyan', nombre:'Cian' },
                            { name:'blue', nombre:'Azul' },
                            { name:'indigo', nombre:'Indigo' },
                            { name:'violet', nombre:'Violeta' },
                            { name:'purple', nombre:'Purpura' },
                            { name:'fuchsia', nombre:'Fucsia' },
                            { name:'pink', nombre:'Rosa' },
                            { name:'yellow', nombre:'Amarillo' },
                            { name:'lime', nombre:'Lima' },
                            { name:'white', nombre:'Blanco' },
                            { name:'green', nombre:'Verde' } ]

        const loadLicencias = async () => {
            const { ok, message } = await rrhhStore.loadLicencias()
            if (!ok)
                Swal.fire("Error", message, "error")
            isLoading.value = false
        };

        const newLicencia = () => {
            licenciaForm.value = {}
            isOpenModalLicencia.value = true
        }

        const onClickLicencia = async( idx ) => {
            const { ok, licencia } = await rrhhStore.selectedLicencia(idx);
            if ( ok ) {
                licenciaForm.value = licencia
                isOpenModalLicencia.value = true
            }else{
                Swal.fire("Error", message, "error");
            }
        }

        const createLicencia = async() => {
            onProcess.value = true
            const { ok, message } = await rrhhStore.createLicencia( licenciaForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")  
            onProcess.value = false
            isOpenModalLicencia.value = false
        }

        const editLicencia = async() => {
            onProcess.value = true
            const { ok } = await rrhhStore.editLicencia( licenciaForm.value )
            if ( !ok ) Swal.fire("Error", message, "error")
            onProcess.value = false
            isOpenModalLicencia.value = false 
        }


        const submitForm = async() => {
            if ( licenciaForm.value.id != undefined ) editLicencia()
            else createLicencia()
        }

        loadLicencias();

        return {
            isLoading,
            onProcess,
            isOpenModalLicencia,
            licenciaForm,
            colores,
            newLicencia,
            onClickLicencia,
            submitForm,
            licencias: computed(() => rrhhStore.licencias),
            closeModalLicencia: (() => isOpenModalLicencia.value = false)
        };
    },
    components: { Modal, Loading }
}
</script>