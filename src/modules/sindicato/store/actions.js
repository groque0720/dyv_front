import  { useSindicatoStore }  from ".";
import dyvApi from "../../../api/dyvApi";

const loadSindicatos = async() => {
    const sindicatoStore =  useSindicatoStore()
    try {
        const { data } = await dyvApi.get('/sindicatos');
        sindicatoStore.sindicatos = data;
        return { ok:true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}

const newSindicato = async()=>{
    const sindicatoStore =  useSindicatoStore()
    sindicatoStore.sindicato = {}
    return { ok:true }
}

const selectedSindicato = async ( idx ) => {
   const sindicatoStore =  useSindicatoStore()
   try {
        const { ...sindicato } = sindicatoStore.sindicatos[idx]
        sindicatoStore.sindicato = sindicato
        return { ok:true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
} 

const createSindicato = async () => {
    const sindicatoStore =  useSindicatoStore()

    try {
        const { sindicato } = sindicatoStore
        const { data } = await dyvApi.post('/sindicatos', sindicato )

        sindicatoStore.sindicato = data
        sindicatoStore.sindicato.categorias = []
        sindicatoStore.sindicatos.push( sindicatoStore.sindicato )

        return { ok:true }

    } catch (error) {

        return { ok: false, message: error.response.data.msg }

    }

}

const updateSindicato = async() => {
   const sindicatoStore =  useSindicatoStore()

    try {
        const { sindicato } = sindicatoStore
        const { data } = await dyvApi.put('/sindicatos/'+ sindicato.id, sindicato )
        const idx = sindicatoStore.sindicatos.findIndex( (sind) => {
            return sind.id == sindicato.id
        })
        sindicatoStore.sindicatos[idx] = data.sindicato

        return { ok:true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }
}


const newCategoria = async()=>{
    const sindicatoStore =  useSindicatoStore()
    sindicatoStore.categoria = {}
    return { ok:true }
}

const selectedCategoria = async ( idx ) => {
    const sindicatoStore =  useSindicatoStore()
    try {
        sindicatoStore.categoria = { ...sindicatoStore.sindicato.categorias[idx] }
         return { ok:true }
     } catch (error) {
         return { ok: false, message: error.response.data.msg }
     }
 }

const updateCategoria = async() => {

    const sindicatoStore = useSindicatoStore();
    
    const { sindicato, categoria } = sindicatoStore

    console.log(categoria);

    try {
        if (categoria.id) {

            const { data } = await dyvApi.put('/categorias/' + categoria.id, categoria )

            const idx = sindicato.categorias.findIndex( (cat) => {
                return cat.id == categoria.id
            })

            sindicatoStore.sindicato.categorias[idx] = categoria

        }else{

            const { data } = await dyvApi.post('/categorias/' + sindicato.id, categoria )
            sindicatoStore.categoria = data
            sindicatoStore.sindicato.categorias.push(sindicatoStore.categoria)

        }

        return { ok:true }
    } catch (error) {
        return { ok: false, message: error.response.data.msg }
    }




}




export default {
    loadSindicatos,
    selectedSindicato,
    newSindicato,
    createSindicato,
    updateSindicato,
    selectedCategoria,
    newCategoria,
    updateCategoria
}