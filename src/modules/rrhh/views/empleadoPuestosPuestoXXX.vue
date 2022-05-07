<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-puesto text-lg"></i>
                <span class=" text-lg">Editar Puesto</span>
            </div>
        </div>

        <form action="#" @submit.prevent="enviarForm()" autocomplete="off" class="mt-2 p-3 border rounded">

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Puesto</label>
                    <div class="flex justify-center items-center gap-2" @click="onClickPuesto()">
                        <i class="icon-search cursor-pointer"></i>
                        <input class="form-input" type="text" name="puesto" v-model="puestoForm.puesto"  readonly required>
                        <input class="form-input" type="text" name="puesto" v-model="puestoForm.id"  readonly required>
                    </div>
                    <!-- <Errors :errors="errors" :field="'puesto'"></Errors> -->
                </div>
                <div class="flex-1">
                    <label class="required" for="">Fecha Inicio</label>
                    <input class="form-input" type="date" v-model="puestoForm.user_puestos.fecha_inicio" required>
                </div> 
                <div class="flex-1">
                    <label for="">Fecha Fin</label>
                    <input class="form-input" type="date" v-model="puestoForm.user_puestos.fecha_fin">
                </div>   
            </div>
            
            <!-- <template v-if="puestoForm.user_puestos.id != undefined">

            <div class="flex justify-between items-center pb-1 border-b mt-2">
                <div class="flex gap-3">
                    <i class="icon-reemplazo text-lg"></i>
                    <span class=" text-lg">Reemplazos</span>
                </div>
                <div class="py-1">
                    <a class="text-indigo-500 cursor-pointer hover:font-extrabold " @click="onClickNewReemplazo()">
                        <i class="icon-nuevo"></i>
                        <span> Agregar reemplazo al puesto </span> 
                    </a>
                </div>
            </div>

            <div class="border rounded mt-2">
                <table>
                    <thead>
                        <tr>
                            <th>Reemplazos para el puesto {{ puestoForm.puesto }}</th>
                            <th>Quitar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(reemplazo, idx) in reemplazos" :key="reemplazo.id">
                            <td>
                                <div class="flex justify-star items-center gap-3 ">
                                    <img v-if="reemplazos" class="w-8 h-8 rounded-full object-cover"
                                            :src="baseURL+reemplazo.img " alt="">
                                    <span>{{ reemplazo.nombre_completo }}</span>
                                </div>
                            </td>
                            <td class="text-center">
                                <i class="icon-cerrar text-lg hover:text-red-600" @click="quitarReemplazo(idx, reemplazo)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </template> -->

            <div class="form-row flex justify-between border-indigo-300 border-t-2 mt-3 pt-3">
                <span class="form-btn-cancelar" @click.prevent="cancelar()" type="text">Volver</span>
                <button class="form-btn-submit" :disabled="onProcess">
                    <i v-if="onProcess" class="fas fa-spinner animate-spin mr-2"></i>
                    <span v-if="onProcess">Procesando...</span>
                    <span v-else>Guardar</span>    
                </button>
            </div> 
        </form>

        

        <Modal  v-if="isOpenModalReemplazo" @on:close="closeModalReemplazo" clase=" w-full sm:w-10/12 md:w-9/12 lg:w-7/12">
            <template v-slot:body>
            <div class="bg-white min-h-60 max-h-80">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2"><i class="icon-search text-xl"></i><span>Buscar Reemplazo</span></div>
                    <span><i class="icon-cerrar text-2xl cursor-pointer" @click="isOpenModalReemplazo=false"></i></span>
                </div>
                <input class="form-input mb-1" type="search"  placeholder="Apellido Nombre" v-model="searchReemplazo">
                    <div class="bg-white border rounded w-full border-indigo-300 max-h-60 overflow-x-auto">
                        <Loading v-if="isLoadingReemplazo"></Loading>
                        <template v-else>
                            <div v-for="reemplazo in reemplazos_search" :key="reemplazo.id" @click="onSelectedReemplazo(reemplazo)"
                                    class="flex justify-between items-center gap-3 p-2 border-b border-indigo-300 cursor-pointer hover:bg-indigo-50">
                                <img class="w-8 h-8 rounded-full object-cover"  :src="baseURL+reemplazo.img" alt="">
                                <span class="flex-1">{{ reemplazo.nombre_completo }}</span>
                            </div>
                        </template>
                    </div>                    
            </div>
            </template>
        </Modal>


        <Modal  v-if="isOpenModalPuesto" @on:close="closeModalPuesto" clase=" w-full sm:w-10/12 md:w-9/12 lg:w-7/12">
            <template v-slot:body>
            <div class="bg-white min-h-60 max-h-80">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2"><i class="icon-search text-xl"></i><span>Buscar Puesto</span></div>
                    <span><i class="icon-cerrar text-2xl cursor-pointer" @click="isOpenModalPuesto=false"></i></span>
                </div>
                <input class="form-input mb-1" type="search"  placeholder="Buscar Puesto" v-model="searchPuesto">
                    <div class="bg-white border rounded w-full border-indigo-300 max-h-60 overflow-x-auto">
                        <Loading v-if="isLoadingPuesto"></Loading>
                        <template v-else>
                            <div v-for="puesto in puestos_search" :key="puesto.id" @click="onSelectedPuesto(puesto)"
                                    class="flex justify-between items-center gap-3 p-2 border-b border-indigo-300 cursor-pointer hover:bg-indigo-50">
                                <i class="icon-puesto"></i>
                                <span class="flex-1">{{ puesto.puesto }}</span>
                            </div>
                        </template>
                    </div>                    
            </div>
            </template>
        </Modal>

        <!-- {{ puestoForm  }} -->

        <!-- {{ reemplazos_search }} -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRrhhStore } from "../store"
