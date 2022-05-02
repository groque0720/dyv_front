<template>
  <Loading v-if="isLoading" ></Loading>
  <div v-else class="w-full border rounded">
    <table>
        <thead>
            <tr>
                <th>Sindicato</th>
                <th>Vínculo</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(sindicato, idx) in sindicatos" :key="idx">
                <td>{{ sindicato.sindicato }}</td>
                <td> 
                    <div class="flex items-center justify-center">
                        
                        <template v-if=" isVinculo(sindicato.id) ">
                            <i class="icon-check-on text-lg" @click="quitarSindicato(sindicato.id)" ></i>
                        </template>

                        <template v-else>
                            <i class="icon-check-off text-lg" @click="vincularSindicato(sindicato)" ></i>
                        </template>

                    </div>
                    </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

import { useEmpresaStore } from '@/modules/empresa/store'
import { useSindicatoStore } from '../../sindicato/store'
import { computed, ref } from 'vue';
import Loading from '../../../components/Loading.vue';
import { mapActions } from 'pinia';


  export default {

    setup() {
        const empresaStore = useEmpresaStore();
        const sindicatoStore = useSindicatoStore();

        const isVinculo = (id) => {
            const match = empresaStore.empresa.sindicatos.find((sindicato) => sindicato.id == id);
            if (match)
                return true;
        };
        const quitarSindicato = (id) => {
            const idx = empresaStore.empresa.sindicatos.findIndex((sindicato) => sindicato.id == id);
            empresaStore.empresa.sindicatos.splice(idx, 1);
        };
        const vincularSindicato = (sindicato) => {
            empresaStore.empresa.sindicatos.push(sindicato);
        };

        return {
            isLoading: ref(true),
            isVinculo,
            quitarSindicato,
            vincularSindicato,
            // sindicatoStore,
            sindicatos: computed(() => sindicatoStore.sindicatos),
            empresaSindicatos: computed(() => empresaStore.empresa.sindicatos)
        };
    },
    async created() {
      await this.loadSindicatos()
      this.isLoading = false
    },
    methods: {
      ...mapActions(useSindicatoStore,['loadSindicatos'])
    },
    // computed:{
    //   sindicatos() { return  this.sindicatoStore.sindicatos }
    // },
    components: { Loading }
}
</script>