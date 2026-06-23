const api = axios.create({

    baseURL: 'http://localhost/backend-api/public'

})

api.interceptors.request.use(config => {

    const token = localStorage.getItem('token')

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`

    }

    return config

})

export default api