<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-licencia text-lg"></i>
                <span class=" text-lg">Editar Licencia {{ licenciaForm.licencia_tipo.licencia_tipo || 'Nueva'  }}</span>
            </div>
        </div>

        <form action="#" @submit.prevent="enviarForm()" autocomplete="off" class="mt-2 p-3 border rounded">

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Licencia</label>
                    <div class="flex justify-center items-center gap-2" @click="onClickLicencia()">
                        <i class="icon-search cursor-pointer"></i>
                        <input class="form-input" type="text" name="licencia" v-model="licenciaForm.licencia_tipo.licencia_tipo"  readonly required>
                        <!-- <input class="form-input" type="text" name="puesto" v-model="licenciaForm.id"  readonly required> -->
                    </div>
                    <!-- <Errors :errors="errors" :field="'puesto'"></Errors> -->
                </div>
                <div class="">
                    <label class="required" for="">Fecha Inicio</label>
                    <input class="form-input" type="date" v-model="licenciaForm.fecha_inicio" required>
                </div> 
                <div class="">
                    <label for="">Fecha Fin</label>
                    <input class="form-input" type="date" v-model="licenciaForm.fecha_fin">
                </div>   
            </div>
            <div class="form-row mt-2 w-full">
                <label for="">Observación</label>
                <textarea class="w-full form-input"  name="" id="" cols="30" rows="10" v-model="licenciaForm.observacion"></textarea>
            </div>
            <div class="form-row flex justify-between border-indigo-300 border-t-2 mt-3 pt-3">
                <span class="form-btn-cancelar" @click.prevent="cancelar()" type="text">Volver</span>
                <button class="form-btn-submit" :disabled="onProcess">
                    <i v-if="onProcess" class="fas fa-spinner animate-spin mr-2"></i>
                    <span v-if="onProcess">Procesando...</span>
                    <span v-else>Guardar</span>    
                </button>
            </div>         
        </form>

        
        <Modal  v-if="isOpenModalLicencia" @on:close="closeModalLicencia" clase=" w-full sm:w-10/12 md:w-9/12 lg:w-7/12">
            <template v-slot:body>
            <div class="bg-white min-h-60 max-h-80">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2"><i class="icon-search text-xl"></i><span>Buscar Licencia</span></div>
                    <span><i class="icon-cerrar text-2xl cursor-pointer" @click="isOpenModalLicencia=false"></i></span>
                </div>
                <input class="form-input mb-1" type="search"  placeholder="Buscar Licencia" v-model="searchLicencia">
                    <div class="bg-white border rounded w-full border-indigo-300 max-h-60 overflow-x-auto">
                        <Loading v-if="isLoadingLicencia"></Loading>
                        <template v-else>
                            <div v-for="licencia in licencias" :key="licencia.id"
                                    @click="onSelectedLicencia(licencia)"
                                    class="flex justify-start items-center gap-3 p-2 border-b border-indigo-300 cursor-pointer hover:bg-indigo-50">
                                    <div class="w-1/12 text-center">
                                        <span class="font-semibold text-xl"
                                                :style="`color: ${ licencia.icono_color }`"
                                                v-html=" licencia.licencia_icono "></span>
                                    </div>
                                    <div class="w-2/12">
                                        <span class="text-indigo-500 font-semibold">{{ licencia.licencia_tipo }}</span>
                                    </div> 
                                    <div class="flex-1">
                                        <template v-if="licencia.observacion">
                                            <span >{{ licencia.observacion.substring(0,150) + ' ...' }}</span>
                                        </template>
                                    </div>                               
                            </div>
                        </template>
                    </div>                    
            </div>
            </template>
        </Modal>

    </div>
</template>

<script>
import { useRrhhStore } from "../store"
import Loading from '@/components/Loading.vue';
import { ref, computed } from 'vue';
import Modal from "../../../components/Modal.vue";
import Swal from 'sweetalert2';
import { createToast } from 'mosha-vue-toastify';
import { useRouter } from 'vue-router';

