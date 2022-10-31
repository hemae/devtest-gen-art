import {Reducer} from '@reduxjs/toolkit'
import getSlice, {EntitiesState} from '@slices/getSlice'
import {OrderRequest} from '@apiModels/orderRequest'
import {getOrderRequests, orderRequestThunk} from '@slices/orderRequests/orderRequestsThunkCreators'


export const orderRequestsSlice = getSlice<OrderRequest>({
    entity: 'orderRequests',
    getEntities: getOrderRequests,
    entityThunk: orderRequestThunk
})

export default orderRequestsSlice.reducer as Reducer<EntitiesState<OrderRequest>, any>
