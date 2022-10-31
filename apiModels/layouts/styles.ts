import {AdminData, Entity, UserData} from '@apiModels/common'

type StylesType = {}
export type UserStyles = UserData<StylesType>
export type AdminStyles = AdminData<StylesType>
export type Styles<DataType = UserStyles> = Entity<{}, DataType>
