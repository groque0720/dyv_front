<template>
    <div>
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg">{{ sindicato.nombre }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ categoria.id ? 'Editar ' : 'Nueva' }} categoria</span>
            </div> 
        </div>
        <form action="#" @submit.prevent="enviarForm()" >
            <div class="">
                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="flex-1">
                        <label class="required" for="">Nombre categoria</label>
                        <input class="form-input" type="text" v-model="categoria.categoria" required>
                    </div>
                </div>
            </div>

            <div class="form-row flex justify-between border-t mt-3">
                <span class="form-btn-cancelar" type="text" @click.prevent="$emit('on:close')">Volver</span>
                <button class="form-btn-submit">Aceptar</button>
            </div>
        </form>
    </div> 
</template>
<script>import { useSindicatoStore } from "../store"
import { computed, ssrContextKey } from 'vue';

  export default {
    props:{},
    setup(props, context){

      const sindicatoStore = useSindicatoStore()

      const enviarForm = async() => {
        const { ok, message } = await sindicatoStore.updateCategoria()
        if ( !ok )  Swal.fire("Error", message, "error")
        context.emit('on:close')
      }


      return {
        enviarForm,
        sindicato: computed(()=> sindicatoStore.sindicato ),
        categoria: computed(()=> sindicatoStore.categoria )
      }
    }
  }
</script>