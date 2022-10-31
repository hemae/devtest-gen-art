export type UniqueId = string
export type UniqueNum = number

export type Currency = string

export type Entity<Data, DataType = undefined> = {
    id: UniqueId
    order?: UniqueNum
    data: DataType
    createdAt: string
    updatedAt: string
} & Data

export type UserData<DataType> = DataType

export type AdminData<DataType> = Record<string, DataType>

export type ResponseData<DataType> = {data: DataType}
