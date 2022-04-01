<template>
    <div>  
        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-empresa text-lg"></i>
                <span class=" text-lg"> {{ empresaForm.nombre }}</span>
            </div>
            <div class="flex gap-3">
                <span class=" text-lg">Editar Empresa</span>
            </div> 
        </div>
        <form action="#" @submit.prevent="enviarForm()">
            <div class="form-row flex justify-between gap-3">
            <!-- {{ empresaForm }} -->
                <div class=" flex-1">
                    <label class="required" for="">Nombre</label>
                    <input class="form-input" type="text" v-model="empresaForm.nombre" required>
                </div>
                <div class="flex-1">
                    <label class="required" for="">Cuit</label>
                    <input class="form-input" type="text" v-model="empresaForm.cuit" required>
                </div>   
            </div>
            <div class="my-2">
                <Sucursales></Sucursales>
            </div>
            <div class="form-row flex justify-between">
                <span class="form-btn-cancelar" type="text" @click.prevent="cancelar()">Volver</span>
                <button class="form-btn-submit">Aceptar</button>
            </div> 
        </form>
    </div>
</template>

<script>


import { useEmpresaStore } from "../store"
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { ref, computed } from 'vue';
import Sucursales from './sucursales.vue';

export default {
    props: {
        id: String
    },
    setup(props) {
        const router = useRouter();
        const empresaStore = useEmpresaStore();
        const loadEmpresa = async () => {
            const { ok, message } = await empresaStore.loadEmpresa(props.id);
            if (!ok)
                Swal.fire("Error", message, "error");
        };
        const updateEmpresa = async () => {
            const { ok, message } = await empresaStore.updateEmpresa(props.id);
            if (!ok)
                Swal.fire("Error", message, "error");
            router.go(-1);
            // else Swal.fire("Error", message, "error")
        };
        const createEmpresa = async () => {
            const { ok, message } = await empresaStore.createEmpresa();
            if (!ok)
                Swal.fire("Error", message, "error");
            router.go(-1);
            // else Swal.fire("Error", message, "error")
        };

        const enviarForm = () => {
            if (props.id)
                updateEmpresa();
            else
                createEmpresa();
        };

        if (props.id)
            loadEmpresa();
        else
            empresaStore.empresa = {};

            
        return {
            props,
            router,
            enviarForm,
            empresaForm: computed(() => empresaStore.empresa),
            cancelar: () => {
                router.go(-1);
            },
            selectSucursal: (idx) => {
                router.push({ name: "sucursal_show" });
            }
        };
    },
    components: { Sucursales }
}
</script>