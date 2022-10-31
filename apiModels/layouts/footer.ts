import {AdminData, Entity, UserData} from '@apiModels/common'

export type SectionHeaderLink = Entity<{}, {
    title: string
    sectionId: string
}>

export type FooterLink = Entity<{
    title: string
    url: string | null
    scrollTo: string | null
}>

export type FooterContact = Entity<{
    type: 'whatsApp' | 'telegram' | 'vk' | 'email' | 'phoneNumber' | 'accessibility'
}>

type FooterType = {
    logoImage: string
    backgroundImage: string
    sectionHeaders: SectionHeaderLink[]
    links: FooterLink[]
    contacts: FooterContact[]
}
export type UserFooter = UserData<FooterType>
export type AdminFooter = AdminData<FooterType>
export type Footer<DataType = UserFooter> = DataType
