<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
       
        <CardEstado 
        :estado="{ title:'Empresas', to:'rrhh_dashboard', icono:' fas fa-industry ', color:'indigo'}">
            <span>Empresa</span>
        </CardEstado>

        <CardEstado 
        :estado="{ title:'Nómina', to:'', icono:'fas fa-users ', color:'blue'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Activos', to:'', icono:'fas fa-user-check ', color:'green'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Licencia', to:'', icono:'fas fa-power-off ', color:'orange'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Parte Médico', to:'', icono:'fas fa-ambulance ', color:'red'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Vacaciones', to:'', icono:'fas fa-umbrella-beach ', color:'lime'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Cumpleaños', to:'', icono:'fas fa-birthday-cake ', color:'Magenta'}"></CardEstado>
        
        <CardEstado 
        :estado="{ title:'Otras Licencias', to:'', icono:'fas fa-bullseye ', color:'Purple'}"></CardEstado>


    </div>
</template>

<script>
import CardEstado from "../components/CardEstado.vue"

export default {
    setup() {
        return {};
    },
    components: { CardEstado }
}

</script>
