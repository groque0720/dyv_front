<template>
    <div>
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg">{{ empresa.nombre }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">{{ sucursalForm.id ? 'Editar ' : 'Nueva' }} Sucursal</span>
            </div> 
        </div>
        <form action="#" @submit.prevent="enviarForm()" >
            <div class="">
                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="flex-1">
                        <label class="required" for="">Nombre Sucursal</label>
                        <input class="form-input" type="text" v-model="sucursalForm.nombre" required>
                    </div>
                </div>

                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="flex-1">
                        <label class="required" for="">Localidad</label>
                        <input class="form-input" type="text" v-model="sucursalForm.localidad" required>
                    </div>
                    <div class="flex-1">
                        <label class="required" for="">Provincia</label>
                        <input class="form-input" type="text" v-model="sucursalForm.provincia" required>
                    </div>
                    <div class="">
                        <label class="required" for="">Codigo Postal</label>
                        <input class="form-input" type="text" v-model="sucursalForm.cp" required>
                    </div>
                </div>


                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="w-8/12">
                        <label class="required" for="">Calle</label>
                        <input class="form-input" type="text" v-model="sucursalForm.calle" required>
                    </div>
                    <div class="">
                        <label for="">Nro</label>
                        <input class="form-input" type="text" v-model="sucursalForm.nro" >
                    </div>
                    <div class="">
                        <label for="">Piso</label>
                        <input class="form-input" type="text" v-model="sucursalForm.piso" >
                    </div>
                    <div class="">
                        <label for="">Dpto</label>
                        <input class="form-input" type="text" v-model="sucursalForm.dpto" >
                    </div>

                </div>

                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="flex-1" >
                        <label class="required" for="">Teléfono</label>
                        <input class="form-input" type="text" v-model="sucursalForm.telefono" required>
                    </div>
                </div>

                <div class="form-row flex flex-col md:flex-row gap-3 w-full">
                    <div class="flex-1">
                        <label class="required" for="">Email</label>
                        <input class="form-input" type="text" v-model="sucursalForm.email" required>
                    </div>
                    <div class="w-2/12">
                        <label  class="required" for="central">Es central</label>
                        <select class="form-select self-center" v-model="sucursalForm.central" required>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-row flex justify-between border-t mt-3">
                <span class="form-btn-cancelar" type="text" @click.prevent="cancelar()">Volver</span>
                <button class="form-btn-submit">Aceptar</button>
            </div>
        </form>
    </div> 
</template>

<script>

import { useEmpresaStore } from "../store"
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
    
    // props:{
    //     id: String,
    //     sucursal_id: String
    // },
    setup( props, context ){

        const empresaStore = useEmpresaStore()
        const router = useRouter()

        const updateSucursal = async() => {
            const { ok, message } = await empresaStore.updateSucursal()
            if (!ok) 
                Swal.fire("Error", message, "error");
                context.emit('on:close');
        }

        const createSucursal = async() => {
            const { ok, message } = await empresaStore.createSucursal()
            if (!ok) 
                Swal.fire("Error", message, "error");
            context.emit('on:close');
        }

        const cancelar = async () => {
            await empresaStore.clearSucursal()
            context.emit('on:close');
        }

        const enviarForm = async () => {
            if ( empresaStore.sucursal.id != undefined ) {
                updateSucursal()
            } else {
                createSucursal()
            }
        }

        return {
            props,
            router,
            cancelar,
            enviarForm,
            empresa: computed( ()=>  empresaStore.empresa ),
            sucursalForm: computed(() => empresaStore.sucursal ),
        }
    }
}
</script>