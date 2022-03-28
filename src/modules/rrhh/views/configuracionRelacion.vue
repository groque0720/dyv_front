
<template>

    <div class="p-3">

        <div class="flex items-center gap-3 pb-2 border-b border-indigo-500">
            <i class="fas fa-people-arrows text-purple-500 text-xl"></i>
            <span class=" text-xl">Relaciones</span>
        </div>


    </div>

</template>

<script>
import { useRouter } from 'vue-router';

   export default {
       props:{

       },
       setup(props){

           const router = useRouter()


       }
   }
</script>