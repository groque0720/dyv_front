<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else>  
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-sector text-lg"></i>
                <span class=" text-lg"> {{ sectorForm.sector }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ sectorForm.id != undefined ? 'Editar ' : 'Crear' }} Sector</span>
            </div> 
        </div>
        
        <form action="#" @submit.prevent="enviarForm()">
            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label class="required" for="">Nombre del sector</label>
                    <input class="form-input" type="text" v-model="sectorForm.sector" required>
                </div>
            </div>
            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label for="">Observación</label>
                    <textarea class="form-textarea" name="" id="" cols="30" rows="10" v-model="sectorForm.observacion"></textarea>
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

        const createSector = async () => {
            await empresaStore.createSector();
            context.emit("on:close");
        };
        const updateSector = async () => {
            await empresaStore.updateSector();
            context.emit("on:close");
        };
        const enviarForm = () => {
            if (empresaStore.sector.id != undefined) {
                updateSector();
            }
            else {
                createSector();
            }
        };
        isLoading.value = false;
        return {
            isLoading,
            onProcess,
            sectorForm: computed(() => empresaStore.sector),
            enviarForm,
        };
    },
    components: { Loading }
}
</script>