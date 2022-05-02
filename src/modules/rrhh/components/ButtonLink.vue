
<template>

    <a href="#" @click.prevent="onLink()">
        <div class="flex justify-center items-center p-2 px-5 border border-gray-400 rounded-full gap-3 shadow-md hover:bg-indigo-100 sm:justify-between"
            :class="{'isLinkActive': nameRoute.includes(linkTo)  }">

            <div><i class="flex-1" :class="[{' fas fa-link ': icon == ''}, icon]" ></i></div>

            <span class="hidden sm:flex flex-1 text-left"> {{ title }}</span>

            <span class="hidden sm:flex">
                <i class="hidden link-selected fas fa-chevron-circle-right text-indigo-500"></i>
            </span>

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

        // console.log(router.currentRoute.value.name, ' ', props.config.to );

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