import AxiosApi from '@AxiosAPI'


export type DataApiOptionsType<DataType> = {
    baseURL?: string
    id?: string
    data?: {
        item: DataType
    }
}

const api = new AxiosApi()

const getDataAPI = (basePath: string) => ({
    getsData<ResponseDataType>({baseURL}: DataApiOptionsType<any> = {}) {
        return api.getPromiseResponse<ResponseDataType>({
            basePath,
            baseURL,
            method: 'get',
            path: '/'
        })
    },
    getData<ResponseDataType>({baseURL, id}: DataApiOptionsType<any>) {
        return () => api.getPromiseResponse<ResponseDataType>({
            basePath,
            baseURL,
            method: 'get',
            path: `/${id}`
        })
    },
    postData<ResponseDataType>({data}: DataApiOptionsType<any>) {
        return api.getPromiseResponse<ResponseDataType>({
            basePath,
            method: 'post',
            path: '/',
            data: data?.item
        })
    },
    putData<ResponseDataType>({id, data}: DataApiOptionsType<any>) {
        return api.getPromiseResponse<ResponseDataType>({
            basePath,
            method: 'put',
            path: `/${id}`,
            data: data?.item
        })
    },
    deleteData<ResponseDataType>({id}: DataApiOptionsType<any>) {
        return api.getPromiseResponse<ResponseDataType>({
            basePath,
            method: 'delete',
            path: `/${id}`
        })
    }
})

export default getDataAPI
