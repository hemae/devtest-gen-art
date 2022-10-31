import {FC} from 'react'
import useOrderRequests from '@admin/contentComponents/OrderRequests/useOrderRequests'
import {OrderRequestForm} from '@admin/OrderRequestForm'


export const OrderRequests: FC = () => {

    const {orderRequests} = useOrderRequests()

    return (
        <>
            {[...orderRequests].reverse().map(orderRequest => {
                return (
                    <OrderRequestForm
                        key={orderRequest.id}
                        orderRequest={orderRequest}
                    />
                )
            })}
        </>
    )
}
