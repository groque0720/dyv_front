
<template>
    <div
        class="p-2 bg-indigo-50 rounded hover:cursor-pointer border hover:bg-indigo-200 shadow-md"
        :class="{'isLinkActive': nameRoute.includes(linkTo)  }"
        @click="link()">
        <div class="flex  justify-center lg:justify-between items-center gap-4">
            <div class="w-8 h-8 flex justify-center items-center bg-white rounded-full p-3 shadow-md">
                <i :class="icono + color" class="fas fa-heart text-indigo-500"></i>
            </div>
            <div class="hidden lg:flex flex-1">
                <span> {{ titulo }}</span>
            </div>
        </div>
    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { computed } from 'vue'

export default {
    name: 'CardItem',
    props:{
        item: Object
    },
    setup(props){

        const router = useRouter()
        // const nameRoute = router.currentRoute.value.name
        // console.log(router.currentRoute.value);

        //  console.log(router.currentRoute.value.name, ' ', props.item.to );

        return {
            titulo: props.item.title,
            icono: props.item.icono,
            color: props.item.color,
            linkTo: props.item.to,
            nameRoute: computed(() => router.currentRoute.value.name),
            link: () => router.push({ name: props.item.to})
        }
    }
}
</script>

<style scoped>
</style>
