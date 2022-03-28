<template>
    <div class="flex md:flex-col gap-3">

    <CardItem
        :item="{ title:'Dashboard', to:'rrhh_dashboard', icono:' fas fa-tachometer-alt ', color:' text-green-500'}"/>

    <CardItem
        :item="{ title:'Nómina', to:'rrhh_nomina', icono:' fas fa-users ', color:'text-indigo-500'}"/>

    <CardItem
        :item="{ title:'Actividades', to:'rrhh_actividad', icono:'fas fa-user-clock ', color:'text-fuchsia-500'}"/>
    
    <CardItem
        :item="{ title:'Configuración', to:'rrhh_configuracion_empresas', icono:' fa-user-cog ', color:'text-amber-500'}"/>

    </div>
</template>

<script>
import CardItem from "./CardItem.vue"

export default {
    setup() {
        return {};
    },
    components: { CardItem }
}

</script>