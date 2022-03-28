import { useAuthStore } from ".";
import authApi from "../../../api/authApi";

// export default {
    
//     async signInUser( user = {}) {

//         const authStore = useAuthStore()

//         try {
//             const { data } = await authApi.post('/auth/login', user )
//             // const { user } = data
//             console.log( data.user, authStore.status )
//             localStorage.setItem('idToken', data.idToken )
            
//             this.idToken = data.idToken
//             this.user = data.user
//             this.status = 'authenticated'

//             return { ok:true }
            
//         } catch (error) {
//             // console.log(error.response)
//             return { ok: false, message: error.response.data.msg }
//         }

//     },

//     async checkAuthentication() {

//         const idToken = localStorage.getItem('idToken')

//         if ( !idToken ) {
//             this.logout()
//             return { ok: false, message: 'No hay token' }
//         }
        
//         try {
            
//             const { data } = await authApi.post('/auth/validarjwt', { idToken }, { headers: {'x-token': idToken } }) 
            
//             const { usuario }  = data
      
//             this.user = usuario.nombre
//             this.idToken = idToken
//             this.status = 'authenticated'
            
//             // console.log( data.usuario );

//             return { ok: true, message: 'Si hay Token válido' }
            
//         } catch (error) {
//             this.logout()
//             // console.log( error.response); //si sale este errors es por que no hay un token válido
//             return { ok: false, message: 'Ha ocurrido un error' }
//         }
        
//     },
    
//     logout() {
//         this.idToken = null
//         this.user = null
//         this.status = 'not-autenticated'
//         this.$reset()

//         localStorage.removeItem('idToken');
//     }
    
// }


const signInUser = async( user = {} ) => {

    const authStore = useAuthStore()

    try {
        const { data } = await authApi.post('/auth/login', user )
        // const { user } = data
        // console.log( data.user, authStore.status )
        localStorage.setItem('idToken', data.idToken )
       
        authStore.idToken = data.idToken
        authStore.user = data.user
        authStore.status = 'authenticated'

        return { ok:true }

    } catch (error) {
        // console.log(error.response)
        return { ok: false, message: error.response.data.msg }
    }

}


const checkAuthentication = async() => {
    

        const idToken = localStorage.getItem('idToken')
        const authStore = useAuthStore()

        if ( !idToken ) {
            authStore.logout()
            return { ok: false, message: 'No hay token' }
        }

        try {

            // const { data } = await authApi.post('/auth/validarjwt', { idToken }, { headers: {'x-token': idToken } }) 
            const { data } = await authApi.post('/auth/validarjwt', { idToken }) 
            
            const { usuario }  = data
      
            authStore.user = usuario.nombre
            authStore.idToken = idToken
            authStore.status = 'authenticated'
            
            // console.log( data.usuario );

            return { ok: true, message: 'Si hay Token válido' }
            
        } catch (error) {
            authStore.logout()
            // console.log( error.response); //si sale este errors es por que no hay un token válido
            return { ok: false, message: 'Ha ocurrido un error' }
        }

}

const logout = () => {

    const authStore = useAuthStore()

    authStore.idToken = null
    authStore.user = null
    authStore.status = 'not-autenticated'
    authStore.$reset()

    localStorage.removeItem('idToken');
}


export default { 
    signInUser,
    checkAuthentication,
    logout
}