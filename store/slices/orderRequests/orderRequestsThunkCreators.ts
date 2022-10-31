import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'
import {OrderRequest} from '@apiModels/orderRequest'


type OrderRequestsOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<OrderRequest>({entity: 'orderRequests'})

export const getOrderRequests = thunks.getThunkGetEntities

export const orderRequestThunk = thunks.getThunkEntity

export const addOrderRequest = (options: OrderRequestsOptions) => orderRequestThunk({
    ...options,
    method: 'post'
})

export const updateOrderRequest = (options: OrderRequestsOptions) => orderRequestThunk({
    ...options,
    method: 'put'
})

export const deleteOrderRequest = (options: OrderRequestsOptions) => orderRequestThunk({
    ...options,
    method: 'delete'
})
