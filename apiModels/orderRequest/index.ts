import {Entity, ResponseData, UniqueId} from '@apiModels/common'


export type OrderRequestImage = Entity<{
    src: string
}>

export type OrderRequest = Entity<{
    email: string
    phoneNumber: string
    firstName: string
    middleName: string | null
    lastName: string
    additionalInfo: string | null
    images: OrderRequestImage[] | null
    promoPictureId: UniqueId | null
    handled: boolean
}>

export type OrderRequestResponse = ResponseData<OrderRequest>
export type OrderRequestsResponse = ResponseData<OrderRequest[]>
