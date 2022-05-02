<template>

    <div class="flex flex-col md:flex-row md:justify-center items-start gap-3 relative">
        <div class="box w-full md:w-2/12">
            <ListCardItem></ListCardItem>
        </div>
        <div class="box w-full md:w-8/12 flex-1">
            <router-view></router-view>
         </div>
    </div>

</template>

<script>

import ListCardItem from "../components/ListCardItem.vue"


export default {
    name: 'LayoutRRHH',
    setup() {
        return {};
    },
    components: { ListCardItem }
}

</script>

<style>
    @import '../css/';
</style>