<template>

    <Loading v-if="isLoading"></Loading>

    <div v-else class="">
        <button @click="loadEmpresas()"> todos</button>

        <template v-for="empresa in empresas" :key="empresa.id">
            <div v-if="empresa.view" class="flex justify-between gap-2 items-center "
                :class="{'text-gray-400 bg-gray-100': !empresa.activo }">
                <div class="w-6/12">
                    <span>{{ empresa.nombre }}</span></div>
                <div class="w-3/12 text-center">
                    <span>{{ empresa.cantidad }}</span></div>
                <div class="w-3/12 flex items-center justify-center">
                    <i @click="clickFiltro(empresa.id)" 
                        class="icon-off text-xl cursor-pointer"
                        :class="{'icon-on': empresa.activo }"></i>
                </div>
            </div>
        </template>

        <div class="flex justify-between gap-2 items-center">
            <div class="w-6/12">
                <span>Total</span></div>
            <div class="w-3/12 text-center">
                <span>{{ cantidadEmpleados }}</span>
            </div>
            <div class="w-3/12 flex items-center justify-center">
            </div>
        </div>
    </div>

</template>

<script>

import { ref, computed } from 'vue';
import { useRrhhStore } from '../../store'
import { useEmpresaStore } from '@/modules/empresa/store';
import Loading from '@/components/Loading.vue';


export default {
    name: "DashboardEmpresas",
    setup() {
        const empresaStore = useEmpresaStore()
        const rrhhStore = useRrhhStore()
        const isLoading = ref(false)
        let cantidadEmpleados = ref(0)


        const loadEmpresas = async() => {
            isLoading.value = true
            // if (!empresaStore.empresas.length)  {
                const { ok, message } = await empresaStore.loadEmpresas()    
                if ( !ok ) Swal.fire("Atención", message, "info")
            // } 
            cantidadEmpleados.value = rrhhStore.empleados.length
            cargarFiltroEmpresa()
            isLoading.value = false       
        } 

        const cargarFiltroEmpresa = async() => {
            let empresas = new Array
            let sucursales = new Array
            let sectores = new Array
            let areas = new Array
            let puestos = new Array

            empresaStore.empresas.forEach( empresa_ => {

                let new_ = {
                    id: empresa_.id,
                    nombre: empresa_.nombre,
                    cantidad: cantidadEmpleadosEmpresa(empresa_.id),
                    view: true,
                    activo: true
                }

                empresas.push(new_)

                empresa_.sucursales.forEach(sucursal_ => {
                    let new_ = {
                        id: sucursal_.id,
                        empresa_id: empresa_.id,
                        empresa: empresa_.nombre,
                        nombre: sucursal_.nombre,
                        cantidad: 0,
                        view: true,
                        activo: true
                    }
                    sucursales.push(new_)
                })

                empresa_.sectores.forEach(sector_ => {
                    let new_ = {
                        id: sector_.id,
                        empresa_id: empresa_.id,
                        empresa: empresa_.nombre,
                        nombre: sector_.sector,
                        cantidad: 0,
                        view: true,
                        activo: true
                    }
                    sectores.push(new_)
                })

                empresa_.areas.forEach(area_ => {
                    let new_ = {
                        id: area_.id,
                        empresa_id: empresa_.id,
                        empresa: empresa_.nombre,
                        nombre: area_.area,
                        cantidad: 0,
                        view: true,
                        activo: true
                    }
                    areas.push(new_)
                })

                empresa_.puestos.forEach( puesto_ => {
                    let new_ = {
                        id: puesto_.id,
                        empresa_id: empresa_.id,
                        empresa: empresa_.nombre,
                        nombre: puesto_.puesto,
                        cantidad: 0,
                        view: true,
                        activo: true
                    }
                    puestos.push(new_)
                })
 

            });
            rrhhStore.filtro.empresas =  empresas
            rrhhStore.filtro.sucursales = sucursales
            rrhhStore.filtro.sectores = sectores
            rrhhStore.filtro.areas = areas
            rrhhStore.filtro.puestos = puestos
        }

        const clickFiltro = async ( id = '' ) => {

            const idx = rrhhStore.filtro.empresas.findIndex( empresa => empresa.id == id )

            if ( rrhhStore.filtro.empresas[idx].activo ) rrhhStore.filtro.empresas[idx].activo = false
            else rrhhStore.filtro.empresas[idx].activo = true

            rrhhStore.empleados.forEach( (  empleado_ ) => {
                if ( empleado_.sucursal.empresa_id == id ) empleado_.empresa_filtro = rrhhStore.filtro.empresas[idx].activo
            })
           
            rrhhStore.filtro.empresas.forEach( empresa_ => {

                rrhhStore.filtro.sucursales.forEach( sucursal_ => {
                    if ( sucursal_.empresa_id == empresa_.id ){
                        sucursal_.view = empresa_.activo
                        // sucursal_.activo = empresa_.activo
                    } 
                })

                rrhhStore.filtro.sectores.forEach( sector => {
                    if ( sector.empresa_id == empresa_.id ){
                        sector.view = empresa_.activo
                        // area_.activo = empresa_.activo 
                    } 
                })

                rrhhStore.filtro.areas.forEach( area_ => {
                    if ( area_.empresa_id == empresa_.id ){
                        area_.view = empresa_.activo
                        // area_.activo = empresa_.activo 
                    } 
                })

                rrhhStore.filtro.puestos.forEach( puesto_ => {
                    if ( puesto_.empresa_id == empresa_.id ){
                        puesto_.view = empresa_.activo
                        // puesto_.activo = empresa_.activo 
                    } 
                })

            })

        }

        const cantidadEmpleadosEmpresa = ( empresa_id = '' ) => {
            const empleados = rrhhStore.empleados.filter( empleado => empleado.sucursal.empresa_id == empresa_id )
            return empleados.length
        }

        // const cantidadEmpleadosSucursal = ( sucursal_id = '' ) => {
        //     const empleados = rrhhStore.empleados_filtro.filter( empleado => empleado.sucursal.id == sucursal_id )
        //     return empleados.length
        // }

        loadEmpresas()

        return {
            isLoading,
            empresas: computed( () => rrhhStore.filtro.empresas ),
            loadEmpresas,
            clickFiltro,
            cantidadEmpleados
        };
    },
    components: { Loading }
}

</script>