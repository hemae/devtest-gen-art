import AxiosApi from '@AxiosAPI'
import {BasePaths} from '@basePaths'
import {FullResponse} from '@apiModels/meta'
import {UniqueId} from '@apiModels/common'


export type EntityResponsePayload<Entity> = Entity

export type EntityApiOptionsType = {
    basePath?: BasePaths
    id?: UniqueId
    token?: string | null
    locale?: string
    query?: string
    data?: Record<string, any>
}

const api = new AxiosApi()

type Options = {
    basePath?: BasePaths
    baseURL?: string
    notStringify?: boolean
    cacheControl?: string
}

function entityAPI<Entity, Data = {data: Record<string, any>}>({basePath, baseURL, notStringify, cacheControl}: Options = {}) {
    return {
        getEntities({query, locale, token}: EntityApiOptionsType = {}) {
            return api.getPromiseResponse<EntityResponsePayload<FullResponse<Entity>>>({
                baseURL,
                basePath,
                token,
                locale,
                path: query || '',
                method: 'get'
            })
        },
        getEntity({query, id, token, locale}: EntityApiOptionsType = {}) {
            return api.getPromiseResponse<EntityResponsePayload<{data: Entity}>>({
                baseURL,
                basePath,
                token,
                locale,
                path: `/${id}${query || ''}`,
                method: 'get'
            })
        },
        postEntity({data, query, token}: EntityApiOptionsType) {
            return api.getPromiseResponse<EntityResponsePayload<{data: Entity}>>({
                notStringify,
                cacheControl,
                baseURL,
                basePath,
                token,
                path: query || '',
                method: 'post',
                data
            })
        },
        putEntity({id, data, query, token}: EntityApiOptionsType) {
            return api.getPromiseResponse<EntityResponsePayload<{data: Entity}>>({
                baseURL,
                basePath,
                token,
                path: `/${id}${query || ''}`,
                method: 'put',
                data
            })
        },
        deleteEntity({id, token}: EntityApiOptionsType) {
            return api.getPromiseResponse<EntityResponsePayload<{data: Entity}>>({
                baseURL,
                basePath,
                token,
                path: `/${id}`,
                method: 'delete'
            })
        }
    }
}

export default entityAPI
