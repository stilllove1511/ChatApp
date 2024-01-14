import { createSlice } from '@reduxjs/toolkit'
import STORAGES_CONFIG from '@configs/storage'

export interface AuthState {
    roles: any
    userId: number
    user: any
    is_loading: boolean
    token: string
}

export const initialState: AuthState = {
    userId: 0,
    user: {},
    token: localStorage.getItem(STORAGES_CONFIG.token) ?? '',
    roles: (() => {
        try {
            return JSON.parse(
                localStorage.getItem(STORAGES_CONFIG?.roles) ?? '[]'
            )
        } catch (error) {
            return []
        }
    })(),
    is_loading: false,
}

const Slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload.userId
            state.is_loading = false
        },
        setUser: (state, action) => {
            state.user = action.payload.user
            state.is_loading = false
        },
        setUserToken: (state, action) => {
            localStorage.setItem(STORAGES_CONFIG.token, action.payload.token)
            localStorage.setItem(
                STORAGES_CONFIG.roles,
                JSON.stringify(action.payload.roles ?? {})
            )
            localStorage.setItem(STORAGES_CONFIG.userID, action.payload.userId)
            state.userId = action.payload.userId
            state.token = action.payload.token
            state.roles = action.payload.roles
            state.is_loading = false
        },
        logout: (state) => {
            localStorage.clear()
            state.userId = 0
            state.user = {}
            state.token = ''
            state.is_loading = false
        },
    },
})

export const { setUser, setUserToken, logout } = Slice.actions

export default Slice.reducer
