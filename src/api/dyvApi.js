import axios from "axios";

const dyvApi = axios.create({

    baseURL: import.meta.env.VITE_API_URL

    // headers: { 
    //     'Content-Type': 'application/json',
    //     'x-token': localStorage.getItem('idToken')
    // }

})

dyvApi.interceptors.request.use( (config) => {

    config.headers = {
        'x-token': localStorage.getItem('idToken'),
    }

    return config
})

export default dyvApi