import { useRrhhStore } from ".";
import dyvApi from "../../../api/dyvApi";


const loadEmpleados= async() => {

    const useRrhhStore = useRrhhStore();

    try {

        const { data } = await dyvApi.get(`/usuarios`);

        console.log( data );

        useRrhhStore.empleados = data;
 
        return { ok: true }
        
    } catch (error) {

        return { ok: false, message: error.response.data.msg }
        
    }


}


const loadSexos= async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/sexos`);
        
        rrhhStore.sexos = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const loadVinculos= async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/vinculos`);
        
        rrhhStore.vinculos = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}


const loadLicencias = async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/licencias`);
        console.log( data );
        rrhhStore.licencias = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const loadPuestos = async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/puestos`);
        console.log( data );
        rrhhStore.puestos = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const loadAreas = async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/areas`);
        console.log( data );
        rrhhStore.areas = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

export default {
    loadEmpleados,
    loadSexos,
    loadVinculos,
    loadLicencias,
    loadPuestos,
    loadAreas
}