import AxiosApi from '@AxiosAPI'
import {UploadPayload} from './types'


export type UploadResponse = {data: {imageLinks: string[]}}

export type UploadApiOptions = {
    isRussian?: boolean
    data: UploadPayload
    chunkName: string
    target?: string
}

const apiApplication = new AxiosApi({
    basePath: '/upload',
    contentType: 'application/json'
})

const api = new AxiosApi({
    basePath: '/upload'
})

const getUploadAPI = () => ({
    upload({data, chunkName}: UploadApiOptions) {
        const formData = new FormData()
        data.files!.forEach(file => formData.append(`images`, file))
        return apiApplication.getPromiseResponse<UploadResponse>({
            method: 'post',
            path: `/${chunkName}`,
            data: formData
        })
    },
    deleteImage({data, chunkName}: UploadApiOptions) {
        return api.getPromiseResponse<{message: string}>({
            method: 'post',
            path: `/delete/${chunkName}`,
            data
        })
    }
})

export default getUploadAPI
