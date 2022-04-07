
<template>

    <div class=" flex flex-col justify-between item-start gap-3">

        <!-- Avatar // Menú -->
        <div class="w-full md:w-3/12 rounded flex flex-col gap-3">

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
                            icon:' icon-perfil ',
                            to: 'rrhh_empleado_perfil' }"></ButtonLink>
                
                <ButtonLink
                    :config="{
                            title: 'Preocupacional',
                            icon:' icon-preocupacional ',
                            to: 'rrhh_empleado_preocupacional' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Grupo Familiar',
                            icon:' icon-familia ',
                            to: 'rrhh_empleado_grupo_familiar' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Puestos',
                            icon:' icon-puesto ',
                            to: 'rrhh_empleado_puestos' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Talles/Medidas',
                            icon:' icon-medida ',
                            to: 'rrhh_empleado_medidas' }"></ButtonLink>
                
                <ButtonLink
                    :config="{
                            title: 'Entrega de Uniforme',
                            icon:' icon-uniforme ',
                            to: 'rrhh_empleado_uniformes' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Capacitacion',
                            icon:' icon-capacitacion ',
                            to: 'rrhh_empleado_capacitaciones' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Licencias',
                            icon:' icon-licencia ',
                            to: 'rrhh_empleado_licencias' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Actividades',
                            icon:' icon-actividad ',
                            to: 'rrhh_empleado_actividades' }"></ButtonLink>


            </div>

        </div>

        <!-- formularios -->
        <div class="w-full md:w-9/12 border rounded">
            <router-view></router-view>
        </div>
    </div>

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