import { useRrhhStore } from ".";
import dyvApi from "../../../api/dyvApi";
import { useEmpresaStore } from "../../empresa/store";


const iniciarEmpleado = () => {
    const rrhhStore = useRrhhStore()
    rrhhStore.empleado = {
        puestos: [],
        nombre: '',
        apellido: '',
        sucursal: {
            nombre: ''
        },
        supervisor: {
            nombre_completo: ''
        }
    }
}


const loadEmpleados= async( page, q = '' ) => {
    const rrhhStore = useRrhhStore();
    // rrhhStore.empleado = {}
    try {

        const { data } = await dyvApi.get(`/usuarios`,{
            params:{ page, q }
        });

        // rrhhStore.empleados = data;

        if ( data.length > 0 ) {
            rrhhStore.empleados = data;
        } else if (page > 0) {
            return { ok: false, message: 'No hay registros para mostrar' }
        } 

        return { ok: true, message: 'Cargando' }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
     }
}

const newEmpleado = async() => {
    const rrhhStore = useRrhhStore()
    try {
        iniciarEmpleado()
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error } 
    }
}

const loadEmpleado = async( id ) => {
    const rrhhStore = useRrhhStore()
    const empresaStore = useEmpresaStore()
    iniciarEmpleado()
    try {
        const { data } = await dyvApi.get(`/usuarios/${ id }`);

        rrhhStore.empleado = data
        if (rrhhStore.empleado.supervisor == null) {
            rrhhStore.empleado.supervisor = { nombre_completo: '' }
        } 

        rrhhStore.empleado.empresa_id = data.sucursal.empresa_id
        rrhhStore.empleado.sindicato_id = data.categoria.sindicato_id

        await empresaStore.onChangeEmpresa( rrhhStore.empleado.empresa_id )

        return { ok: true, message: 'Cargando' }
    } catch (error) {
        return { ok: false, message: error } 
    }
}


const loadSuperiores = async( id ) => {
    const rrhhStore = useRrhhStore()
    // const empresaStore = useEmpresaStore()
    try {
        const { data } = await dyvApi.get(`/usuarios/superiores/${ id }`)
        rrhhStore.superiores = data
        return { ok: true, message: 'Cargando', resultSuperiores: data }
    } catch (error) {
        return { ok: false, message: error } 
    }
}

const getSuperiorSearch = ( superiorSearch ) => {

    const rrhhStore = useRrhhStore()
    if ( superiorSearch.length === 0 ){
        return rrhhStore.superiores
    }  
    return rrhhStore.superiores.filter( superior => superior.nombre_completo.toLowerCase().includes( superiorSearch.toLowerCase() ) )
}

const updateEmpleado = async() => {

    const rrhhStore = useRrhhStore()
    const { empleado } = rrhhStore
    try {
        const { data } = await dyvApi.put(`/usuarios/${ empleado.id }`, empleado );
        return { ok: true, message: 'Cargando' }
    } catch (error) {
        if (error.response.data.errors != undefined ) {
            rrhhStore.errors = error.response.data.errors
            return { ok: false, message: 'Por favor verifique los datos ingresados' }
        } else {
            return { ok: false, message: error.response.data.msg }
        }
    }
}

const saveImage = async( archivo ) => {
    const rrhhStore = useRrhhStore()
    const { empleado } = rrhhStore

    try {

        const formData = new FormData()
        formData.append('archivo', archivo)

        const { data } = await dyvApi.put(`/usuarios/actualizarImagen/${ empleado.id }`, formData );
        rrhhStore.localImage = null
        rrhhStore.empleado.img = data.nombre
        
        return { ok: true, message: 'Cargando' }

    } catch (error) {

        return { ok: false, message: error }  
        // if (error.response.data.errors != undefined ) {
        //     rrhhStore.errors = error.response.data.errors
        //     return { ok: false, message: 'Por favor verifique los datos ingresados' }
        // } else {
        //     return { ok: false, message: error.response.data.msg }
        // }        
    }


}


