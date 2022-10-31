import {AdminData, Entity, ResponseData, UserData} from '@apiModels/common'


export type PurchaseQuestionSectionData = {
    title: string
    description: string
}

export type UserPurchaseQuestion = UserData<PurchaseQuestionSectionData>
export type AdminPurchaseQuestion = AdminData<PurchaseQuestionSectionData>

export type PurchaseQuestionSection<DataType = UserPurchaseQuestion> = Entity<{}, DataType>

export type PurchaseQuestionSectionResponse<DataType = UserPurchaseQuestion> = ResponseData<PurchaseQuestionSection<DataType>>
export type PurchaseQuestionSectionsResponse<DataType = UserPurchaseQuestion> = ResponseData<PurchaseQuestionSection<DataType>[]>
