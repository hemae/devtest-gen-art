import {AdminData, UserData} from '@apiModels/common'


type CookieMessageType = {
    cookieMessage: string
    acceptButtonTitle: string
}

export type UserCookieMessage = UserData<CookieMessageType>
export type AdminCookieMessage = AdminData<CookieMessageType>
export type CookieMessage<DataType = UserCookieMessage> = DataType
