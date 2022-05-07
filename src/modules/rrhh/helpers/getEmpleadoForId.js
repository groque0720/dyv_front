import { useRrhhStore } from "../store";

const getEmpleadoForId = ( id ) => {

    if (id == null) return '-'

    const rrhhStore = useRrhhStore()

    const { ok, message } = await rrhhStore.loadEmpleado(id);

    return { ok, message }
    

}

export default getEmpleadoForId