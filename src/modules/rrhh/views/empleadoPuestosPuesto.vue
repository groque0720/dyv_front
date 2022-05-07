<template>
    <Loading v-if="isLoading" ></Loading>
    <div v-else class="p-3 bg-white ">

        <div class="flex justify-between items-center pb-1 border-b border-indigo-500">
            <div class="flex gap-3">
                <i class="icon-puesto text-lg"></i>
                <span class=" text-lg">Editar Puesto</span>
            </div>
        </div>

    </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import { ref } from 'vue';
export default {
    props: {
        id: String,
        puesto_id: String
    },
    setup ( props ) {
            const puestoForm = ref({})
            const isLoading = ref(false)
            const onProcess = ref(false)

            return {
                isLoading
            }
        },
    components: { Loading }
}
</script>



