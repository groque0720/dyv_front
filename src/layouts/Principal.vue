<template>

    <nav class=" h-12 w-full shadow-lg p-2 fixed z-10 bg-white border-b-2">

        <div class=" flex justify-between items-center">
            
            <div class="w-4/12">
                <img  class="h-8" src="/src/assets/logo-dyv.png" alt="">
            </div>

            <div class="flex items-center gap-2">
                <div>
                    <span>{{ user }}</span>
                </div>
                <div class="w-8 h-8 rounded-full border border-indigo-300 flex justify-center items-center bg-indigo-700">
                    <!-- <img src="" alt=""> -->
                    <span class=" text-white font-bold">RG</span>
                </div>
            </div>

        </div>
        
    </nav>
    <div class="pt-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 flex justify-center">
        <div class="w-full ">
            <!-- <div  class=" grid grid-cols-3 gap-3" >

                <template v-for="i in 10" :key="i">
                      <Aplicacion></Aplicacion>
                </template>


            </div> -->
            <router-view></router-view>
        </div>
    </div>

</template>


<script>

import { useAuthStore } from "../modules/auth/store"
import Aplicacion from "../components/Aplicacion.vue";


export default {
    setup() {
        const authStore = useAuthStore();
        const { user } = authStore;
        return {
            user
        };
    },
    components: { Aplicacion }
}
</script>

