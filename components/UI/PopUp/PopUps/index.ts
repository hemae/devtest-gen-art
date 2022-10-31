import {SendTestimonial} from './SendTestimonial'
import {SendOrderRequest} from './SendOrderRequest'
import {FC} from 'react'


export type PopUpType =
    'SendTestimonial'
    | 'SendOrderRequest'

export default {
    SendTestimonial,
    SendOrderRequest
} as Record<PopUpType, FC>
