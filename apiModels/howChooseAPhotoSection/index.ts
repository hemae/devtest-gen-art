import {AdminData, Entity, ResponseData, UserData} from '@apiModels/common'


export type HowChooseAPhotoSectionItem = Entity<{
    src: string | null
    right: boolean | null
}>

export type HowChooseAPhotoSectionData = {
    title: string
    items: HowChooseAPhotoSectionItem[]
}

export type UserHowChooseAPhoto = UserData<HowChooseAPhotoSectionData>
export type AdminHowChooseAPhoto = AdminData<HowChooseAPhotoSectionData>

export type HowChooseAPhotoSection<DataType = UserHowChooseAPhoto> = Entity<{}, DataType>

export type HowChooseAPhotoSectionResponse<DataType = UserHowChooseAPhoto> = ResponseData<HowChooseAPhotoSection<DataType>>
export type HowChooseAPhotoSectionsResponse<DataType = UserHowChooseAPhoto> = ResponseData<HowChooseAPhotoSection<DataType>[]>
