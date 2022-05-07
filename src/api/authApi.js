import axios from "axios";


const authApi = axios.create({

    baseURL: import.meta.env.VITE_API_URL

    // el pepe
 
    // headers: { 
    //     'Content-Type': 'application/json',
    //     'x-token': localStorage.getItem('idToken')
    // }

})

authApi.interceptors.request.use( (config) => {

    config.headers = {
        'x-token': localStorage.getItem('idToken'),
    }

    return config
})

export default authApi