const createEmpleado = async() => {

    const rrhhStore = useRrhhStore()
    const { empleado } = rrhhStore
    rrhhStore.localImage = ''
    try {
        empleado.password = 'derkayvargas'
        const { data } = await dyvApi.post(`/usuarios/`, empleado )
        rrhhStore.empleado = data;
        if (rrhhStore.empleado.supervisor == null) {
            rrhhStore.empleado.supervisor = { nombre_completo: '' }
        } 
        rrhhStore.empleado.empresa_id = data.sucursal.empresa_id
        rrhhStore.empleado.sindicato_id = data.categoria.sindicato_id
        return { ok: true, message: 'Cargando' }       
    } catch (error) {
        if (error.response.data.errors != undefined ) {
            rrhhStore.errors = error.response.data.errors
            return { ok: false, message: 'Por favor verifique los datos ingresados' }
        } else {
            return { ok: false, message: error.response.data.msg }
        }
    }
}


const loadSexos = async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/sexos`);
        rrhhStore.sexos = data;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const selectedSexo = async( idx ) => {
    try {
        const rrhhStore = useRrhhStore();
        const sexo = { ...rrhhStore.sexos[idx] }
        return { ok: true, sexo }
    } catch (error) {
        return { ok: false, message: error }   
    }
}

const createSexo = async( sexoForm ) => {
    try {
        const rrhhStore = useRrhhStore();
        const { data } = await dyvApi.post(`/sexos`, sexoForm);
        rrhhStore.sexos.push( data.sexo )
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const editSexo = async( sexoForm ) => {
    try {
        const { data } = await dyvApi.put(`/sexos/${ sexoForm.id }`, sexoForm);
        await loadSexos()
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

const selectedVinculo = async( idx ) => {
    try {
        const rrhhStore = useRrhhStore();
        const vinculo = { ...rrhhStore.vinculos[idx] }
        return { ok: true, vinculo }
    } catch (error) {
        return { ok: false, message: error }   
    }
}

const createVinculo = async( vinculoForm ) => {
    try {
        const rrhhStore = useRrhhStore();
        const { data } = await dyvApi.post(`/vinculos`, vinculoForm);
        rrhhStore.vinculos.push( data.vinculo )
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const editVinculo= async( vinculoForm ) => {
    try {
        const { data } = await dyvApi.put(`/vinculos/${ vinculoForm.id }`, vinculoForm);
        await loadVinculos()
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const loadLicencias = async() => {
    const rrhhStore = useRrhhStore();
    try {

        const { data } = await dyvApi.get(`/licencias`);
        rrhhStore.licencias = data;

        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const selectedLicencia = async( idx ) => {
    try {
        const rrhhStore = useRrhhStore();
        const licencia = { ...rrhhStore.licencias[idx] }
        return { ok: true, licencia }
    } catch (error) {
        return { ok: false, message: error }   
    }
}

const createLicencia = async( licenciaForm ) => {
    try {
        const rrhhStore = useRrhhStore();
        const { data } = await dyvApi.post(`/licencias`, licenciaForm);
        rrhhStore.licencias.push( data.licencia )
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const editLicencia = async( licenciaForm ) => {
    try {
        const { data } = await dyvApi.put(`/licencias/${ licenciaForm.id }`, licenciaForm);
        await loadLicencias()
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}


const loadEstadosCiviles= async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/estados_civiles`);
        rrhhStore.estados_civiles = data.estado_civiles;
        return { ok: true }
       } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const selectedEstadoCivil = async( idx ) => {
    try {
        const rrhhStore = useRrhhStore();
        const estado_civil = { ...rrhhStore.estados_civiles[idx] }
        return { ok: true, estado_civil }
    } catch (error) {
        return { ok: false, message: error }   
    }
}

