
<template>

<div class="p-3">

    <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
        <div class="flex gap-3">
            <i class="icon-empresa text-lg"></i>
            <span class=" text-lg">Empresas</span>
        </div>
        <div class="py-1">
            <a class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                <i class="icon-nuevo"></i>
                <span> Nueva Empresa</span> 
            </a>
        </div>
    </div>

    <div class="mt-2 w-full border shadow p-3 rounded">

        <table class=" table-auto w-full">
        
            <thead class="">
                <tr class="border-b-2 h-9">
                    <th>Empresa</th>
                    <th>Cuit</th>
                    <th>Sucursales</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>

                <template v-for="empresa in empresas" :key="empresa.id">
                <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onSelected( empresa.id )">
                    
                    <!-- Empresa // direccion -->
                    <td>
                        <div class="py-2 flex flex-auto p-1 gap-3">
                              <div class="flex flex-col justify-center">
                                <span class="text-indigo-500 font-semibold"> {{ empresa.nombre }}</span>
                                <span class="text-xs">Belgrano 872 - Sáenz Peña</span>
                            </div>
                        </div>
                    </td>
                    
                    <!-- Cuit -->
                    <td>
                        <div class="flex justify-center items-center">
                            <span>{{ empresa.cuit }}</span>
                        </div>
                    </td>

                    <!-- Sucursales -->
                    <td>
                        <div class="flex justify-center items-center">
                            <span>9</span>
                        </div>
                    </td>
                    
                    <!-- Acciones -->
                    <td>
                        <i class="icon-editar"></i>
                    </td>

                </tr>
                </template>
            </tbody>
        
        
        </table>

   </div> 

    <!-- <form action="" >
        <div class="form-row flex justify-between gap-3">
            <div class=" flex-1">
                <label for="">Nombre/s</label>
                <input class="form-input" type="text">
            </div>
            <div class="flex-1">
                <label for="">Apellido/s</label>
                <input class="form-input" type="text">
            </div>   
        </div>
    </form> -->


</div>

</template>

<script>

import { mapActions, mapState } from 'pinia';
import { useRouter } from 'vue-router';
import { useRrhhStore } from '../store';
import { computed } from 'vue';


export default {

    props:{

    },
    setup(props){

        const router = useRouter()
        const rrhhStore = useRrhhStore();


        const { cargarEmpresas } = rrhhStore;

        cargarEmpresas();

        // const { state } = useRrhhStore(); 

        // console.log( state );

        return {
            
            empresas: computed( () => rrhhStore.empresas ),
            
        }
    },
    // created() {
    //     this.cargarEmpresas()
    // },
    // methods: {
    //     ...mapActions(useRrhhStore,['cargarEmpresas'])
    // },
    // computed:{
    //     ...mapState(useRrhhStore,['empresas'])
    // }
}

</script>