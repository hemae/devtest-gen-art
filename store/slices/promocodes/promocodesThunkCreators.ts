import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'
import {Promocode} from '@apiModels/promocode'


type PromocodesOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<Promocode>({entity: 'promocodes'})

export const getPromocodes = thunks.getThunkGetEntities

export const promocodeThunk = thunks.getThunkEntity

export const addPromocode = (options: PromocodesOptions) => promocodeThunk({
    ...options,
    method: 'post'
})

export const updatePromocode = (options: PromocodesOptions) => promocodeThunk({
    ...options,
    method: 'put'
})

export const deletePromocode = (options: PromocodesOptions) => promocodeThunk({
    ...options,
    method: 'delete'
})
