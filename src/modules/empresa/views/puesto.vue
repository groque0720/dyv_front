<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else>  
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-puesto text-lg"></i>
                <span class=" text-lg"> {{ puestoForm.puesto }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ puestoForm.id != undefined ? 'Editar ' : 'Crear' }} Puesto</span>
            </div> 
        </div>
        
        <form action="#" @submit.prevent="enviarForm()">
            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Nombre del Puesto</label>
                    <input class="form-input" type="text" v-model="puestoForm.puesto" required>
                </div>
            </div>
            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label for="">Observación</label>
                    <textarea class="form-textarea" name="" id="" cols="30" rows="10" v-model="puestoForm.observacion"></textarea>
                </div>   
            </div>
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
import { ref, computed } from 'vue';
import { useEmpresaStore } from '@/modules/empresa/store';
import Loading from '../../../components/Loading.vue';
  export default {
    props: {},
    setup(_, context) {
        const empresaStore = useEmpresaStore();
        const onProcess = ref(false);
        const isLoading = ref(true);

        const createPuesto = async () => {
            await empresaStore.createPuesto();
            context.emit("on:close");
        };
        const updatePuesto = async () => {
            await empresaStore.updatePuesto();
            context.emit("on:close");
        };
        const enviarForm = () => {
            if (empresaStore.puesto.id != undefined) {
                updatePuesto();
            }
            else {
                createPuesto();
            }
        };
        isLoading.value = false;
        return {
            isLoading,
            onProcess,
            puestoForm: computed( () => empresaStore.puesto ),
            enviarForm,
        };
    },
    components: { Loading }
}
</script>