import axios from 'axios'
import { BearerToken } from '@configs/api'

export const httpAuth = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
    timeout: +process.env.REACT_APP_TIME_OUT,
    headers: {
        'Content-Type': 'application/json',
    },
})

httpAuth.interceptors.request.use(async (config) => {
    config.headers.Authorization = BearerToken()

    return config
})

httpAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        const { config, response } = error
        if (config && response && response.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
    }
)
