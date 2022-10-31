import {createAsyncThunk} from '@reduxjs/toolkit'
import {defineUnauthorized, getError, getRejectError, unauthorized} from '../../thunkHandlers'
import {getLayoutHandler, LayoutOptions, putLayoutHandler} from '@requestHandlers/layouts'
import {Language} from '@apiModels/layouts/acceptLanguages'
import {AdminHeader} from '@apiModels/layouts/header'
import {AdminFooter} from '@apiModels/layouts/footer'
import {AdminScripts} from '@apiModels/layouts/scripts'
import {AdminStyles} from '@apiModels/layouts/styles'
import {AdminCookieMessage} from '@apiModels/layouts/cookieMessage'
import {setAlert} from '@slices/alert'


export type LayoutActionPayload =
    Language[]
    | AdminHeader
    | AdminFooter
    | AdminScripts
    | AdminStyles
    | AdminCookieMessage

type LayoutThunkOptions = {
    apiMethod: (options: LayoutOptions) => Promise<LayoutActionPayload>
    options: LayoutOptions
}

export const layoutThunk = createAsyncThunk(
    'layout',
    async (options: LayoutThunkOptions & {method?: 'put'}, thunkAPI) => {
        try {
            const layout = await options.apiMethod(options.options)
            if (options.method === 'put') thunkAPI.dispatch(setAlert({message: 'Successfully updated', type: 'notice'}))
            return {layout, target: options.options.target}
        } catch (e) {
            if (defineUnauthorized(e)) return unauthorized(thunkAPI)
            const error = getError(e)
            thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
            return getRejectError(thunkAPI, error)
        }
    }
)

export const getLayout = (options: LayoutOptions) => layoutThunk({
    apiMethod: getLayoutHandler,
    options
})

export const putLayout = (options: LayoutOptions) => layoutThunk({
    apiMethod: putLayoutHandler,
    options,
    method: 'put'
})
