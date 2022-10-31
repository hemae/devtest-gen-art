import {Entity} from '@apiModels/common'
import {PopUpField} from '@apiModels/sections'


export type PromoButtonAlign =
    'top'
    | 'center'
    | 'bottom'

export type PromoButton = Entity<{
    title: string
    description: string
    action: string
    align: PromoButtonAlign
}>

export type SendOrderRequestPopUp ={
    header: string
    firstName: PopUpField
    lastName: PopUpField
    middleName: PopUpField
    email: PopUpField
    phoneNumber: PopUpField
    additionalInfo: PopUpField
    addImages: PopUpField
    acceptPolicy: PopUpField
    submitButtonLabel: string
}

export type PromoButtons = {
    items: PromoButton[]
    popUpData: SendOrderRequestPopUp
    backgroundImage: string | null
}
