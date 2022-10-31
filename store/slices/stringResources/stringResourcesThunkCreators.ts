import {createAsyncThunk} from '@reduxjs/toolkit'
import {defineUnauthorized, getError, getRejectError, unauthorized} from '../../thunkHandlers'
import {
    AdminContactsPage,
    AdminFAQPage,
    AdminHowChooseAPhotoPage,
    AdminMainPage,
    AdminOrderRegistrationPage, AdminPurchaseQuestionsPage, AdminTermsAndConditionsPage
} from '@apiModels/stringResources'
import {
    getStringResourcesHandler,
    putStringResourcesHandler,
    StringResourcesOptions
} from '@requestHandlers/stringResources'
import {setAlert} from '@slices/alert'


export type StringResourcesActionPayload =
    AdminMainPage
    | AdminContactsPage
    | AdminFAQPage
    | AdminHowChooseAPhotoPage
    | AdminOrderRegistrationPage
    | AdminPurchaseQuestionsPage
    | AdminTermsAndConditionsPage

type StringResourcesThunkOptions = {
    apiMethod: (options: StringResourcesOptions) => Promise<StringResourcesActionPayload>
    options: StringResourcesOptions
}

export const stringResourcesThunk = createAsyncThunk(
    'stringResources',
    async (options: StringResourcesThunkOptions & {method?: 'put'}, thunkAPI) => {
        try {
            const stringResources = await options.apiMethod(options.options)
            if (options.method === 'put') thunkAPI.dispatch(setAlert({message: 'Successfully updated', type: 'notice'}))
            return {stringResources, target: options.options.target}
        } catch (e) {
            if (defineUnauthorized(e)) return unauthorized(thunkAPI)
            const error = getError(e)
            thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
            return getRejectError(thunkAPI, error)
        }
    }
)

export const getStringResources = (options: StringResourcesOptions) => stringResourcesThunk({
    apiMethod: getStringResourcesHandler,
    options
})

export const putStringResources = (options: StringResourcesOptions) => stringResourcesThunk({
    apiMethod: putStringResourcesHandler,
    options,
    method: 'put'
})
