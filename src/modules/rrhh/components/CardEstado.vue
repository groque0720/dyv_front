<template>
    <div 
        class="flex flex-col justify-between bg-gray-50 border border-t-0 border-gray-400 rounded hover:cursor-pointer hover:shadow-xl hover:bg-white shadow-md">

        <div class="p-2 text-center border-t-4 border-b rounded-t titulo-color bg-white" >
            <div class="flex justify-center items-center gap-3">
                <div class="text-right"> <i :class="icono"></i></div>
                <div class="text-left uppercase font-semibold">
                    <span>{{ titulo }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center h-36 border-t">
            <slot> <span class="text-2xl"> 2 </span> </slot>
        </div>
        <!-- <div class="p-3">
            <button class="btn" type="submit"> Ir </button>
        </div> -->

    </div>
</template>

<script>

import { useRouter } from 'vue-router';

export default {
    props:{
        estado: Object
    },
    setup(props){

        const router = useRouter()

        return {
            titulo: props.estado.title,
            icono: props.estado.icono,
            color:props.estado.color,
            to: props.estado.to,
            link: () => router.push({ name: props.estado.to})
        }
    }
}
</script>

<style scoped>

.titulo-color {
    border-color: v-bind(color);
    color: v-bind(color);
    opacity: 0.6;
}

</style>