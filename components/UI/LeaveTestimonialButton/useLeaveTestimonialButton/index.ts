import {MouseEventHandler, useCallback} from 'react'
import {useAppDispatch} from '@store'
import {showPopUp} from '@slices/popUps'
import {TestimonialPopUp} from '@apiModels/sections/testimonials'


type Options = {
    popUpData: TestimonialPopUp
}

type Returned = {
    buttonClick: MouseEventHandler
}

export default function useLeaveTestimonialButton(options: Options): Returned {

    const {popUpData} = options

    const dispatch = useAppDispatch()

    const buttonClick: MouseEventHandler = useCallback((): void => {
        dispatch(showPopUp({
            renderingComponent: 'SendTestimonial',
            props: {popUpData}
        }))
    }, [])

    return {
        buttonClick
    }
}
