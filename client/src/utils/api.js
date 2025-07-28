import axios from 'axios'

const instance=axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
        'Content-Type':'application/json'
    }
})

// Request: attach token
instance.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

//Response:handle unauthorized globally
instance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem('token');
            window.location.href='/login';//force redirect to login route
        }
        return Promise.reject(error);
    }
);

export default instance;