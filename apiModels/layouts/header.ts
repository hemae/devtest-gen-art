import {AdminData, Entity, UserData} from '@apiModels/common'

export type SectionHeaderLink = Entity<{}, {
    title: string
    sectionId: string
}>

export type HeaderLink = Entity<{
    title: string
    url: string | null
    scrollTo: string | null
}>

type HeaderType = {
    logoImage: string
    mainHeader: string
    sectionHeaders: SectionHeaderLink[]
    links: HeaderLink[]
}
export type UserHeader = UserData<HeaderType>
export type AdminHeader = AdminData<HeaderType>
export type Header<DataType = UserHeader> = DataType
