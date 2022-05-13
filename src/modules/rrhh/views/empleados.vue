<template>
    <div>
       <!-- secciones general // activos // licencias // parte medico // vacaciones // otros  -->
       <div class="border-b-2 border-indigo-500 flex items-center">
            <div>General</div>
            <div>Activos</div>
       </div>

       <div class="flex justify-end">
            <div class="py-1">
                <a @click="newEmpleado()" class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                    <i class="fas fa-user-plus"></i> Crear Colaborador
                </a>
            </div>
       </div>

       <!-- buscador -->
        <div class="">
            <form action="">
                <div class="form-row">
                    <input class="form-input" type="search" placeholder="Buscar Colaborador (Apellido Nombre)" v-model="search">
                </div>
            </form>
        </div> 

        <!-- lista de resultados -->

        <div class="flex justify-end h-7 mt-2">
            <div class="flex gap-2 items-center">
                <button class="btn-fecha-paginacion" @click="prevPage()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span> Página {{ currentPage }}</span>
                <button class="btn-fecha-paginacion" @click="nextPage()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="mt-2 w-full border shadow rounded relative">
            <Loading v-if="isLoading"></Loading>
            <table v-else class=" table-auto w-full">
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Colaborador</th>
                        <th>Empresa/Sucursal</th>
                        <th>Área</th>
                        <th>Puesto/s</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Superior</th>
                        <th>Reemplazo</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="empleado in empleados" :key="empleado.id">
                    <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onSelected(empleado.id)">
                        
                        <!-- Avatar // Nombre y Puesto -->
                        <td>
                            <div class="flex flex-auto p-1 gap-3">
                                <div class="flex items-center">
                                    <img v-if="empleado.img"  class=" h-8 w-8 rounded-full object-cover" :src="baseURL+empleado.img" :alt="empleado.nombre_completo">
                                    <div v-else class="h-8 w-8 flex justify-center items-center">
                                        <i class="icon-perfil text-2xl"></i>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <span class="text-indigo-500 font-semibold">{{ empleado.apellido }} {{ empleado.nombre }} </span>
                                </div>
                            </div>
                        </td>

                        <!-- Empresa y Sucursal -->
                        <td>
                            <div class="flex flex-col justify-center items-center">
                                <span>{{ empleado.sucursal.empresa.nombre }}</span>
                                <span class="text-xs">{{ empleado.sucursal.nombre }}</span>
                            </div>
                        </td>

                        <!-- Empresa y Sucursal -->
                        <td>
                            <div class="flex flex-col justify-center items-center">
                                <span>{{ empleado.area.area }}</span>
                            </div>
                        </td>

                        <!-- Puesto -->
                        <td>
                            <div class="flex flex-col justify-center items-center">
                                <span class="text-xs" v-for="puesto in empleado.puestos" :key="puesto.id">
                                    {{ puesto.puesto.puesto }}</span>
                            </div>
                        </td>

                        <!-- Categoria -->
                        <td>
                            <div class="flex justify-center items-center">
                                <span class="text-xs">{{ empleado.categoria.categoria }}</span>
                            </div>
                        </td>

                        <!-- Estado-->
                        <td>
                            <div class="flex flex-col gap-1 items-center justify-center">
                                <template v-for="licencia in empleado.licencias" :key="empleado.id+licencia.id">
                                    <div class="rounded"
                                         :style="`color: ${ licencia.licencia_tipo.icono_color };
                                                background-color: ${ licencia.licencia_tipo.icono_color };
                                                border: 1px ${ licencia.licencia_tipo.icono_color } solid;`"
                                                >
                                            <div class="px-3 py-1 rounded bg-white bg-opacity-80">{{ licencia.licencia_tipo.licencia_tipo }}</div>
                                    </div>
                                </template>
                                <span v-if="!empleado.licencias.length" class="px-3 py-1
                                 rounded border border-green-400 text-green-500">
                                    Activo
                                </span>
                            </div>
                        </td>


                        <!-- Superior -->
                        <td>
                            <div class="flex justify-center">
                                <div class="flex items-center">
                                <template v-if="empleado.supervisor">
                                    <img v-if="empleado.supervisor.img != null "
                                         :src="baseURL+empleado.supervisor.img"
                                         :alt="empleado.supervisor.nombre_completo"
                                         :title="empleado.supervisor.nombre_completo"
                                         class=" h-8 w-8 rounded-full border-2 border-white shadow object-cover"  >
                                    <i v-else class="icon-perfil text-xl" :title="empleado.supervisor.nombre_completo"></i>
                                </template>
                                </div>
                            </div>
                        </td>

                        <!-- Reemplazo -->
                        <td>
                            <div class="flex justify-center">
                                <template v-for="(puesto, idx) in empleado.puestos" :key="puesto.id">
                                    <template v-for="reemplazo in puesto.reemplazos" :key="reemplazo.user_id">
                                    <!-- {{ reemplazo.reemplazo.nombre_completo }} -->
                                        <div class="flex items-center" :class="{'-ml-2': idx > 0 }">
                                            <template v-if="reemplazo.reemplazo">
                                                <img v-if="reemplazo.reemplazo.img != null"   :src="baseURL+reemplazo.reemplazo.img"
                                                        :alt="reemplazo.reemplazo.nombre_completo"
                                                        :title="reemplazo.reemplazo.nombre_completo"
                                                        class=" h-8 w-8 rounded-full border-2 border-white shadow object-cover" >
                                                <i v-else class="icon-perfil text-xl" :title="reemplazo.reemplazo.nombre_completo"></i>
                                            </template>                                   
                                        </div>
                                    </template>
                                 </template>
                            </div> 
                        </td>
                        
                        <!-- Acciones -->
                        <!-- <td>
                            <i class="fas fa-id-card text-xl text-indigo-500"></i>
                        </td> -->

                    </tr>

                    </template>
                </tbody>
            </table>
        </div>
        <div v-if="!empleados.length">
            <span class="p-2 italic">No hay datos que mostrar</span> 
        </div>

    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useRrhhStore } from '../store'
import { ref, computed, watch } from 'vue';
import Loading from '@/components/Loading.vue';


export default {
    name: 'Empleados',
    setup() {

        const router = useRouter()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(true)
        const currentPage = ref()
        const search = ref(null)

        const loadEmpleados = async( page = 1, q = '' ) => {
            // console.log( page )
            if ( page <= 0 ) page = 1
            if ( page > 1) search.value = '' 
            const { ok, message } = await rrhhStore.loadEmpleados( page, q )
            if ( !ok ) Swal.fire("Atención", message, "info")
            else  {
               currentPage.value = page
            }
            isLoading.value = false
        }

        loadEmpleados(1)

        // router.currentRoute.value.query = 'holaMundho' 
        // console.log(router.currentRoute.value.query) 

        watch( search, ( search, prevCount ) => {

            if ( search.length >= 3 ) loadEmpleados(1, search)
            else loadEmpleados(1, '')

            // if (search.length > 1) {
            //     router.push({ name:'rrhh_empleados',query:{ page: currentPage.value, q: search } })
            // } else {
            //     router.push({ name:'rrhh_empleados'})
            // }
            
        })


        return {
            search,
            isLoading,
            currentPage,
            empleados: computed( () => rrhhStore.empleados ),
            baseURL: import.meta.env.VITE_API_URL_FILES,
            newEmpleado: () => router.push({ name: 'rrhh_empleado_perfil', params: { id: 'nuevo' }}),
            onSelected: (id) => router.push({name: 'rrhh_empleado_perfil', params: { id }}),
            nextPage: () => loadEmpleados( currentPage.value + 1 ),
            prevPage: () => loadEmpleados( currentPage.value - 1),
        }
        
    },

    components:{
        Loading,
    }
}
</script>