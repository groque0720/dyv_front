<template>
    <div>  
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg"> {{ sindicatoFrom.sindicato }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ sindicatoFrom.id ? 'Editar ' : 'Nuevo' }} Sindicato</span>
            </div> 
        </div>
        
        <form action="#" @submit.prevent="enviarForm()">
            <div class="form-row flex justify-between gap-3">
            <!-- {{ sindicatoFrom }} -->
                <div class=" flex-1">
                    <label class="required" for="">Nombre del sindicato</label>
                    <input class="form-input" type="text" v-model="sindicatoFrom.sindicato" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Cuit</label>
                    <input class="form-input" type="text" v-model="sindicatoFrom.cuit" required>
                </div>   
            </div>
            <template v-if="sindicatoFrom.id != undefined ">
                <div class="max-h-96 overflow-y-auto">
                    <Categorias></Categorias>
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
import { useSindicatoStore } from "../store"
import { ref, computed } from 'vue';
import Categorias from "./categorias.vue";
  export default {
    props: {},
    setup(props, context) {
        const sindicatoStore = useSindicatoStore()
        const onProcess = ref(false)

        const createSindicato = async () => {
            await sindicatoStore.createSindicato()
        }

        const updateSindicato = async() => {
            await sindicatoStore.updateSindicato()
            context.emit('on:close')
        }

        const enviarForm = async() => {
            onProcess.value = true
            if ( sindicatoStore.sindicato.id != undefined ) {
                await updateSindicato()
            }else{
                await createSindicato()
            }
            onProcess.value = false
        }

        return {
            onProcess,
            sindicatoFrom: computed(() => sindicatoStore.sindicato),
            enviarForm,
        };
    },
    components: { Categorias }
}
</script>