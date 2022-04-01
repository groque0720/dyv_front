
<template>

    <a href="#" @click.prevent="onLink()">
        <div class="flex items-center pl-5 p-2 border rounded-full gap-3 shadow-md hover:bg-indigo-50"
            :class="{'isLinkActive': (linkTo == nameRoute) }">
            <i :class="[{' fas fa-link ': icon == ''}, icon]" ></i>
            <span class=" flex-1 text-left"> {{ title }}</span>
            <i class="hidden link-selected fas fa-chevron-circle-right text-indigo-500"></i>
        </div>
    </a>

</template>

<script>

import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
    name: 'BottonLink',
    props:{
        config: {}
    },
    setup( props ) {
        const router = useRouter()

        console.log(router.currentRoute.value.name)

        return {
            nameRoute: computed(() => router.currentRoute.value.name),
            title: props.config.title,
            icon: props.config.icon,
            linkTo: props.config.to,
            onLink: ( ) => router.push({name: props.config.to })
        }

    }
}
</script>