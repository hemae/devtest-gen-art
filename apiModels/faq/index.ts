import {AdminData, Entity, UserData, ResponseData, UniqueId} from '@apiModels/common'


export type FAQImage = {
    id: UniqueId
    src: string
}

export type FAQData = {
    title: string
    description: string
    images: FAQImage[]
}

export type UserFAQ = UserData<FAQData>
export type AdminFAQ = AdminData<FAQData>

export type FAQ<DataType = UserFAQ> = Entity<{
    publicVisible: boolean
}, DataType>

export type FAQResponse<DataType = UserFAQ> = ResponseData<FAQ<DataType>>
export type FAQsResponse<DataType = UserFAQ> = ResponseData<FAQ<DataType>[]>
