import { useRrhhStore } from ".";
import dyvApi from "../../../api/dyvApi";


const cargarEmpresas = async() => {

    // const rrhhStore = useRrhhStore();

    const rrhhStore = useRrhhStore();

    try {

        const { data } = await dyvApi.get('/empresas');

        rrhhStore.empresas = data;

        console.log(data);

        // return { ok: true, message: 'Si hay Token válido' }
        
    } catch (error) {

        return { ok: false, message: 'Ha ocurrido un error' }
        
    }


}


export default {
    cargarEmpresas,
}