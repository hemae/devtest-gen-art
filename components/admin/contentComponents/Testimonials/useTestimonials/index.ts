import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import {Testimonial} from '@apiModels/testimonial'
import {getTestimonials} from '@slices/testimonials/testimonialsThunkCreators'


type Returned = {
    testimonials: Testimonial[]
}

export default function useTestimonials(): Returned {

    const {testimonials} = useAppSelector(state => state.testimonialsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTestimonials())
    }, [])

    return {
        testimonials
    }
}
