<template>
    <div>
       <!-- secciones general // activos // licencias // parte medico // vacaciones // otros  -->
       <div class="border-b-2 border-indigo-500 flex items-center">
            <div>General</div>
            <div>Activos</div>
       </div>

       <div class="flex justify-end">
            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold ">
                <i class="fas fa-user-plus"></i> Nuevo Empleado</a>
            </div>
       </div>

       <!-- buscador -->
        <div class="">
            <form action="">
                <div class="form-row">
                    <input class="form-input" type="text" placeholder="Buscar empleado">
                </div>
            </form>
        </div> 

        <!-- lista de resultados -->

        <div class="mt-2 w-full border border-indigo-300 shadow p-3 rounded">


            <table class=" table-auto w-full">
            
                <thead class="">
                    <tr class="border-b-2 h-9">
                        <th>Empleado</th>
                        <th>Empresa</th>
                        <th>Estado</th>
                        <th>Superior</th>
                        <th>Reemplazo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="i in 10" :key="i">
                    <tr class="cursor-pointer border-b hover:bg-indigo-100" @click="onSelected(i)">
                        
                        <!-- Avatar // Nombre y Puesto -->
                        <td>
                            <div class="py-2 flex flex-auto p-1 gap-3">
                                <div class="flex items-center">
                                    <img class=" h-8 w-8 rounded-full" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                                <div class="flex flex-col justify-center">
                                    <span class="text-indigo-500 font-semibold">Nombre Empleado</span>
                                    <span class="text-xs">Puesto</span>
                                </div>
                            </div>
                        </td>

                        <!-- Empresa y Sucursal -->
                        <td>
                            <div class="py-2 flex flex-col justify-center">
                                <span>Nombre Empleado</span>
                                <span class="text-xs">Sucursal</span>
                            </div>
                        </td>

                        <!-- Estado-->
                        <td>
                            <div class="py-2 flex items-center justify-center">
                                <span class="px-3 rounded border border-green-400 bg-green-100 text-green-500">
                                    Activo
                                </span>
                            </div>
                        </td>


                        <!-- Superior -->
                        <td>
                            <div class="flex justify-center">
                                <div class="flex items-center">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                                <div class="flex items-center -ml-2">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                                <div class="flex items-center -ml-2">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                            </div>
                        </td>

                        <!-- Reemplazo -->
                        <td>
                            <div class="flex justify-center">
                                <div class="flex items-center">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                                <div class="flex items-center -ml-2">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                                <div class="flex items-center -ml-2">
                                    <img class=" h-8 w-8 rounded-full border-2 border-white shadow" src="https://reqres.in/img/faces/7-image.jpg" alt="">
                                </div>
                            </div> 
                        </td>
                        
                        <!-- Acciones -->
                        <td>
                            <i class="fas fa-id-card text-xl text-indigo-500"></i>
                        </td>

                    </tr>

                    </template>
                </tbody>
            
            
            </table>

        </div>


    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        return {

            onSelected: (id) => router.push({name: 'rrhh_empleado_perfil', params: { id }})

        }
    }
}
</script>