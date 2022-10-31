import {PopUpField} from '@apiModels/sections'


export type TestimonialPopUp = {
    header: string
    rate: PopUpField
    email: PopUpField
    name: PopUpField
    testimonial: PopUpField
    addImages: PopUpField
    acceptPolicy: PopUpField
    submitButtonLabel: string
}

export type Testimonials = {
    popUpData: TestimonialPopUp
}
