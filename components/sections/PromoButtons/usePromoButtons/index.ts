import {MouseEventHandler, useCallback} from 'react'
import {useAppDispatch} from '@store'
import {showPopUp} from '@slices/popUps'
import {SendOrderRequestPopUp} from '@apiModels/sections/promoButtons'


type Options = {
    popUpData: SendOrderRequestPopUp
}

type Returned = {
    openOrderRequestPopup: MouseEventHandler
}

export default function usePromoButtons(options: Options): Returned {

    const {
        popUpData
    } = options

    const dispatch = useAppDispatch()

    const openOrderRequestPopup: MouseEventHandler = useCallback((): void => {
        dispatch(showPopUp({
            renderingComponent: 'SendOrderRequest',
            props: {popUpData}
        }))
    }, [popUpData])

    return {
        openOrderRequestPopup
    }
}
