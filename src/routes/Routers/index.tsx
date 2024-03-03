import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '@routes/PrivateRouter'
import {
    PERMISSION_DEFAULT,
    RESOURCE_DEFAULT,
    ROUTE_PATH,
} from '@utilities/enums'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import {
    CREATE_USER_PATH,
    DEFAULT_PATH,
    VIEW_USER_PATH,
    CREATE_VIDEO_DISTRIBUTION_PATH,
    VIEW_VIDEO_DISTRIBUTION_PATH,
    VIEW_PAYMENT_PATH,
} from '@routes/Routers/constant'
import Chat from '@pages/Chat'

const Routes = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const roles = auth?.roles ?? []
    const resource = roles?.resources ?? []

    let PrivatePages = DEFAULT_PATH
    if (resource) {
        resource.forEach(
            (resource: {
                resourceId: number
                resourceName: string
                resourceKey: string
                permissions: any
            }) => {
                if (
                    resource.resourceKey ===
                    RESOURCE_DEFAULT.USER_CMS_MANAGEMENT.key
                ) {
                    resource.permissions.forEach(
                        (permission: {
                            permissionId: number
                            permissionName: string
                            permissionKey: string
                        }) => {
                            if (
                                permission.permissionKey ===
                                PERMISSION_DEFAULT.CREATE.key
                            ) {
                                PrivatePages =
                                    PrivatePages.concat(CREATE_USER_PATH)
                            } else if (
                                permission.permissionKey ===
                                PERMISSION_DEFAULT.VIEW.key
                            ) {
                                PrivatePages =
                                    PrivatePages.concat(VIEW_USER_PATH)
                            }
                        }
                    )
                } else if (
                    resource.resourceKey === RESOURCE_DEFAULT.VIDEO.key
                ) {
                    resource.permissions.forEach(
                        (permission: {
                            permissionId: number
                            permissionName: string
                            permissionKey: string
                        }) => {
                            if (
                                permission.permissionKey ===
                                PERMISSION_DEFAULT.CREATE.key
                            ) {
                                PrivatePages = PrivatePages.concat(
                                    CREATE_VIDEO_DISTRIBUTION_PATH
                                )
                            } else if (
                                permission.permissionKey ===
                                PERMISSION_DEFAULT.VIEW.key
                            ) {
                                PrivatePages = PrivatePages.concat(
                                    VIEW_VIDEO_DISTRIBUTION_PATH
                                )
                            }
                        }
                    )
                } else if (
                    resource.resourceKey === RESOURCE_DEFAULT.PAYMENT.key
                ) {
                    resource.permissions.forEach(
                        (permission: {
                            permissionId: number
                            permissionName: string
                            permissionKey: string
                        }) => {
                            if (
                                permission.permissionKey ===
                                PERMISSION_DEFAULT.VIEW.key
                            ) {
                                PrivatePages =
                                    PrivatePages.concat(VIEW_PAYMENT_PATH)
                            }
                        }
                    )
                }
            }
        )
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="*">
                    <Chat />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
