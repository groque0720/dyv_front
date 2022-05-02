<template>
    <div class="flex md:flex-col gap-3">

    <CardItem
        :item="{ title:'Dashboard', to:'rrhh_dashboard', icono:' fas fa-tachometer-alt ', color:' text-green-500'}" :key="1" />

    <CardItem
        :item="{ title:'Empleados', to:'rrhh_empleados', icono:' fas fa-users ', color:'text-indigo-500'}" :key="2" />

    <CardItem
        :item="{ title:'Actividades', to:'rrhh_actividad', icono:'fas fa-user-clock ', color:'text-fuchsia-500'}" :key="3" />
    
    <CardItem
        :item="{ title:'Configuración', to:'rrhh_configuracion', icono:' fa-user-cog ', color:'text-amber-500'}" :key="4" />

    </div>
</template>

<script>
import CardItem from "./CardItem.vue"

export default {
    name: 'ListCardItem',
    setup() {
        return {};
    },
    components: { CardItem }
}

</script>