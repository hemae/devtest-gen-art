import {PageName, StringResources, UserPage} from '@apiModels/stringResources'
import getStringResourcesAPI from '@API/getStringResourcesAPI'
import {ResponseData} from '@apiModels/common'


// only for authorized
export async function getAllStringResourcesHandler(locale?: string, token?: string | null): Promise<StringResources> {
    try {
        const response = await getStringResourcesAPI().getsStringResources({
            token,
            locale,
            //@ts-ignore
            baseURL: (!!token || token === null) && process.env.BACKEND_API,
        })
        return response.data.data
    } catch (e) {
        throw e
    }
}

export type StringResourcesOptions = {
    target: PageName
    locale?: string
    token?: string | null
    data?: Record<string, any>
    isAdmin?: boolean
}

export async function getStringResourcesHandler<DataType = UserPage>(options: StringResourcesOptions): Promise<DataType> {

    const {
        token,
        locale,
        target,
        isAdmin = false
    } = options

    try {
        const response = await getStringResourcesAPI<ResponseData<DataType>>().getStringResources({
            //@ts-ignore
            baseURL: (!!token || token === null) && process.env.BACKEND_API,
            token,
            locale,
            target,
            query: isAdmin ? '?full=true' : '',
        })
        return response.data.data
    } catch (e) {
        throw e
    }
}

// only for authorized
export async function putStringResourcesHandler<DataType = UserPage>(options: StringResourcesOptions): Promise<DataType> {

    const {
        token,
        target,
        data
    } = options

    try {
        const response = await getStringResourcesAPI<ResponseData<DataType>>().putStringResources({
            token,
            target,
            data,
            query: '?full=true',
            //@ts-ignore
            baseURL: (!!token || token === null) && process.env.BACKEND_API,
        })
        return response.data.data
    } catch (e) {
        throw e
    }
}
