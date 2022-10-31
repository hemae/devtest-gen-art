import {AdminData, Entity, UserData} from '@apiModels/common'

export type Language = Entity<{
    enabled: boolean
}, {
    locale: string
    title: string
}>

type AcceptLanguagesType = Language[]
export type UserAcceptLanguages = UserData<AcceptLanguagesType>
export type AdminAcceptLanguages = AdminData<AcceptLanguagesType>
export type AcceptLanguages<DataType = UserAcceptLanguages> = DataType
