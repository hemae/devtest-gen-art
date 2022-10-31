import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'
import {Testimonial} from '@apiModels/testimonial'


type TestimonialsOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<Testimonial>({entity: 'testimonials'})

export const getTestimonials = thunks.getThunkGetEntities

export const testimonialThunk = thunks.getThunkEntity

export const addTestimonial = (options: TestimonialsOptions) => testimonialThunk({
    ...options,
    method: 'post'
})

export const updateTestimonial = (options: TestimonialsOptions) => testimonialThunk({
    ...options,
    method: 'put'
})

export const deleteTestimonial = (options: TestimonialsOptions) => testimonialThunk({
    ...options,
    method: 'delete'
})
