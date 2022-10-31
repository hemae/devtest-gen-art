import AxiosApi from '@AxiosAPI'
import {AuthPayload} from './types'


export type AuthResponse = {data: {token: string}}

export type AuthApiOptions = {
    baseURL?: string
    data: AuthPayload
}

const api = new AxiosApi({
    basePath: '/admin-auth'
})

const getAuthAPI = () => ({
    signIn({data}: AuthApiOptions) {
        return api.getPromiseResponse<AuthResponse>({
            method: 'post',
            path: `?code=${data.code}`,
            data: data.data
        })
    }
})

export default getAuthAPI
