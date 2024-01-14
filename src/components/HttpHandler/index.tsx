import { notification } from 'antd'
import { http } from '@utilities/http'
import STORAGES_CONFIG from '@configs/storage'
import { HTTP_STATUS_CODE } from '@utilities/enums'

const HttpHandler = () => {
    http.interceptors.response.use(
        (res) => {
            return res
        },
        (error: any) => {
            if (error?.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
                localStorage.removeItem(STORAGES_CONFIG.token)
                localStorage.removeItem(STORAGES_CONFIG.roles)
            }
            notification['error']({
                message:
                    error?.response?.data?.message ||
                    error?.response?.status ||
                    'Something went wrong',
            })
            return error.response
        }
    )

    return <></>
}

export default HttpHandler
