import axios from "axios";

const dyvApi = axios.create({

    baseURL: 'http://localhost:5000/api'

    // headers: { 
    //     'Content-Type': 'application/json',
    //     'x-token': localStorage.getItem('idToken')
    // }

})

// dyvApi.interceptors.request.use( (config) => {

//     config.headers = {
//         'x-token': localStorage.getItem('idToken'),
//     }

//     return config
// })

export default dyvApi