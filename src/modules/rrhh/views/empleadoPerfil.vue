<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else class="p-3">
        <div class="flex items-center gap-2  border-b border-indigo-500">
            <i class="icon-perfil text-lg"></i>
            <span class=" text-lg">Perfil</span>
        </div>
        <!-- <p v-if="errors.length">
            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
            <ul>
            <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p> -->
        <form action="#" @submit.prevent="enviarForm()" autocomplete="off" class="mt-2 p-3 border rounded">
            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Nombre/s</label>
                    <input class="form-input" type="text" name="nombre" v-model="empleadoForm.nombre" required>
                    <Errors :errors="errors" :field="'nombre'"></Errors>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Apellido/s</label>
                    <input class="form-input" type="text" v-model="empleadoForm.apellido" required>
                </div> 
                <div class="">
                    <label class="required" for="">Fecha Nacimiento</label>
                    <input class="form-input" type="date" name="fecha_nacimiento" v-model="empleadoForm.fecha_nacimiento" required>
                    <Errors :errors="errors" :field="'fecha_nacimiento'"></Errors>
                </div>  
            </div>

            <div class="form-row flex justify-between gap-3">

                <div class="flex-1">
                    <label class="required" for="">Nro Documento</label>
                    <input class="form-input" type="text" v-model="empleadoForm.nro_documento" required>
                    <Errors :errors="errors" :field="'nro_documento'"></Errors>
                </div>
                <div class="flex-1">
                    <label class="required" for="">CUIL</label>
                    <input class="form-input" type="text" v-model="empleadoForm.cuil" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Sexo</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.sexo_id" required>
                        <template v-for="sexo in sexos" :key="sexo.id">
                            <option :value="sexo.id">{{ sexo.sexo }}</option>
                        </template>
                    </select>
                    <Errors :errors="errors" :field="'sexo_id'"></Errors>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Estado Civil</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.estado_civil_id" required>
                        <template v-for="estado_civil in estadosCiviles" :key="estado_civil.id">
                            <option :value="estado_civil.id">{{ estado_civil.estado_civil }}</option>
                        </template>
                    </select>
                </div>   
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Calle</label>
                    <input class="form-input" type="text" v-model="empleadoForm.calle" required>
                </div>
                <div class="">
                    <label for="">Nro</label>
                    <input class="form-input" type="text" v-model="empleadoForm.nro">
                </div>
                <div class="">
                    <label for="">Piso</label>
                    <input class="form-input" type="text" v-model="empleadoForm.piso">
                </div>
                <div class="">
                    <label for="">Dpto</label>
                    <input class="form-input" type="text" v-model="empleadoForm.dpto">
                </div>
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Localidad</label>
                    <input class="form-input" type="text" v-model="empleadoForm.localidad" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Provincia</label>
                    <input class="form-input" type="text" v-model="empleadoForm.provincia" required>
                </div>
                <div class="">
                    <label class="required" for="">CP</label>
                    <input class="form-input" type="text" v-model="empleadoForm.cp" required>
                </div>
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class="">
                    <label for="">Teléfono</label>
                    <input class="form-input" type="text" v-model="empleadoForm.telefono">
                </div>
                <div class="">
                    <label class="required" for="">Celular</label>
                    <input class="form-input" type="text" name="celular" v-model="empleadoForm.celular" required>
                </div>
                <div class="flex-1">
                    <label for="">Email</label>
                    <input class="form-input" type="text" name="email" v-model="empleadoForm.email" required>
                    <Errors :errors="errors" :field="'email'"></Errors>
                </div>
            </div>

            <div class="form-row my-2">
                <hr class="border border-indigo-300">
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label class="required" for="">Nro Legajo</label>
                    <input class="form-input" type="text" name="nro_legajo" v-model="empleadoForm.nro_legajo" required>
                    <Errors :errors="errors" :field="'nro_legajo'"></Errors>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Fecha Ingreso</label>
                    <input class="form-input" type="date" v-model="empleadoForm.fecha_ingreso" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Nombre Usuario</label>
                    <input class="form-input" type="text" name="username" v-model="empleadoForm.username" required>
                    <Errors :errors="errors" :field="'username'"></Errors>
                </div>   
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label class="required" for="">Empresa</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.empresa_id"  @change="onChangeEmpresa($event.target.value)" required>
                        <template v-for="empresa in empresas" :key="empresa.id">
                            <option :value="empresa.id">{{ empresa.nombre }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Sucursal</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.sucursal_id" @change="onChangeSucursal($event.target.value)" required>
                        <template v-for="sucursal in sucursales" :key="sucursal.id">
                            <option :value="sucursal.id">{{ sucursal.nombre }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Sector</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.sector_id" required>
                        <template v-for="sector in sectores" :key="sector.id">
                            <option :value="sector.id">{{ sector.sector }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Area</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.area_id" required>
                        <template v-for="area in areas" :key="area.id">
                            <option :value="area.id">{{ area.area }}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label for="">Sindicatos</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.sindicato_id" @change="onChangeSindicato($event.target.value)" required>
                        <template v-for="sindicato in sindicatos" :key="sindicato.id">
                            <option :value="sindicato.id">{{ sindicato.sindicato }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Categoria</label>
                    <select class="form-select" name="" id="" v-model="empleadoForm.categoria_id" required>
                        <template v-for="categoria in categorias" :key="categoria.id">
                            <option :value="categoria.id">{{ categoria.categoria }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex-1 flex flex-col ">
                    <label class="" for="">Superior</label>
                    <div class="flex justify-between items-center gap-2" @click="onClickSupervisor(empleadoForm.id)">
                        <input class="form-input" v-model="empleadoForm.supervisor.nombre_completo"  readonly >
                        <i class="icon-search cursor-pointer"></i>

                        <input class="form-input" type="hidden" name="supervisor_id" v-model="empleadoForm.supervisor_id">
                    </div>


                    <Modal  v-if="isOpenModalSupervisor" @on:close="closeModalSupervisor" clase=" w-full sm:w-10/12 md:w-9/12 lg:w-7/12">
                        <template v-slot:body>
                        <div class="bg-white min-h-60 max-h-80">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center gap-2"><i class="icon-search text-xl"></i><span>Buscar Superior</span></div>
                                <span><i class="icon-cerrar text-2xl cursor-pointer" @click="isOpenModalSupervisor=false"></i></span>
                            </div>
                            <input class="form-input mb-1" type="search"  placeholder="Apellido Nombre" v-model="searchSupervisor">
                                <div class="bg-white border rounded w-full border-indigo-300 max-h-60 overflow-x-auto">
                                    <Loading v-if="isLoadingSupervisor"></Loading>
                                    <template v-else>
                                        <div v-for="supervisor in supervisores" :key="supervisor.id" @click="onSelectedSupervisor(supervisor)"
                                                class="flex justify-between items-center gap-3 p-2 border-b border-indigo-300 cursor-pointer hover:bg-indigo-50">
                                            <img class="w-8 h-8 rounded-full object-cover"  :src="baseURL+supervisor.img" alt="">
                                            <span class="flex-1">{{ supervisor.nombre_completo }}</span>
                                        </div>
                                    </template>
                                </div>                    
                        </div>
                        </template>
                    </Modal>



                    <!-- <input class="form-input" type="text" name="email" v-model="empleadoForm.supervisor_id" required> -->
                    <!-- <input type="" v-model=""> -->
                </div>
            </div>
            <div class="form-row flex justify-between border-indigo-300 border-t-2 mt-3 pt-3">
                <span class="form-btn-cancelar" @click.prevent="cancelar(id)" type="text">Volver</span>
                <button class="form-btn-submit" :disabled="onProcess">
                    <i v-if="onProcess" class="fas fa-spinner animate-spin mr-2"></i>
                    <span v-if="onProcess">Procesando...</span>
                    <span v-else>Aceptar</span>    
                </button>
            </div> 


        </form>
    </div>
</template>

<script>

import { useEmpresaStore } from '@/modules/empresa/store';
import { useSindicatoStore } from '../../sindicato/store';
import { useRrhhStore } from '../store';
import { ref, computed, watch } from 'vue';
import Loading from '../../../components/Loading.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import Errors from '../../../components/Errors.vue';
import { createToast } from 'mosha-vue-toastify';
import Modal from '../../../components/Modal.vue';




export default {

    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(true)
        const onProcess = ref(false)
        // const empleadoForm = ref({})
        const router = useRouter()
        const id = router.currentRoute.value.params.id
        const categorias = ref([])
        let cantRecursos = 0
        const isOpenModalSupervisor = ref(false)
        // const supervisores = ref([])
        const searchSupervisor = ref('')
        const isLoadingSupervisor = ref(false)

        const optionsToast = (type) => ({
            type: type,
            transition:'slide',
            showIcon: true,
            timeout: 2000

        })
        
        const newEmpleado = async() => {
            isLoading.value = true
            const { ok } = await rrhhStore.newEmpleado()
            if ( !ok ) Swal.fire("Error", message, "error")
            else isLoading.value = false
        }

        const loadEmpleado = async( id ) => {
            isLoading.value = true
            const { ok, message } = await rrhhStore.loadEmpleado( id )
            if ( !ok ) Swal.fire("Error", message, "error")
            else {
                 onChangeSindicato(rrhhStore.empleado.categoria.sindicato_id)
                 isLoading.value = false
            }
        }

        const cancelar = async() => {
            await loadEmpleado( id )
            rrhhStore.localImage = ''
            createToast('No se guardaron los cambios', optionsToast('warning') )
        }

        const loadEmpresas = async () => {
            const { ok, message } = await empresaStore.loadEmpresas()
            if ( !ok ) Swal.fire("Error", message, "warning")
            else cantRecursos++
        };

        const loadSexos = async () => {
            const { ok, message } = await rrhhStore.loadSexos()
            if ( !ok ) Swal.fire("Error", message, "warning")
            else cantRecursos++
        };

        const loadEstadosCiviles = async () => {
            const { ok, message } = await rrhhStore.loadEstadosCiviles()
            if ( !ok ) Swal.fire("Error", message, "warning")
            else cantRecursos++
        };

        const cargarRecursos = async() => {
            await loadEmpresas()
            await loadSexos()
            await loadEstadosCiviles()
            if ( cantRecursos == 3 ) isLoading.value = false
        }

        const onChangeEmpresa = async ( id ) => {
            const { ok, message } = await empresaStore.onChangeEmpresa( id )
            if ( !ok ) Swal.fire("Error", message, "warning")
            else onChangeSindicato()
        }

        const onChangeSucursal = async ( id ) => {
            if ( id ) {
            const idx = empresaStore.empresa.sucursales.findIndex( ( sucursal ) => sucursal.id == id )
            rrhhStore.empleado.sucursal =  empresaStore.empresa.sucursales[idx]
            }
        }

        const onClickSupervisor = async( id ) => {
            isLoadingSupervisor.value = true
            searchSupervisor.value = ''
            const { ok, message } = await rrhhStore.loadSuperiores( id )
            if ( !ok ) Swal.fire("Error", message, "error")
            isOpenModalSupervisor.value = true
            isLoadingSupervisor.value = false
        }


        const onChangeSindicato = ( id ) => {
            if ( id ) {
            const idx = empresaStore.empresa.sindicatos.findIndex( ( sindicato ) => sindicato.id == id )
            categorias.value = empresaStore.empresa.sindicatos[idx].categorias
            } 
        }

        const onSelectedSupervisor = ( superior ) => {
            rrhhStore.empleado.supervisor_id = superior.id
            rrhhStore.empleado.supervisor.nombre_completo = superior.nombre_completo
            isOpenModalSupervisor.value = false
            createToast('Supervisor Seleccionado', optionsToast('info') )
        }
 
        const enviarForm = async () => {
            rrhhStore.errors = []
            onProcess.value = true
            if ( rrhhStore.empleado.id != undefined ) {
                 const { ok, message } = await rrhhStore.updateEmpleado()
                 if ( !ok ) Swal.fire("Error", message, "error")
                 else createToast('Se guardó correctamente', optionsToast('success') )
            }else{
                const { ok, message } = await rrhhStore.createEmpleado()
                if ( !ok ) Swal.fire("Error", message, "error")
                else {
                    createToast('Se creó correctamente', optionsToast('success') )
                    router.push({name: 'rrhh_empleado_perfil', params: { id: rrhhStore.empleado.id }})
                }
            }
            onProcess.value = false
        }

        const created = async() => {

            await cargarRecursos()
            rrhhStore.errors = []

            if ( id == 'nuevo') {
                await newEmpleado()
            }else{
                await loadEmpleado(id)
            }            

        }



        created()

        return {
            id,
            cancelar,
            onChangeSindicato,
            onChangeEmpresa,
            onChangeSucursal,
            isOpenModalSupervisor,
            onClickSupervisor,
            isLoading,
            onProcess,
            enviarForm,
            empleadoForm: computed(() => rrhhStore.empleado ),
            sexos: computed(() => rrhhStore.sexos ),
            estadosCiviles: computed(() => rrhhStore.estados_civiles ),
            empresas: computed(() => empresaStore.empresas),
            sucursales: computed( () => empresaStore.empresa ? empresaStore.empresa.sucursales : [] ),
            areas: computed( () => empresaStore.empresa ? empresaStore.empresa.areas : [] ),
            sectores: computed( () => empresaStore.empresa ? empresaStore.empresa.sectores : [] ),
            sindicatos: computed(() => empresaStore.empresa ? empresaStore.empresa.sindicatos : [] ),
            supervisores: computed( () => rrhhStore.getSuperiorSearch( searchSupervisor.value ) ),
            searchSupervisor,
            isLoadingSupervisor,
            onSelectedSupervisor,
            errors: computed( ()=> rrhhStore.errors ),
            categorias,
            baseURL: import.meta.env.VITE_API_URL_FILES,
            openModalSupervisor: () => isOpenModalSupervisor.value = true,
            closeModalSupervisor: () => isOpenModalSupervisor.value = false,
        };
    },
    components: { Loading, Errors, Modal }
}
</script>