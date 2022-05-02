<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">

        <CardEstado 
        :estado="{ title:'Empresas', to:'rrhh_dashboard', icono:' fas fa-industry ', color:'indigo'}">
        </CardEstado>
        
        <CardEstadoPersonal 
        :estado="{ title:'Sucursales', to:'', icono:'fas fa-users ', color:'blue'}">
        <span>200</span></CardEstadoPersonal>

        <CardEstado 
        :estado="{ title:'Nómina', to:'', icono:'fas fa-users ', color:'blue'}">
        <span>200</span></CardEstado>

        <CardEstado 
        :estado="{ title:'Activos', to:'', icono:'fas fa-user-check ', color:'green'}">
        <span>150</span></CardEstado>

        <CardEstado 
        :estado="{ title:'Licencia', to:'', icono:'fas fa-power-off ', color:'orange'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Parte Médico', to:'', icono:'fas fa-ambulance ', color:'red'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Vacaciones', to:'', icono:'fas fa-umbrella-beach ', color:'sky'}"></CardEstado>

        <CardEstado 
        :estado="{ title:'Cumpleaños', to:'', icono:'fas fa-birthday-cake ', color:'Magenta'}"></CardEstado>
        
        <CardEstado 
        :estado="{ title:'Otras Licencias', to:'', icono:'fas fa-bullseye ', color:'Purple'}"></CardEstado> -->


    </div>
</template>

<script>

import CardEstado from "../components/CardEstado.vue"
import { Chart } from 'highcharts-vue'
import { ref } from 'vue';
import CardEstadoPersonal from "../components/CardEstadoPersonal.vue";


export default {
    name: 'Dashboard',
    setup() {

    const chartOptions = ref({
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: ''
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: true,
                                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                        }
                                    }
                                },
                                series: [{
                                    name: 'Personal',
                                    colorByPoint: true,
                                    data: [{
                                        name: 'Derka y Vargas',
                                        y: 61.41,
                                        sliced: true,
                                        selected: true
                                    }, {
                                        name: 'Agropecuaria',
                                        y: 11.84
                                    }]
                                }]
                            })
        return {
            chartOptions,

        };
    },
    components: { CardEstado, highcharts: Chart, CardEstadoPersonal }
}

</script>
