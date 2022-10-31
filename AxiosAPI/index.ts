import axios, {AxiosInstance, AxiosResponse} from 'axios'


type ContentType = 'application/json' | 'multipart/form-data'

type Headers = {
    'Content-Type': ContentType
    'Cache-Control'?: string
    'cookie'?: string
}

type InstanceCreatorOptionsType = {
    baseURL?: string
    cacheControl?: string
    token?: string | null
    locale?: string
}

type GetPromiseAxiosResponseType = {
    basePath?: string
    baseURL?: string
    method: 'get' | 'post' | 'put' | 'delete'
    path?: string
    token?: string | null
    locale?: string
    data?: Record<string, any> | FormData
    notStringify?: boolean
    cacheControl?: string
}

type AxiosApiOptionsType = {
    basePath?: string
    baseURL?: string
    contentType?: ContentType
    notStringify?: boolean
    cacheControl?: string
}

class AxiosApi {

    readonly _basePath: string = ''
    readonly _contentType: ContentType = 'application/json'
    readonly _cacheControl: string | undefined
    readonly _baseURL: string = ''
    readonly _notStringify: boolean = false

    constructor(options?: AxiosApiOptionsType) {
        this._basePath = options?.basePath || ''
        this._baseURL = options?.baseURL || ''
        this._contentType = options?.contentType || 'application/json'
        this._cacheControl = options?.cacheControl || 'no-control'
        this._notStringify = !!options?.notStringify
    }

    public getPromiseResponse<ResponseType>(options: GetPromiseAxiosResponseType): Promise<AxiosResponse<ResponseType>> {

        const {
            baseURL,
            basePath,
            notStringify,
            cacheControl,
            token,
            locale,
            method,
            path = '/',
            data = {}
        } = options

        return method === 'get' || method === 'delete'
            ? this._instanceCreator({
                baseURL, cacheControl, token, locale
            })[method]<ResponseType>(`${process.env.API_VERSION}${this._basePath || basePath}${path}`)
            : this._instanceCreator({
                baseURL, cacheControl, token, locale
            })[method]<ResponseType>(`${process.env.API_VERSION}${this._basePath || basePath}${path}`, this._contentType === 'application/json' || this._notStringify || notStringify ? data : JSON.stringify(data))
    }

    _instanceCreator({baseURL, cacheControl, token, locale}: InstanceCreatorOptionsType): AxiosInstance {
        const headers: Headers = {'Content-Type': this._contentType}

        if (this._cacheControl || cacheControl) {
            headers['Cache-Control'] = this._cacheControl || cacheControl
        }

        let cookie = ''
        if (token) cookie += `jwt=${token}`
        if (locale) cookie += ` locale=${locale}`
        if (cookie) headers['cookie'] = cookie

        const options: {baseURL: string, headers: any} = {
            baseURL: baseURL || this._baseURL || '',
            headers
        }

        if (!!this._baseURL) options['baseURL'] = this._baseURL

        return axios.create(options)
    }
}


export default AxiosApi
