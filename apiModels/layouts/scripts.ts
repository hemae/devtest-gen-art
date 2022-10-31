import {AdminData, Entity, UserData} from '@apiModels/common'

export type Script = Entity<{
    script: string | null
    src: string | null
}>
export type ScriptsType = Script[]

export type UserScripts = UserData<ScriptsType>
export type AdminScripts = AdminData<ScriptsType>
export type Scripts<DataType = UserScripts> = DataType
