import AxiosApi from '@AxiosAPI'
import basePaths from '@basePaths'
import {LayoutName, LayoutsResponse} from '@apiModels/layouts'


export type LayoutsApiOptions = {
    token?: string | null
    locale?: string
    baseURL?: string
    target?: LayoutName
    query?: string
    data?: Record<string, any>
}

const api = new AxiosApi({basePath: basePaths.layouts})

function getLayoutsAPI<LayoutResponseType = any>() {
    return {
        getLayouts: ({baseURL, token, locale}: LayoutsApiOptions = {}) => api.getPromiseResponse<LayoutsResponse>({
            token,
            locale,
            baseURL,
            method: 'get',
            path: '/'
        }),
        getLayout: ({baseURL, target, token, query}: LayoutsApiOptions = {}) => api.getPromiseResponse<LayoutResponseType>({
            token,
            baseURL,
            method: 'get',
            path: `/${target}${query || ''}`
        }),
        putLayout: ({data, target, token, query}: LayoutsApiOptions) => api.getPromiseResponse<LayoutResponseType>({
            token,
            method: 'put',
            path: `/${target}${query || ''}`,
            data
        })
    }
}

export default getLayoutsAPI
