import {AdminData, Entity, ResponseData, UserData} from '@apiModels/common'


export type ContactsSectionItem = Entity<{
    label: string
    type: 'phoneNumber' | 'email' | 'vk' | 'telegram' | 'whatsApp' | null
}>

export type ContactsSectionData = {
    title: string
    items: ContactsSectionItem[]
}

export type UserContacts = UserData<ContactsSectionData>
export type AdminContacts = AdminData<ContactsSectionData>

export type ContactsSection<DataType = UserContacts> = Entity<{}, DataType>

export type ContactsSectionResponse<DataType = UserContacts> = ResponseData<ContactsSection<DataType>>
export type ContactsSectionsResponse<DataType = UserContacts> = ResponseData<ContactsSection<DataType>[]>
