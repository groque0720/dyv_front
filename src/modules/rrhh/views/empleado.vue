
<template>

    <div class="  flex flex-col md:flex-row justify-between item-start gap-3">
    
        <!-- Avatar // Menú -->
        <div class="w-full md:w-3/12 rounded flex flex-col gap-3">
            <div class="border border-gray-400 rounded shadow-md">
                <template v-if=" empleado.nombre != undefined ">
                    <div  class="flex relative justify-center items-center p-5">
     
                        <div class=" overflow-hidden relative w-24 h-24 bg-gray-100 z-10  flex justify-center items-center rounded-full border-2 border-white shadow-lg m-auto">
                            
                            <div v-if="localImage" class="relative">
                                <div class="w-24 h-24 absolute flex justify-center items-center ">
                                    <i @click="saveImage( $event )" class="absolute icon-guardar text-white text-4xl opacity-70 cursor-pointer"></i>
                                </div>
                                <img  
                                class="w-24 h-24 object-cover"
                                :src="localImage" alt="" >
                            </div>
                            
                            <template v-else>
                                <img v-if="empleado.img"  
                                class="w-24 h-24 m-auto object-cover"
                                :src="baseURL+empleado.img" :alt="empleado.nombre">
                                <i v-else class="icon-perfil text-4xl"></i>
                                <input v-if="empleado.id != null " type="file" class="absolute block opacity-0 z-10 cursor-pointer h-24" @change="onSelectedImage( $event )" accept="image/*">
                            </template>
                        </div>
                        <div class="bg-green-300 h-3/6 w-full absolute top-0 rounded-t">
                        </div>
                    </div>
                    <div class="flex flex-col items-center pb-5">
                        <span class=" font-semibold text-indigo-500">{{ empleado.nombre }} {{ empleado.apellido }}</span>
                        <span>{{ empleado.sucursal != undefined ? empleado.sucursal.nombre : '-' }}</span>
                        <!-- <span v-if="empleado.puestos.length > 1 ">{{  empleado.puestos[0].puesto  }}</span> -->
                    </div>
                </template>
            </div>
            <div class="flex flex-col gap-2">

                <ButtonLink
                    :config="{
                            title: 'Perfil',
                            icon:' icon-perfil ',
                            to: 'rrhh_empleado_perfil' }"></ButtonLink>

                <!-- <template v-if="id != 'nuevo'"> -->

                <div class="relative flex flex-col gap-2" :class="{ 'text-gray-500': empleado.id != null}">
                    <div v-if="empleado.id == null " class="w-full h-full bg-white absolute bg-opacity-50"></div>
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
                


                <!-- </template> -->


            </div>

        </div>

        <!-- formularios -->
        <div class="w-full md:w-9/12 border border-gray-400 rounded">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
import { useRouter } from 'vue-router';
import ButtonLink from '../components/ButtonLink.vue';
import { useRrhhStore } from '../store';
import { computed, ref } from 'vue';
import { createToast } from 'mosha-vue-toastify';


   export default {
    name: 'Empleado',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const rrhhStore = useRrhhStore()
        const file = ref(null)

        const optionsToast = (type) => ({
            type: type,
            transition:'slide',
            showIcon: true,
            timeout: 2000

        })

        const loadEmpleado = async( id ) => {
            if ( id != 'nuevo') {
                await rrhhStore.loadEmpleado( id )
            }
        }

        const onSelectedImage = ( event ) => {
            const file_selected = event.target.files[0]
            if ( !file_selected ) {
                rrhhStore.localImage = null
                return
            }
            file.value = file_selected
            const fr = new FileReader()
            fr.onload = () => rrhhStore.localImage = fr.result
            fr.readAsDataURL( file_selected )
        }

        const saveImage = async() => {
            const archivo = file.value
            const { ok, message } = await rrhhStore.saveImage(archivo)
            if (!ok ) createToast('Ocurrio un error', optionsToast('danger') )
            else createToast('Se guardó Correctamente', optionsToast('success') )
        }


        loadEmpleado(props.id)

        return {
            id: props.id,
            onSelectedImage,
            saveImage,
            localImage: computed( () => rrhhStore.localImage ),
            onLink: (nameRoute) => router.push({ name: nameRoute }),
            empleado: computed( () => rrhhStore.empleado ),
            baseURL: import.meta.env.VITE_API_URL_FILES,
        };
    },
    components: { ButtonLink }
}
</script>