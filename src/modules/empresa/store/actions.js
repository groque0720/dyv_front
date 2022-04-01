import { useEmpresaStore } from ".";
import dyvApi from "../../../api/dyvApi";
import { useRouter } from 'vue-router';


const cargarEmpresas = async() => {

    // const empresaStore = useEmpresaStore();

    const empresaStore = useEmpresaStore();

    try {

        const { data } = await dyvApi.get('/empresas');

        empresaStore.empresas = data;

        // console.log(data);

        // return { ok: true, message: 'Si hay Token válido' }
        
    } catch (error) {

        return { ok: false, message: error.response.data.msg }
        
    }

}



const loadEmpresa = async( id ) => {

    const empresaStore = useEmpresaStore();

    try {

        const { data } = await dyvApi.get(`/empresas/${ id }`);

        // console.log( data );

        empresaStore.empresa = data;
 
        return { ok: true }
        
    } catch (error) {

        return { ok: false, message: error.response.data.msg }
        
    }


}

const updateEmpresa = async() => {

    const empresaStore = useEmpresaStore();

    const { empresa } = empresaStore;

    // console.log( empresa_selected );

    try {

        const { data } = await dyvApi.put('/empresas/'+empresa.id, empresa);
        
        // console.log( data );
        return { ok:true }
       
    } catch (error) {

        return { ok: false, message: error.response.data.msg}
        
    }

}


const createEmpresa = async() => {

    const empresaStore = useEmpresaStore()

    const { empresa } = empresaStore; 

    try {

        const { data } = await dyvApi.post('/empresas/', empresa )
        
        return  { ok: true }
       
    } catch (error) {

        return { ok: false, message: error.response.data.msg}
        
    }

}


const loadSucursal= async( id ) => {

    const empresaStore = useEmpresaStore();

    try {

        const { data } = await dyvApi.get(`/sucursales/sucursal/${ id }`);

        // console.log( data );

        empresaStore.sucursal = data;
 
        return { ok: true }
        
    } catch (error) {

        return { ok: false, message: error.response.data.msg }
        
    }


}

const updateSucursal = async() => {

    const empresaStore = useEmpresaStore();

    const { sucursal } = empresaStore;

    // console.log( empresa_selected );

    try {

        const { data } = await dyvApi.put('/sucursales/'+sucursal.id, sucursal);
        
        // console.log( data );
        return { ok:true }
       
    } catch (error) {

        return { ok: false, message: error.response.data.msg}
        
    }

}

const createSucursal = async() => {

    const empresaStore = useEmpresaStore();

    const { empresa, sucursal } = empresaStore;

    // console.log( empresa_selected );

    try {

        const { data } = await dyvApi.post('/sucursales/'+empresa.id, sucursal);
        
        // console.log( data );
        return { ok:true }
       
    } catch (error) {

        return { ok: false, message: error.response.data.msg}
        
    }

}


export default {
    cargarEmpresas,
    loadEmpresa,
    createEmpresa,
    updateEmpresa,
    loadSucursal,
    createSucursal,
    updateSucursal,
}