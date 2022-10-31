import {AdminData, UserData} from '@apiModels/common'


export type Social = {
    src: string
    content: string | null
}

type ContactsType = {
    email: string
    phoneNumber: string
    accessibility: string
    telegram: Social
    vk: string
    whatsApp: Social
}
export type UserContacts = UserData<ContactsType>
export type AdminContacts = AdminData<ContactsType>
export type Contacts<DataType = UserContacts> = DataType
