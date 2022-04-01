<template>
    <div >
           PEOE
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"


export default {
    props:{
        item: {
            type: String
        } 
    },
    setup( props ) {
        const empresaStore = useEmpresaStore();
        return {
            props
        };
    },
}

</script>