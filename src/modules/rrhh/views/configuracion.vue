<template>
    <div class=" flex flex-col md:flex-row justify-between item-start gap-3">

        <div class="w-full md:w-3/12 rounded flex flex-col gap-2">


            <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-1 gap-1">


                <ButtonLink
                    :config="{
                            title: 'Empresas',
                            icon:' icon-empresa ',
                            to: 'rrhh_configuracion_empresas' }" ></ButtonLink>
                       
                <ButtonLink
                    :config="{
                            title: 'Sindicatos',
                            icon:' icon-sindicato ',
                            to: 'rrhh_configuracion_sindicatos' }" ></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Sexos',
                            icon:' icon-sexo ',
                            to: 'rrhh_configuracion_sexos' }" ></ButtonLink>                            

                <ButtonLink
                    :config="{
                            title: 'Estados Civiles',
                            icon:' icon-estado-civil ',
                            to: 'rrhh_configuracion_estados_civiles' }" ></ButtonLink>

                <ButtonLink
                    :config="{
                            title: 'Vinculos',
                            icon:' icon-vinculo',
                            to: 'rrhh_configuracion_vinculos' }" ></ButtonLink> 

                <ButtonLink
                    :config="{
                            title: 'Licencias',
                            icon:' icon-licencia ',
                            to: 'rrhh_configuracion_licencias' }" ></ButtonLink>                                              


            </div>

        </div>

        <!-- formularios -->
        <div class="w-full md:w-9/12 border rounded p-3">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { computed, defineAsyncComponent } from 'vue';
import ButtonLink from '../components/ButtonLink.vue';



export default {
    name: 'Configuracion',
    setup() {
        const router = useRouter();
        
        if (router.currentRoute.value.name == 'rrhh_configuracion')
            router.push({name: 'rrhh_configuracion_empresas' });

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

