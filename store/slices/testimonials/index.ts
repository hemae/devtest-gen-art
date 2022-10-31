import {Reducer} from '@reduxjs/toolkit'
import getSlice, {EntitiesState} from '@slices/getSlice'
import {Testimonial} from '@apiModels/testimonial'
import {getTestimonials, testimonialThunk} from '@slices/testimonials/testimonialsThunkCreators'


export const testimonialsSlice = getSlice<Testimonial>({
    entity: 'testimonials',
    getEntities: getTestimonials,
    entityThunk: testimonialThunk
})

export default testimonialsSlice.reducer as Reducer<EntitiesState<Testimonial>, any>
