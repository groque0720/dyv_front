<template>
    <div class=" flex justify-between item-start gap-3">

        <div class="w-3/12 rounded flex flex-col gap-2">


            <div class="flex flex-col gap-1">


                <ButtonLink
                    :config="{
                            title: 'Empresas',
                            icon:' icon-empresa ',
                            to: 'rrhh_configuracion_empresas' }"></ButtonLink>        

                <ButtonLink
                    :config="{
                            title: 'Sexo',
                            icon:' fas fa-restroom text-indigo-500 ',
                            to: 'rrhh_configuracion_sexo' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Vinculos',
                            icon:' fas fa-people-arrows text-purple-500',
                            to: 'rrhh_configuracion_vinculos' }"></ButtonLink> 

                <ButtonLink
                    :config="{
                            title: 'Puestos',
                            icon:' fas fa-people-arrows text-purple-500',
                            to: 'rrhh_configuracion_vinculos' }"></ButtonLink>                            

                
                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-power-off text-orange-500"></i>
                        <span>Puestos</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-power-off text-orange-500"></i>
                        <span>Areas</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-power-off text-orange-500"></i>
                        <span>Alcance</span>
                    </div>
                </a>

                <a href="">
                    <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50 ">
                        <i class="fas fa-power-off text-orange-500"></i>
                        <span>Licencias</span>
                    </div>
                </a>


            </div>

        </div>

        <!-- formularios -->
        <div class="w-9/12 border rounded">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';
import ButtonLink from '../components/ButtonLink.vue';



export default {
    setup() {
        const router = useRouter();
        // console.log( router.currentRoute.value);
        return {
            nameRoute: computed(() => router.currentRoute.value.name),
            onLink: (nameRoute) => router.push({ name: nameRoute })
        };
    },
    components: { 
        // ButtonLink: defineAsyncComponent( ()=> import('../components/ButtonLink.vue') )
        ButtonLink
    }
}
</script>

