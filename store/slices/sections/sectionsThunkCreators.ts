import {Section} from '@apiModels/sections'
import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'


type SectionsOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<Section<{}>>({entity: 'sections'})

export const getSections = thunks.getThunkGetEntities

export const sectionThunk = thunks.getThunkEntity

export const addSection = (options: SectionsOptions) => sectionThunk({
    ...options,
    method: 'post'
})

export const updateSection = (options: SectionsOptions) => sectionThunk({
    ...options,
    method: 'put'
})

export const deleteSection = (options: SectionsOptions) => sectionThunk({
    ...options,
    method: 'delete'
})
