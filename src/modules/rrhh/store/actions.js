import { useRrhhStore } from ".";
import dyvApi from "../../../api/dyvApi";
import { useEmpresaStore } from "../../empresa/store";


const loadEmpleados= async( page, q = '' ) => {
    const rrhhStore = useRrhhStore();
    rrhhStore.empleado = {}
    try {

        const { data } = await dyvApi.get(`/usuarios`,{
            params:{ page, q }
        });

        if ( data.length > 0 ) {
            rrhhStore.empleados = data;
        } else if (page > 0) {
            return { ok: false, message: 'No hay mas registros' }
        } 

        console.log(q)

        return { ok: true, message: 'Cargando' }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
     }
}

const newEmpleado = async() => {
    const rrhhStore = useRrhhStore()
    try {
        rrhhStore.empleado = {}
        rrhhStore.empleado.nombre = ''
        rrhhStore.empleado.apellido = ''
        rrhhStore.empleado.sucursal.nombre = ''
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error } 
    }
}

const loadEmpleado = async( id ) => {
    const rrhhStore = useRrhhStore()
    const empresaStore = useEmpresaStore()
    try {
        const { data } = await dyvApi.get(`/usuarios/${ id }`);
        rrhhStore.empleado = data;
        rrhhStore.empleado.empresa_id = data.sucursal.empresa_id
        rrhhStore.empleado.sindicato_id = data.categoria.sindicato_id

        // console.log( rrhhStore.empleado )

        await empresaStore.onChangeEmpresa( rrhhStore.empleado.empresa_id )

        return { ok: true, message: 'Cargando' }
    } catch (error) {
        return { ok: false, message: error } 
    }
}


const updateEmpleado = async() => {

    const rrhhStore = useRrhhStore()
    const { empleado } = rrhhStore
    try {
        const { data } = await dyvApi.put(`/usuarios/${ empleado.id }`, empleado );
        return { ok: true, message: 'Cargando' }
    } catch (error) {
        // console.log(error.response)
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

        console.log( error )

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

        // console.log(data)
        
        rrhhStore.licencias.push( data.licencia )
        return { ok: true }
    } catch (error) {
        // console.log(error.response.data.msg )
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
        // console.log(data);
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





export default {
    loadEmpleados,
    newEmpleado,
    loadEmpleado,
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
    
}