export enum ROUTE_PATH {
    home = '/',
    login = '/login',
    chat = '/chat',
}

export const RESOURCE_DEFAULT = {
    USER_MANAGEMENT: {
        name: 'User management',
        key: 'user_management',
    },
    USER_CMS_MANAGEMENT: {
        name: 'CMS user management',
        key: 'cms_user_management',
    },
    VIDEO: {
        name: 'Video Distribution',
        key: 'videoDistribution',
    },
    PAYMENT: {
        name: 'Payment',
        key: 'payment',
    },
}

export const PERMISSION_DEFAULT = {
    CREATE: {
        name: 'create',
        key: 'create',
    },
    UPDATE: {
        name: 'update',
        key: 'update',
    },
    DELETE: {
        name: 'delete',
        key: 'delete',
    },
    VIEW: {
        name: 'view',
        key: 'view',
    },
    PUBLISH: {
        name: 'publish',
        key: 'publish',
    },
}

export enum HTTP_STATUS_CODE {
    UNAUTHORIZED = 401,
}

export const HTTP_STATUS_CODE_MESSAGE = {
    [HTTP_STATUS_CODE.UNAUTHORIZED]: 'Unauthorized',
}

export enum ENDPOINT_API {
    login = '/account/login',
    getAllDialog = '/dialog/get_all',
}
