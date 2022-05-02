import { useEmpresaStore } from ".";
import dyvApi from "../../../api/dyvApi";
import { useRouter } from 'vue-router';



const loadEmpresas = async() => {
    const empresaStore = useEmpresaStore();
    try {
        const { data } = await dyvApi.get('/empresas');
        empresaStore.empresas = data;
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

// const loadEmpresa = async( id ) => {
//     const empresaStore = useEmpresaStore();
//     try {
//         const { data } = await dyvApi.get(`/empresas/${ id }`);
//         empresaStore.empresa = data;
//         return { ok: true }
//     } catch (error) {
//         return { ok: false, message: error.response.data.msg }
//     }
// }

const selectedEmpresa = ( idx ) => {
    const empresaStore = useEmpresaStore()
    empresaStore.empresa =  empresaStore.empresas[idx]
    return { ok: true  }
}

const loadEmpresa = async () => {
    try {

        const empresaStore = useEmpresaStore()

        if ( empresaStore.empresa.id != undefined ){
            const { data } = await dyvApi.get(`/empresas/${ empresaStore.empresa.id }`)
            empresaStore.empresa = data;
        } else {
            clearEmpresa()
        }

        return { ok: true, message: 'ok' }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }

}

const onChangeEmpresa = async( id ) => {
    const empresaStore = useEmpresaStore()
    const idx = empresaStore.empresas.findIndex( ( empresa ) => empresa.id == id )
    empresaStore.empresa = await empresaStore.empresas[idx]
    return { ok: true, message: 'ok' }
}


const createEmpresa = async() => {
    const empresaStore = useEmpresaStore()
    const { empresa } = empresaStore
    try {
        const { data } = await dyvApi.post('/empresas/', empresa )
        empresaStore.empresa = data;
        empresaStore.empresa.sucursales = [];
        empresaStore.empresa.areas = [];
        empresaStore.empresa.sindicatos = [];
        empresaStore.empresa.sectores = [];
        empresaStore.empresas.push(empresaStore.empresa);
        return  { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg}
    }
}


const updateEmpresa = async() => {
    const empresaStore = useEmpresaStore();
    const { empresa } = empresaStore;
    try {

        const { data } = await dyvApi.put('/empresas/' + empresa.id, empresa);
        
        const idx = empresaStore.empresas.findIndex( (emp) => {
            return emp.id == empresa.id
        })
        empresaStore.empresas[idx] = empresa;
        empresaStore.empresa = data.empresas

        return { ok:true }

    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

const clearEmpresa = async() => {
    const empresaStore = useEmpresaStore();
    try {
        empresaStore.empresa = {};
        console.log('limpia');
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}


// const loadSucursal= async( id ) => {
//     const empresaStore = useEmpresaStore();
//     try {
//         const { data } = await dyvApi.get(`/sucursales/sucursal/${ id }`);
//         empresaStore.sucursal = data;
//         return { ok: true }
//     } catch (error) {
//         return { ok: false, message: error.response.data.msg }
//     }
// }

const loadSucursal = ( idx ) => {
    const empresaStore = useEmpresaStore();
    const sucursal  = { ...empresaStore.empresa.sucursales[idx] };
    empresaStore.sucursal = sucursal;
    // console.log('cargado');
    return { ok: true  }
}


const clearSucursal = async() => {
    const empresaStore = useEmpresaStore();
    // limpiar variable state-sucursal

    try {
        empresaStore.sucursal = {};
        return { ok: true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

const createSucursal = async() => {
    const empresaStore = useEmpresaStore();
    const { empresa, sucursal } = empresaStore;
    try {
        // const { data } = await dyvApi.post('/sucursales/'+empresa.id, sucursal);
        empresaStore.sucursal.id =''
        empresaStore.sucursal.empresa_id = empresaStore.empresa.id
        empresaStore.empresa.sucursales.push(sucursal);
        return { ok:true }

    } catch (error) {
        return { ok: false, message: error.response.data.msg}
    }
}

const updateSucursal = async() => {
    const empresaStore = useEmpresaStore();
    const { sucursal } = empresaStore;
    let msg = '';

    try {

        // empresaStore.sucursal = sucursal

        // actulizó la empresa con sus sucursales en el store
        const idx_s = empresaStore.empresa.sucursales.findIndex( (suc) => {
            return suc.id == sucursal.id
        })

        empresaStore.empresa.sucursales[idx_s] = sucursal
        return { ok:true, msg }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

const clearSector = () => {
    const empresaStore = useEmpresaStore();
    empresaStore.sector = {};
    return { ok: true  }
}

const loadSector = (idx) => {

    const empresaStore = useEmpresaStore();
    const sector  = { ...empresaStore.empresa.sectores[idx] };
    empresaStore.sector = sector;
    return { ok: true  }
}

const createSector = () => {
    const empresaStore = useEmpresaStore()
    empresaStore.sector.id = ''
    empresaStore.sector.empresa_id = empresaStore.empresa.id
    empresaStore.empresa.sectores.unshift(empresaStore.sector)
    return { ok: true  }
}

const updateSector = async() => {
    const empresaStore = useEmpresaStore();
    const { sector } = empresaStore;
    let msg = '';

    try {

        const idx_s = empresaStore.empresa.sectores.findIndex( (sec) => {
            return sec.id == sector.id
        })
        empresaStore.empresa.sectores[idx_s] = sector

        return { ok:true, msg }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

const clearArea = () => {
    const empresaStore = useEmpresaStore();
    empresaStore.area = {};
    return { ok: true  }
}

const loadArea = (idx) => {

    const empresaStore = useEmpresaStore();
    const area  = { ...empresaStore.empresa.areas[idx] };
    empresaStore.area = area;
    return { ok: true  }
}

const createArea = () => {
    const empresaStore = useEmpresaStore()
    empresaStore.area.id = ''
    empresaStore.area.empresa_id = empresaStore.empresa.id
    empresaStore.empresa.areas.push(empresaStore.area)
    console.log( empresaStore.empresa.areas.sort((a, b) => a.area - b.area))
    return { ok: true  }
}

const updateArea = async() => {
    const empresaStore = useEmpresaStore();
    const { area } = empresaStore;
    let msg = '';

    try {

        const idx_s = empresaStore.empresa.areas.findIndex( (reg) => {
            return reg.id == area.id
        })
        empresaStore.empresa.areas[idx_s] = area

        console.log( empresaStore.empresa.areas.sort((a, b) => a.area > b.area))

        return { ok:true, msg }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}




const clearPuesto = () => {
    const empresaStore = useEmpresaStore();
    empresaStore.puesto = {};
    return { ok: true  }
}

const loadPuesto = (idx) => {

    const empresaStore = useEmpresaStore();
    const puesto  = { ...empresaStore.empresa.puestos[idx] };
    empresaStore.puesto = puesto;
    return { ok: true  }
}

const createPuesto = () => {
    const empresaStore = useEmpresaStore()
    empresaStore.puesto.id = ''
    empresaStore.puesto.empresa_id = empresaStore.empresa.id
    empresaStore.empresa.puestos.unshift(empresaStore.puesto)
    // console.log( empresaStore.empresa.puestos.sort((a, b) => a.area - b.area))
    return { ok: true  }
}

const updatePuesto = async() => {
    const empresaStore = useEmpresaStore();
    const { puesto } = empresaStore;
    let msg = '';

    try {

        const idx_s = empresaStore.empresa.puestos.findIndex( (reg) => {
            return reg.id == puesto.id
        })
        empresaStore.empresa.puestos[idx_s] = puesto

        console.log( empresaStore.empresa.puestos.sort((a, b) => a.puesto > b.puesto))

        return { ok:true, msg }
       
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}




export default {
    loadEmpresas,
    selectedEmpresa,
    loadEmpresa,
    onChangeEmpresa,
    createEmpresa,
    updateEmpresa,
    clearEmpresa,
    loadSucursal,
    createSucursal,
    updateSucursal,
    clearSucursal,
    clearSector,
    loadSector,
    createSector,
    updateSector,
    clearArea,
    loadArea,
    createArea,
    updateArea,
    clearPuesto,
    loadPuesto,
    createPuesto,
    updatePuesto
}