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
        page = 1,
        limit = 10,
    }: {
        dialogId: string
        page: number
        limit: number
    }) =>
        httpAuth.get(`/dialog/${dialogId}/messages`, {
            params: {
                page,
                limit,
            },
        }),

    searchUser: (data: { search: string }) =>
        httpAuth.get(ENDPOINT_API.searchUser, {
            params: {
                search: data.search,
            },
        }),
    createDialog: (data: { userIds: string[] }) =>
        httpAuth.post(ENDPOINT_API.createDialog, data),
    ask: (question: string) => {
        return http.post('ask', { question, topK: 10 })
    },
}

export default API
