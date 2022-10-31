import {BasePathsKeys} from '@basePaths'
import {upperCase} from '@helpers/transformPathIntoPhrase'
import {ErrorType} from '@apiModels/error'
import {AsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UniqueId} from '@apiModels/common'


export type EntitiesState<Entity extends {id: UniqueId}> = {
    [entities in BasePathsKeys]: Entity[]
} & {
    error: ErrorType | null
    notice: string
} & {
    [isLoading: string]: boolean
}

export function getInitialState<Entity extends {id: UniqueId}>(entity: BasePathsKeys) {
    return {
        error: null,
        notice: '',
        [`is${upperCase(entity)}Loading`]: false,
        [entity]: [] as Entity[]
    } as EntitiesState<Entity>
}


type Options = {
    entity: BasePathsKeys
    getEntities: AsyncThunk<any, any, any>
    entityThunk: AsyncThunk<any, any, any>
}

export default function getSlice<Entity extends {id: UniqueId}>(options: Options) {

    const {
        entity,
        getEntities,
        entityThunk
    } = options

    return createSlice({
        name: entity,
        initialState: getInitialState<Entity>(entity),
        reducers: {
            //@ts-ignore
            setError(state: EntitiesState<Entity>, action: PayloadAction<ErrorType | null>) {
                state.error = action.payload
            },
            //@ts-ignore
            setNotice(state: EntitiesState<Entity>, action: PayloadAction<string>) {
                state.notice = action.payload
            }
        },

        //@ts-ignore
        extraReducers: {
            [getEntities.pending.type]: (state: EntitiesState<Entity>) => {
                state[`is${upperCase(entity)}Loading`] = true
            },
            [getEntities.fulfilled.type]: (state: EntitiesState<Entity>, action: PayloadAction<Entity[]>) => {
                state.error = null
                state[entity] = action.payload
                state[`is${upperCase(entity)}Loading`] = false
            },

            [getEntities.rejected.type]: (state: EntitiesState<Entity>, action: PayloadAction<string>) => {
                state.notice = ''
                state.error = JSON.parse(action.payload) as ErrorType
                state[`is${upperCase(entity)}Loading`] = false
            },

            [entityThunk.pending.type]: (state: EntitiesState<Entity>) => {
                state[`is${upperCase(entity)}Loading`] = true
            },
            [entityThunk.fulfilled.type]: (state: EntitiesState<Entity>, action: PayloadAction<{item?: Entity, id?: UniqueId}>) => {
                state.error = null

                const {
                    item, id
                } = action.payload

                if (!!item && !!id) state[entity] = state[entity].map(entityItem => entityItem.id === id ? item : entityItem)
                else if (!!item && !id) state[entity].push(item)
                else if (!item && !!id) state[entity] = state[entity].filter(entityItem => entityItem.id !== id)

                state[`is${upperCase(entity)}Loading`] = false
            },

            [entityThunk.rejected.type]: (state: EntitiesState<Entity>, action: PayloadAction<string>) => {
                state.notice = ''
                state.error = JSON.parse(action.payload) as ErrorType
                state[`is${upperCase(entity)}Loading`] = false
            }
        }
    })
}
