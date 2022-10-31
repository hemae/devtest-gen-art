import {createAsyncThunk} from '@reduxjs/toolkit'
import {BasePathsKeys} from '@basePaths'
import {upperCase} from '@helpers/transformPathIntoPhrase'
import {defineUnauthorized, getError, getRejectError, unauthorized} from '../thunkHandlers'
import {UniqueId} from '@apiModels/common'
import handlers from '@requestHandlers/handlers'
import generateId from 'hans-id'
import getQuery from '@helpers/query'
import {setAlert} from '@slices/alert'


type Options = {
    isRussian?: boolean
    entity: BasePathsKeys
    query?: string
}

type ThunkOptions = {
    method: 'get' | 'post' | 'put' | 'delete'
    id?: UniqueId
    data?: Record<string, any>
}

export function getThunkGetEntities<Entity>(options: Options) {

    const {
        entity,
        query
    } = options

    return createAsyncThunk(
        `get${upperCase(entity)}`,
        async (_, thunkAPI) => {
            try {
                return await handlers.gets<Entity>({
                    entity,
                    query: (query ? query + '&' : '?') + 'full=true',
                    whole: true
                })
            } catch (e: any) {
                if (defineUnauthorized(e)) return unauthorized(thunkAPI)
                const error = getError(e)
                thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
                return getRejectError(thunkAPI, error)
            }
        }
    )
}

export function getThunkEntity<Entity>(options: Options) {

    const {
        isRussian = true,
        entity,
        query
    } = options

    return createAsyncThunk(
        `${generateId()}-${upperCase(entity)}`,
        async (thunkOptions: ThunkOptions, thunkAPI) => {

            const {
                method,
                id,
                data
            } = thunkOptions

            try {
                const item = await handlers[method]<Entity>({
                    entity,
                    //@ts-ignore
                    id,
                    query: (query ? query + '&' : '?') + 'full=true',
                    //@ts-ignore
                    data
                })
                let action = isRussian ? 'удалено' : 'deleted'
                if (method === 'put') action = isRussian ? 'обновлено' : 'updated'
                if (method === 'post') action = isRussian ? 'отправлено. Проверяется администратором :)' : 'created'
                const message = isRussian ? 'Успешно' : 'Successfully'
                if (method !== 'get') thunkAPI.dispatch(setAlert({message: `${message} ${action}`, type: 'notice'}))
                return {item: method !== 'delete' ? item : undefined, id: method !== 'get' ? id : undefined}
            } catch (e: any) {
                if (defineUnauthorized(e)) return unauthorized(thunkAPI)
                const error = getError(e)
                thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
                return getRejectError(thunkAPI, error)
            }
        }
    )
}

type GetThunksOptions = {
    entity: BasePathsKeys
}

export function getThunks<Entity>({entity}: GetThunksOptions) {

    const getThunkGetEntitiesHandler = getThunkGetEntities<Entity>({
        entity,
        query: getQuery({
            sort: 'asc:order'
        })
    })

    const getThunkEntityHandler = getThunkEntity({entity})

    return {
        getThunkGetEntities: getThunkGetEntitiesHandler,
        getThunkEntity: getThunkEntityHandler
    }
}
