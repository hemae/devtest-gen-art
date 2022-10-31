import {ResponseData} from '@apiModels/common'
import {LayoutName, Layouts} from '@apiModels/layouts'
import getLayoutsAPI from '@API/getLayoutsAPI'


export async function getLayoutsHandler(locale?: string, token?: string | null): Promise<Layouts> {
    try {
        const response = await getLayoutsAPI<Layouts>().getLayouts({
            token,
            locale,
            //@ts-ignore
            baseURL: (!!token || token === null) && process.env.BACKEND_API,
        })

        response.data.data.acceptLanguages.data = response.data.data.acceptLanguages.data.filter(language => language.enabled)

        return response.data.data
    } catch (e) {
        throw e
    }
}

export type LayoutOptions = {
    target: LayoutName
    token?: string | null
    data?: Record<string, any>
}

// only for authorized
export async function getLayoutHandler<DataType>(options: LayoutOptions): Promise<DataType> {

    const {
        target,
        token
    } = options

    try {
        const response = await getLayoutsAPI<ResponseData<DataType>>().getLayout({
            token,
            target,
            query: '?full=true',
            //@ts-ignore
            baseURL: (!!token || token === null) && process.env.BACKEND_API,
        })
        return response.data.data
    } catch (e) {
        throw e
    }
}

// only for authorized
export async function putLayoutHandler<DataType>(options: LayoutOptions): Promise<DataType> {

    const {
        target,
        token,
        data
    } = options

    try {
        const response = await getLayoutsAPI<ResponseData<DataType>>().putLayout({
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
