
<template>

    <div class=" flex justify-between item-start gap-3">

        <!-- Avatar // Menú -->
        <div class="w-3/12 rounded flex flex-col gap-3">

            <div class="border rounded shadow-md">

                <div class="flex relative justify-center items-center p-5">
                    <img  
                        class="w-20 h-50 rounded-full z-10 border-2 border-white shadow-lg shadow-slate-500"
                        src="https://reqres.in/img/faces/7-image.jpg" alt="">

                    <div class="bg-green-300 h-3/6 w-full absolute top-0 rounded-t">
                    </div>
                </div>

                <div class="flex flex-col items-center pb-5">
                    <span class=" font-semibold text-indigo-500">Nombre Empleado</span>
                    <span>Sucursal</span>
                    <span>Puesto</span>
                </div>
            
            
            </div>


            <div class="flex flex-col gap-1">

                <ButtonLink
                    :config="{
                            title: 'Perfil',
                            icon:' fas fa-user text-indigo-500 ',
                            to: 'rrhh_empleado_perfil' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Grupo Familiar',
                            icon:' fas fa-heart text-red-500 ',
                            to: 'rrhh_empleado_grupo_familiar' }"></ButtonLink>



                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-street-view text-purple-500"></i>
                        <span>Puestos</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-ruler text-lime-500"></i>
                        <span>Talles/Medidas</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-user-graduate text-sky-500"></i>
                        <span>Capacitación</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-power-off text-orange-500"></i>
                        <span>Licencias</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-user-clock text-fuchsia-500"></i>
                        <span>Actividades</span>
                    </div>
                </a>

            </div>

        </div>



        <!-- formularios -->
        <div class="w-9/12 border rounded">
            <router-view></router-view>
        </div>
    </div>
    <!-- <div>
            Hola desde Empleado  {{ id }}      
    </div> -->
</template>

<script>
import { useRouter } from 'vue-router';
import ButtonLink from '../components/ButtonLink.vue';

   export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        console.log(router.currentRoute.value);
        return {
            id: props.id,
            onLink: (nameRoute) => router.push({ name: nameRoute })
        };
    },
    components: { ButtonLink }
}
</script>