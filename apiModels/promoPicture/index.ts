import {AdminData, Currency, Entity, ResponseData, UserData} from '@apiModels/common'


export type Image = Entity<{
    image: string
}>

export type PromoType = {
    mainImage: string | null
    description: string
    currency: Currency
    price: number
    images: Image[]
}

export type UserPromoPicture = UserData<PromoType>
export type AdminPromoPicture = AdminData<PromoType>

export type PromoPicture<DataType = UserPromoPicture> = Entity<{
    promoId: string
    publicVisible: boolean
}, DataType>

export type PromoPictureResponse<DataType = UserPromoPicture> = ResponseData<PromoPicture<DataType>>
export type PromoPicturesResponse<DataType = UserPromoPicture> = ResponseData<PromoPicture<DataType>[]>
