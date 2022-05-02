<template>
  <div>
    <span class="text-red-500 text-xs">{{ error != undefined ? error.msg : '' }}</span>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
  export default {
    props:{
        errors: Array,
        field: String
    },
    setup(props){

        return {
            error: computed(()=> props.errors.filter( (error) => error.param == props.field )[0] ),
        }
    }
  }
</script>