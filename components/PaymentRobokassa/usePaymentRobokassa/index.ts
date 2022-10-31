import {MouseEventHandler} from 'react'
import getRobokassaLink from '@robokassa'
import {PromoPicture} from '@apiModels/promoPicture'


type Options = {
    deliveryCost: number
    promoPicture: PromoPicture
    userData: {
        email: string
        phoneNumber: string
        firstName: string
        lastName?: string
        middleName?: string
    }
}

type Returned = {
    payClick: MouseEventHandler
}

export default function usePaymentRobokassa(options: Options): Returned {

    const {
        deliveryCost,
        promoPicture,
        userData
    } = options

    const payClick: MouseEventHandler = () => {
        location.href = getRobokassaLink({
            pictureData: {
                promoPictureId: promoPicture.id,
                pictureDescription: promoPicture.data.description,
                price: promoPicture.data.price + deliveryCost
            },
            userData
        })
    }

    return {
        payClick
    }
}
