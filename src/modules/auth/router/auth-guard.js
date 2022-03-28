import { useAuthStore } from "../store"

const isAuthenticatedGuard = async( to, from, next ) => {

    const authStore = useAuthStore()

    const { ok } = await authStore.checkAuthentication();

    if ( ok ) next()
    else next({ name: 'Login' })

}

export default isAuthenticatedGuard