import Loading from '../../../components/Loading.vue';
import Errors from '../../../components/Errors.vue';
import Swal from 'sweetalert2';
import Modal from '../../../components/Modal.vue';
import { createToast } from 'mosha-vue-toastify';
import { useRouter } from 'vue-router';

  export default {
    props: {
        id: String,
        puesto_id: String
    },
    setup(props) {
        const router = useRouter();
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        const onProcess = ref(false)
        const isOpenModalReemplazo = ref(false)
        const isLoadingReemplazo = ref(false)
        const searchReemplazo = ref('')
        const isOpenModalPuesto = ref(false)
        const searchPuesto = ref('')
        const isLoadingPuesto = ref(false)
        let puestoForm = ref({})

        const optionsToast = (type) => ({
            type: type,
            transition:'slide',
            showIcon: true,
            timeout: 2000

        })

        // const loadPuesto = async() => {
        //     if (props.puesto_id != 'nuevo')
        //         puestoForm.value =  rrhhStore.empleado.puestos.find( puesto => puesto.id == props.puesto_id )
        // }

        const loadEmpleado = async () => {
            if (rrhhStore.empleado.id != undefined) {
                return
            }
            isLoading.value = true
            const { ok, message } = await rrhhStore.loadEmpleado(props.id)
            if (!ok)
                Swal.fire("Error", message, "error");
            else
                isLoading.value = false
        }

        const cancelar = async() => {
            isLoading.value = true
            const { ok, message } = await rrhhStore.loadEmpleado(props.id)
            if (!ok)
                Swal.fire("Error", message, "error");
            else
                {
                    isLoading.value = false
                    createToast('No se guardaron los cambios', optionsToast('warning') )
                }
        }


        const onClickPuesto = async() => {
            isLoadingPuesto.value = true
            searchPuesto.value = ''
            const { ok, message } = await rrhhStore.getPuestos();
            if ( !ok ) Swal.fire("Error", message, "error")
            isOpenModalPuesto.value = true
            isLoadingPuesto.value = false
        }


        const onClickNewReemplazo = async() => {
            isLoadingReemplazo.value = true
            searchReemplazo.value = ''
            const { ok, message } = await rrhhStore.loadSuperiores( rrhhStore.empleado.id )
            if ( !ok ) Swal.fire("Error", message, "error")
            isOpenModalReemplazo.value = true
            isLoadingReemplazo.value = false
        }

        const onSelectedReemplazo = async(reemplazo) => {

            const nuevo_reemplazo = {
                nombre_completo: reemplazo.nombre_completo,
                img: reemplazo.img,
                user_reemplazo: {
                    puesto_id: props.puesto_id,
                    reemplazo_id: reemplazo.id,
                    user_id: rrhhStore.empleado.id 
                }
            }
            await rrhhStore.empleado.reemplazos.push( nuevo_reemplazo )
            isOpenModalReemplazo.value = false
            createToast('Se agregó un nuevo reemplazo', optionsToast('info') )
        }        

        const quitarReemplazo = async(idx, reemplazo) => {

            const result = await Swal.fire({
                title: `Está seguro?`,
                text: `Una vez quitado quitado a '${ reemplazo.nombre_completo }', lo pude volver a vincular como reemplazante`,
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro',
                icon: 'question'
            })

            if ( result.isConfirmed ) {
               rrhhStore.empleado.reemplazos.splice(idx,1)
            } else {
                console.log('no quitar');
            }

        }

        const onSelectedPuesto = async( puesto ) => {
            const existePuesto = await rrhhStore.empleado.puestos.find( puesto_ => puesto_.puesto == puesto.puesto )
            if ( existePuesto != undefined ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Puesto Duplicado',
                    text: `'${ puesto.puesto }' ya esta seleccionado`,
                })
            } else {
                const idx = rrhhStore.empleado.puestos.findIndex( puesto_ => puesto_.id == props.puesto_id )
                console.log( idx );
                if (idx > 0) {
                    rrhhStore.empleado.puestos[idx].puesto = puesto.puesto
                    rrhhStore.empleado.puestos[idx].user_puestos.puesto_id = puesto.id
                } else {
                    puestoForm.value.puesto = puesto.puesto
                    // puestoForm.value.id = puesto.id
                    puestoForm.value.user_puestos.puesto_id = puesto.id
                    puestoForm.value.user_puestos.user_id = rrhhStore.empleado.id
                    // rrhhStore.empleado.puestos.push( puestoForm.value )
                }
                isOpenModalPuesto.value = false
            }
        }

        const enviarForm = async () => {
            rrhhStore.errors = []
            onProcess.value = true
            if ( puestoForm.value.user_puestos.id != undefined ) {
                console.log(puestoForm.value.id);
                 const { ok, message } = await rrhhStore.updateEmpleadoPuesto( puestoForm.value )
                 if ( !ok ) Swal.fire("Error", message, "error")
                 else createToast('Se guardó correctamente', optionsToast('success') )
            }else{
                const { ok, message, puesto } = await rrhhStore.createEmpleadoPuesto( puestoForm.value )
                if ( !ok ) Swal.fire("Error", message, "error")
                else {
                    createToast('Se creó correctamente', optionsToast('success') )
                    puestoForm.value.user_puestos.id = puesto.id
                    puestoForm.user_puestos = puesto
                    router.push({ name: 'rrhh_empleado_puesto', params: { puesto_id: puesto.puesto_id } } )
                }
            }
            onProcess.value = false
        }

        loadEmpleado()

        return {
            isLoading,
            onProcess,
            cancelar,
            puestoForm,
            enviarForm,
            // puestoForm: computed( () => rrhhStore.empleado.puestos ),
            // reemplazos: computed( () => rrhhStore.empleado.reemplazos.filter( reemplazo => reemplazo.user_reemplazo.puesto_id == props.puesto_id )),
            puestos: computed( () => rrhhStore.puestos ),
            baseURL: import.meta.env.VITE_API_URL_FILES,
            quitarReemplazo,
            openModalReemplazo: () => isOpenModalReemplazo.value = true,
            closeModalReemplazo: () => isOpenModalReemplazo.value = false,
            onClickNewReemplazo,
            onSelectedReemplazo,
            // reemplazos_search: computed( () => rrhhStore.getSuperiorSearch( searchReemplazo.value ) ),
            // puestos_search: computed( () => rrhhStore.getPuestoSearch( searchPuesto.value ) ),
            isOpenModalReemplazo,
            isLoadingReemplazo,
            searchReemplazo,
            isOpenModalPuesto,
            onClickPuesto,
            openModalPuesto: () => isOpenModalPuesto.value = true,
            closeModalPuesto: () => isOpenModalPuesto.value = false,
            searchPuesto,
            isLoadingPuesto,
            onSelectedPuesto,
        };
    },
    components: { Loading, Errors, Modal }
}
</script>