import {Entity} from '@apiModels/common'


export type UserTestimonialImage = Entity<{
    src: string
}>

export type Testimonial = Entity<{
    sender: string
    testimonial: string
    rate: number
    publicVisible: boolean
    images: UserTestimonialImage[]
}>
