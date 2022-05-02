<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else>  
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg"> {{ empresaForm.nombre }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ empresaForm.id ? 'Editar ' : 'Nueva' }} Empresa</span>
            </div> 
        </div>
        
        <form action="#" @submit.prevent="enviarForm()">
            <div class="form-row flex justify-between gap-3">
            <!-- {{ empresaForm }} -->
                <div class=" flex-1">
                    <label class="required" for="">Nombre</label>
                    <input class="form-input" type="text" v-model="empresaForm.nombre" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Cuit</label>
                    <input class="form-input" type="text" v-model="empresaForm.cuit" required>
                </div>   
            </div>
            <template v-if="empresaForm.id">
                <div class="mt-3 flex items-center justify-between border-b border-indigo-500">

                    <div class="flex-1 tab" :class="{'tab-active': tab == 1 }" @click="tab = 1">
                        <i class="icon-sucursal" />
                        <span class="hidden md:block flex-1 text-center"> Sucursales </span>
                    </div>

                    <div class="flex-1 tab" :class="{'tab-active': tab == 2 }" @click="tab = 2">
                        <i class="icon-sector" />
                        <span class="hidden md:block flex-1 text-center">Sectores</span>
                    </div>

                    <div class="flex-1 tab" :class="{'tab-active': tab == 3 }" @click="tab = 3">
                        <i class="icon-area" />
                        <span class="hidden md:block flex-1 text-center">Áreas</span>
                    </div>

                    <div class="flex-1 tab" :class="{'tab-active': tab == 4 }" @click="tab = 4">
                        <i class="icon-puesto" />
                        <span class="hidden md:block flex-1 text-center">Puestos</span>
                    </div>

                    <div class="flex-1 tab" :class="{'tab-active': tab == 5 }" @click="tab = 5">
                        <i class="icon-sindicato" />
                        <span class="hidden md:block flex-1 text-center">Sindicatos</span>
                    </div>

                </div> 

                <div class="p-3 border max-h-96 overflow-y-auto">
                    <div v-if="tab == 1">
                        <Sucursales></Sucursales>
                    </div>
                    <div v-if="tab == 2" >
                        <Sectores></Sectores>
                    </div>
                    <div v-if="tab == 3" >
                        <Areas></Areas>
                    </div>
                    <div v-if="tab == 4">
                        <Puestos></Puestos>
                    </div>
                    <div v-if="tab == 5">
                        <EmpresaSindicato></EmpresaSindicato>
                    </div>
                </div>
            </template>
            <div class="form-row flex justify-between border-t-2 mt-3 pt-3">
                <span class="form-btn-cancelar" @click.prevent="$emit('on:close')" type="text">Volver</span>
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


import { useEmpresaStore } from "../store"
import Swal from 'sweetalert2'
import { ref, computed } from 'vue';
import Sucursales from './sucursales.vue';
import Modal from "../../../components/Modal.vue";
import EmpresaSindicato from "./empresaSindicato.vue";
import Loading from "../../../components/loading.vue";
import Sectores from "./sectores.vue";
import Areas from "./areas.vue";
import Puestos from "./puestos.vue";

export default {
    name: 'Empresa',
    emits: ['on:close'],
    setup(_,context) {

        const empresaStore = useEmpresaStore()
        const onProcess = ref(false)
        const isLoading = ref(false)

        const enviarForm = async () => {
            onProcess.value = true
            if ( empresaStore.empresa.id != undefined ) {
                const { ok } = await empresaStore.updateEmpresa()
                if ( ok ) context.emit('on:close')
            }else{
                await empresaStore.createEmpresa()
            }
            onProcess.value = false
        }

        const loadEmpresa = async () => {
            isLoading.value = true
            const { ok } = await empresaStore.loadEmpresa()
            if ( ok ) isLoading.value = false
        }

        loadEmpresa()
            
        return {
            onProcess,
            isLoading,
            enviarForm,
            tab: ref(1),
            empresaForm: computed(() => empresaStore.empresa),
        };
    },
    components: { Sucursales, Modal, EmpresaSindicato, Loading, Sectores, Areas, Puestos }
}
</script>
<style scoped>
.tab {
    text-align: center;
    padding: 5px 10px;
    border-radius: 10px 10px 0px 0px;
    margin-left: 5px;
    cursor: pointer;
    border: 1px solid rgb(228, 224, 224);
    background: #e6e7f8;
    display: flex;
    align-items: center;
   
}
.tab-active {
    background: #6366F1;
    /* border: 1px solid gray; */
    /* padding-top: 8px; */
    color: white;
    box-shadow: 0px -1px 2px 1px rgb(202, 202, 202);
    
}

.tab-active i {
    color: white !important;
}
</style>