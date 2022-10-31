import AxiosApi from '@AxiosAPI'
import {PageName, PageResponse, StringResourcesResponse} from '@apiModels/stringResources'
import basePaths from '@basePaths'


export type StringResourcesApiOptions = {
    token?: string | null
    locale?: string
    query?: string
    baseURL?: string
    target?: PageName
    data?: Record<string, any>
}

const api = new AxiosApi({basePath: basePaths.stringResources})

function getStringResourcesAPI<PageResponseType = PageResponse>() {
    return {
        getsStringResources: ({baseURL, token, locale}: StringResourcesApiOptions = {}) => api.getPromiseResponse<StringResourcesResponse>({
            token,
            locale,
            baseURL,
            method: 'get',
            path: '/'
        }),
        getStringResources: ({baseURL, target, token, locale, query}: StringResourcesApiOptions = {}) => api.getPromiseResponse<PageResponseType>({
            token,
            locale,
            baseURL,
            method: 'get',
            path: `/${target}${query || ''}`
        }),
        putStringResources: ({data, target, token, query}: StringResourcesApiOptions) => api.getPromiseResponse<PageResponseType>({
            token,
            method: 'put',
            path: `/${target}${query || ''}`,
            data
        })
    }
}

export default getStringResourcesAPI
