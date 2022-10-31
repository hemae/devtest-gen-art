import {Section, SectionTypes} from '@apiModels/sections'
import {FC} from 'react'

import {Carousel} from './Carousel'
import {GalleryComponent} from '@components/sections/Gallery'
import {PromoPicture} from '@apiModels/promoPicture'
import {Testimonial} from '@apiModels/testimonial'
import {QuestionAnswerComponent} from '@components/sections/AnswerQuestion'
import {FAQ} from '@apiModels/faq'
import {PromoComponent} from '@components/sections/Promo'
import {PromoButtonsComponent} from '@components/sections/PromoButtons'
import {OrderManualComponent} from '@components/sections/OrderManual'
import {Subheader} from './Subheader'
import {TestimonialsComponent} from '@components/sections/Testimonials'


export default {
    carousel: Carousel,
    gallery: GalleryComponent,
    testimonials: TestimonialsComponent,
    questionAnswer: QuestionAnswerComponent,
    promo: PromoComponent,
    promoButtons: PromoButtonsComponent,
    orderManual: OrderManualComponent,
    subheader: Subheader
} as Record<SectionTypes, FC<{
    section: Section<any>,
    promoPictures?: PromoPicture[],
    testimonials?: Testimonial[],
    faqs?: FAQ[]
}>>
