import { http } from '@utilities/http'
import STORAGES_CONFIG from '@configs/storage'
import { ENDPOINT_API } from '@utilities/enums'

export const BearerToken = () => {
    return `Bearer ${localStorage.getItem(STORAGES_CONFIG.token)}`
}

const API = {
    login: (data: { id: string; password: string }) =>
        http.post(ENDPOINT_API.login, data),
}

export default API
