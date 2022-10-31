import getAPI from '@API/getAPI'
import {BasePathsKeys} from '@basePaths'
import {UniqueId} from '@apiModels/common'
import {FullResponse} from '@apiModels/meta'


type Options = {
    entity: BasePathsKeys
    token?: string | null
    locale?: string
    query?: string
}

type GetsOptions = {
    isPagination?: boolean
    whole?: boolean
} & Options

type GetOptions  = {
    id: UniqueId
} & Options

type PostOptions = {
    data: Record<string, any>
} & Options

type PutOptions = {
    id: UniqueId
    data: Record<string, any>
} & Options

type DeleteOptions = {
    id: UniqueId
} & Options

const handlers = {
    async gets<Entity>(options: GetsOptions): Promise<Entity[] | FullResponse<Entity>> {

        const {
            entity,
            token,
            locale,
            query,
            isPagination,
            whole = false
        } = options

        try {
            if (!whole) {
                const response = await getAPI<Entity>(entity, token)
                    .getEntities({token, query, locale})
                return isPagination ? response.data as FullResponse<Entity> : response.data.data as Entity[]
            } else {
                let entities: Entity[] = []
                const firstResponse = await getAPI<Entity>(entity, token)
                    .getEntities({token, query, locale})
                entities = firstResponse.data.data
                for (let page = 2; page <= firstResponse.data.meta.pageCount; page++) {
                    const response = await getAPI<Entity>(entity, token)
                        .getEntities({
                            token,
                            query: (query || '') + (query ? '&' : '?') + `page=${page}&pageSize=${firstResponse.data.meta.pageSize}`,
                            locale
                        })
                    entities = entities.concat(response.data.data)
                }
                return entities
            }
        } catch (e) {
            throw e
        }
    },
    async get<Entity>(options: GetOptions): Promise<Entity> {

        const {
            id,
            entity,
            locale,
            token,
            query
        } = options

        try {
            const response = await getAPI<Entity>(entity, token)
                .getEntity({token, locale, id, query})
            return response.data.data
        } catch (e) {
            throw e
        }
    },
    async post<Entity>(options: PostOptions): Promise<Entity> {

        const {
            entity,
            token,
            data,
            query
        } = options

        try {
            const response = await getAPI<Entity>(entity, token)
                .postEntity({token, data, query})
            return response.data.data
        } catch (e) {
            throw e
        }
    },
    async put<Entity>(options: PutOptions): Promise<Entity> {

        const {
            id,
            entity,
            token,
            data,
            query
        } = options

        try {
            const response = await getAPI<Entity>(entity, token)
                .putEntity({token, id, data, query})
            return response.data.data
        } catch (e) {
            throw e
        }
    },
    async delete<Entity>(options: DeleteOptions): Promise<Entity> {

        const {
            id,
            entity,
            token,
            query
        } = options

        try {
            const response = await getAPI<Entity>(entity, token)
                .deleteEntity({token, id, query})
            return response.data.data
        } catch (e) {
            throw e
        }
    }
}

export default handlers