export default {
    props: {
        id: String,
        licencia_id: String
    },
    setup(props) {
        const rrhhStore = useRrhhStore()
        const router = useRouter()
        const isLoading = ref(true)
        const onProcess = ref(false)

        const isOpenModalLicencia = ref(false)
        const isLoadingLicencia = ref(false)
        const searchLicencia = ref('')
        

        const licenciaForm = ref({
            fecha_inicio: null,
            fecha_fin: null,
            observacion: null,
            licencia_tipo: {
                licencia_tipo: null,
                icono_color: null,
                licencia_icono: null
            }
        });

        const optionsToast = (type) => ({
            type: type,
            transition:'slide',
            showIcon: true,
            timeout: 2000
        })

        const loadEmpleado = async () => {
            if (rrhhStore.empleado.id != undefined)
                loadLicencia();
            isLoading.value = true;
            const { ok, message } = await rrhhStore.loadEmpleado(props.id);
            if (!ok)
                Swal.fire("Error", message, "error");
            else
                loadLicencia();
            isLoading.value = false;
        };

        const loadLicencia = async () => {
            if (props.licencia_id === "nuevo")
                return null;
            isLoading.value = true;
            const idx = rrhhStore.empleado.licencias.findIndex(licencia => licencia.id == props.licencia_id);
            if (idx < 0)
                Swal.fire("Error", "El colaborador no tiene el licencia buscado", "error");
            licenciaForm.value = await rrhhStore.empleado.licencias[idx];
            isLoading.value = false;
        };


        const onClickLicencia = async() => {
            isLoadingLicencia.value = true
            searchLicencia.value = ''
            const { ok, message } = await rrhhStore.getLicencias();
            if ( !ok ) Swal.fire("Error", message, "error")
            isOpenModalLicencia.value = true
            isLoadingLicencia.value = false
        }

        const onSelectedLicencia = async( licencia ) => {
            const existeLicencia = await rrhhStore.empleado.licencias.find( licencia_ => licencia_.licencia_tipo.id == licencia.id )
            if ( existeLicencia != undefined && existeLicencia.fecha_fin == null ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Licencia Duplicado',
                    text: `'${ licencia.licencia_tipo }' ya está seleccionado y activo`,
                })
            } else {
                licenciaForm.value.licencia_tipo.licencia_tipo = licencia.licencia_tipo
                licenciaForm.value.licencia_tipo.id = licencia.id
                isOpenModalLicencia.value = false
            }
        }

            const enviarForm = async () => {
                rrhhStore.errors = []
                onProcess.value = true
                if ( licenciaForm.value.id != undefined ) {
                    console.log(licenciaForm.value.id);
                    const { ok, message } = await rrhhStore.updateEmpleadoLicencia( licenciaForm.value )
                    if ( !ok ) Swal.fire("Error", message, "error")
                    else createToast('Se guardó correctamente', optionsToast('success') )
                    await rrhhStore.loadEmpleado(props.id)
                    router.push({ name: 'rrhh_empleado_licencias'})
                }else{
                    const { ok, message, licencia } = await rrhhStore.createEmpleadoLicencia( licenciaForm.value )
                    if ( !ok ) Swal.fire("Error", message, "error")
                    else {
                        await rrhhStore.loadEmpleado(props.id)
                        createToast('Se creó correctamente', optionsToast('success') )
                        // licenciaForm.value.id = licencia.id
                        router.push({ name: 'rrhh_empleado_licencias'})
                        // router.push({ name: 'rrhh_empleado_licencia', params: { licencia_id: licencia.id } } )
                    }
                }
                onProcess.value = false
            }







        const cancelar = async() => {
            await loadEmpleado()
            createToast('No se guardaron los cambios', optionsToast('warning') )
        }

        loadEmpleado();

        return {
            isLoading,
            onProcess,
            licenciaForm,
            searchLicencia,
            isOpenModalLicencia,
            isLoadingLicencia,
            onClickLicencia,
            licencias: computed( () => rrhhStore.getLicenciaSearch( searchLicencia.value ) ),
            onSelectedLicencia,
            openModalLicencia: () => isOpenModalLicencia.value = true,
            closeModalLicencia: () => isOpenModalLicencia.value = false,
            enviarForm,
            cancelar,
        };
    },
    components: { Loading, Modal }
}
</script>

