<template>
    <div 
        class="flex flex-col justify-between  border border-t-0 border-gray-400 rounded hover:cursor-pointer hover:shadow-xl hover:bg-white shadow-md">

        <div class="p-2 text-center border-t-4 border-b rounded-t border-green-500 bg-white" >
            <div class="flex justify-center items-center gap-3">
                <div class="text-right"> <i :class="icono"></i></div>
                <div class="text-left uppercase font-semibold">
                    <span>{{ titulo }}</span>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center h-72 border-t p-3">
           <highcharts class="w-full h-full"  :options="chartOptions_01"></highcharts>
        </div>

    </div>
</template>

<script>

import { useRouter } from 'vue-router';
import { Chart } from 'highcharts-vue'
import { ref } from 'vue';


export default {
    name: 'CardEstadoPersonal',
    props:{
        estado: Object
    },
    setup(props){

        const router = useRouter()
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
        const chartOptions_01 = ref({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Browser<br>shares<br>2017',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
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
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: [
            ['Chrome', 58.9],
            ['Firefox', 13.29],
            ['Internet Explorer', 13],
            ['Edge', 3.78],
            ['Safari', 3.42],
            {
                name: 'Other',
                y: 7.61,
                dataLabels: {
                    enabled: false
                }
            }
        ]
    }]
})

        return {
            chartOptions_01,
            titulo: props.estado.title,
            icono: props.estado.icono,
            color:props.estado.color,
            to: props.estado.to,
            link: () => router.push({ name: props.estado.to})
        }
    },
    components: { highcharts: Chart }
}
</script>

<style scoped>

.titulo-color {
    border-color: v-bind(color);
    color: v-bind(color);
    opacity: 0.6;
}

</style>