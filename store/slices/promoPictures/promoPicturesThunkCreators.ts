import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'
import {PromoPicture} from '@apiModels/promoPicture'


type PromoPicturesOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<PromoPicture>({entity: 'promoPictures'})

export const getPromoPictures = thunks.getThunkGetEntities

export const promoPictureThunk = thunks.getThunkEntity

export const getPromoPicture = (options: PromoPicturesOptions) => promoPictureThunk({
    ...options,
    method: 'get'
})

export const addPromoPicture = (options: PromoPicturesOptions) => promoPictureThunk({
    ...options,
    method: 'post'
})

export const updatePromoPicture = (options: PromoPicturesOptions) => promoPictureThunk({
    ...options,
    method: 'put'
})

export const deletePromoPicture = (options: PromoPicturesOptions) => promoPictureThunk({
    ...options,
    method: 'delete'
})
