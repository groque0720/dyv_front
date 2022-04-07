<template>
    <div class=" flex flex-col md:flex-row justify-between item-start gap-3">

        <div class="w-full md:w-3/12 rounded flex flex-col gap-2">


            <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-1 gap-1">


                <ButtonLink
                    :config="{
                            title: 'Empresas',
                            icon:' icon-empresa ',
                            to: 'rrhh_configuracion_empresas' }"></ButtonLink>        

                <ButtonLink
                    :config="{
                            title: 'Sexo',
                            icon:' icon-sexo ',
                            to: 'rrhh_sexos' }"></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Vinculos',
                            icon:' icon-vinculo',
                            to: 'rrhh_vinculos' }"></ButtonLink> 

                <ButtonLink
                    :config="{
                            title: 'Puestos',
                            icon:' icon-puesto ',
                            to: 'rrhh_puestos' }"></ButtonLink>                            


                <ButtonLink
                    :config="{
                            title: 'Areas',
                            icon:' icon-area ',
                            to: 'rrhh_areas' }"></ButtonLink>  

                <ButtonLink
                    :config="{
                            title: 'Licencias',
                            icon:' icon-licencia ',
                            to: 'rrhh_licencias' }"></ButtonLink>                                              


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

