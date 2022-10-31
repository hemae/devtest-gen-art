import {Carousel} from '@apiModels/sections/carousel'
import {Gallery} from '@apiModels/sections/gallery'
import {AdminData, Entity, ResponseData, UserData} from '@apiModels/common'
import {Promo} from '@apiModels/sections/promo'
import {PromoButtons} from '@apiModels/sections/promoButtons'
import {QuestionAnswer} from '@apiModels/sections/questionAnswer'
import {Testimonials} from '@apiModels/sections/testimonials'
import {OrderManual} from '@apiModels/sections/orderManual'
import {Subheader} from '@apiModels/sections/subheader'


export type PopUpField = {
    label: string | null
    placeholder: string | null
    required: boolean
}

export type SectionTypes =
    'carousel'
    | 'gallery'
    | 'promo'
    | 'orderManual'
    | 'questionAnswer'
    | 'testimonials'
    | 'promoButtons'
    | 'editor'
    | 'subheader'

export type SectionType<SectionDataType> = {
    title: string | null
    bottomTitle?: string
    headerLinkTitle: string | null
    backgroundImage?: string | null
    expandingButtonTitle: string | null
    chooseButtonTitle?: string | null
    leaveTestimonial?: string | null,
    leaveTestimonialImage?: string | null,
    data: SectionDataType
}

export type SectionDataTypeList =
    Carousel
    | Gallery
    | Promo
    | PromoButtons
    | QuestionAnswer
    | Testimonials
    | OrderManual
    | Subheader

export type UserSectionData<SectionData> = UserData<SectionType<SectionData>>
export type AdminSectionData<SectionData> = AdminData<SectionType<SectionData>>

export type Section<DataType> = Entity<{
    type: SectionTypes
    publicVisible: boolean
    expandingButtonUrl?: string | null
}, DataType>

export type SectionResponse<DataType = UserSectionData<{}>> = ResponseData<Section<{}>>
export type SectionsResponse<DataType = UserSectionData<{}>> = ResponseData<Section<{}>[]>
