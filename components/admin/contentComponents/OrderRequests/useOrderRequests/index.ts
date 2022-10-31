import {useAppDispatch, useAppSelector} from '@store'
import {MouseEventHandler, useEffect} from 'react'
import {OrderRequest} from '@apiModels/orderRequest'
import {getOrderRequests} from '@slices/orderRequests/orderRequestsThunkCreators'


type Returned = {
    orderRequests: OrderRequest[]
}

export default function useOrderRequests(): Returned {

    const {orderRequests} = useAppSelector(state => state.orderRequestsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {}, [])

    useEffect(() => {
        dispatch(getOrderRequests())
    }, [])

    const switcherClick: MouseEventHandler = (): void => {

    }

    return {
        orderRequests
    }
}
