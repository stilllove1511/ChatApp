import { http } from '@utilities/http'
import STORAGES_CONFIG from '@configs/storage'
import { ENDPOINT_API } from '@utilities/enums'
import { httpAuth } from '@utilities/httpAuth'

export const BearerToken = () => {
    return `${localStorage.getItem(STORAGES_CONFIG.token)}`
}

const API = {
    login: (data: { id: string; password: string }) =>
        http.post(ENDPOINT_API.login, data),
    fetchDialogs: () => httpAuth.get(ENDPOINT_API.getAllDialog, {}),
    fetchMessages: ({
        dialogId,
        page,
        limit,
    }: {
        dialogId: string
        page: number
        limit: number
    }) =>
        httpAuth.get(`/dialog/${dialogId}/messages`, {
            params: {
                page: 1,
                limit: 10,
            },
        }),
}

export default API