const createEstadoCivil = async( estadoCivilForm ) => {
    try {
        const rrhhStore = useRrhhStore();
        const { data } = await dyvApi.post(`/estados_civiles`, estadoCivilForm);
        rrhhStore.estados_civiles.push( data.estado_civil )
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const editEstadoCivil = async( estadoCivilForm ) => {
    try {
        const { data } = await dyvApi.put(`/estados_civiles/${ estadoCivilForm.id }`, estadoCivilForm);
        await loadEstadosCiviles()
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }    
    }
}

const getPuestos = async() => {

    const rrhhStore = useRrhhStore();
    const empresa_id = rrhhStore.empleado.sucursal.empresa_id

    try {
        const { data } = await dyvApi.get(`/puestos/`, { params: { empresa_id } });
        rrhhStore.puestos = data
        // console.log( data )
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }  
    }

}


const getPuestoSearch = ( puestoSearch ) => {

    const rrhhStore = useRrhhStore()
    if ( puestoSearch.length === 0 ){
        return rrhhStore.puestos
    }  
    return rrhhStore.puestos.filter( puesto => puesto.puesto.toLowerCase().includes( puestoSearch.toLowerCase() ) )
}


const createEmpleadoPuesto = async( puestoForm ) => {
    const rrhhStore = useRrhhStore()
    const user_id = rrhhStore.empleado.id

    try {
        // console.log( puestoForm )
        const { data } = await dyvApi.post(`/puestos/puesto_empleado`, {  user_id, puesto:puestoForm } );
        // console.log( data )
        rrhhStore.empleado.puestos.push(data)
        return { ok: true, puesto:data }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }   
    }
}

const updateEmpleadoPuesto = async( puestoForm ) => {
    const rrhhStore = useRrhhStore()

    // console.log(puestoForm);
    try {
        const { data } = await dyvApi.put(`/puestos/puesto_empleado/${ puestoForm.id }`, puestoForm )
        // rrhhStore.empleado = data
        
        return { ok: true, puesto:data }
    } catch (error) {

        console.log(error.response.data )
        return { ok: false, message: error.response.data.msg }   
    }
}


const getLicencias = async() => {
    const rrhhStore = useRrhhStore();
    try {
        const { data } = await dyvApi.get(`/licencias/`);
        rrhhStore.licencias = data
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }  
    }

}


const getLicenciaSearch = ( licenciaSearch ) => {
    const rrhhStore = useRrhhStore()
    if ( licenciaSearch.length === 0 ){
        return rrhhStore.licencias
    }  
    return rrhhStore.licencias.filter( licencia => licencia.licencia_tipo.licencia_tipo.toLowerCase().includes( licenciaSearch.toLowerCase() ) )
}

const createEmpleadoLicencia = async( licenciaForm ) => {
    const rrhhStore = useRrhhStore()
    const user_id = rrhhStore.empleado.id

    try {
        // console.log( puestoForm )
        const { data } = await dyvApi.post(`/licencias/licencia_empleado`, {  user_id, licencia:licenciaForm } );
        console.log( data )
        rrhhStore.empleado.licencias.push(data)
        return { ok: true, licencia:data }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }   
    }
}


const updateEmpleadoLicencia = async( licenciaForm ) => {
    const rrhhStore = useRrhhStore()

    // console.log(puestoForm);
    try {
        const { data } = await dyvApi.put(`/licencias/licencia_empleado/${ licenciaForm.id }`, licenciaForm )
        // rrhhStore.empleado = data
        
        return { ok: true, licencia:data }
    } catch (error) {

        console.log(error.response.data )
        return { ok: false, message: error.response.data.msg }   
    }
}


export default {
    loadEmpleados,
    newEmpleado,
    loadEmpleado,
    loadSuperiores,
    getSuperiorSearch,
    updateEmpleado,
    saveImage,
    createEmpleado,
    loadSexos,
    selectedSexo,
    createSexo,
    editSexo,
    loadVinculos,
    selectedVinculo,
    createVinculo,
    editVinculo,
    loadLicencias,
    selectedLicencia,
    createLicencia,
    editLicencia,
    loadEstadosCiviles,
    selectedEstadoCivil,
    createEstadoCivil,
    editEstadoCivil,
    getPuestos,
    getPuestoSearch,
    createEmpleadoPuesto,
    updateEmpleadoPuesto,
    getLicencias,
    getLicenciaSearch,
    createEmpleadoLicencia,
    updateEmpleadoLicencia,
    
}