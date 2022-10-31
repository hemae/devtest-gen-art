import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StringResourcesActionPayload, stringResourcesThunk} from './stringResourcesThunkCreators'
import {ErrorType} from '@apiModels/error'
import {
    AdminContactsPage,
    AdminFAQPage,
    AdminHowChooseAPhotoPage,
    AdminMainPage, AdminOrderRegistrationPage, AdminPurchaseQuestionsPage, AdminTermsAndConditionsPage,
    PageName
} from '@apiModels/stringResources'


type StringResourcesState = {
    isStringResourcesLoading: boolean
    notice: string
    error: ErrorType | null

    main: AdminMainPage | null
    contacts: AdminContactsPage | null
    faq: AdminFAQPage | null
    'how-choose-a-photo': AdminHowChooseAPhotoPage | null
    'order-registration': AdminOrderRegistrationPage | null
    'purchase-questions': AdminPurchaseQuestionsPage | null
    'terms-and-conditions': AdminTermsAndConditionsPage | null
}

const initialState: StringResourcesState = {
    isStringResourcesLoading: false,
    notice: '',
    error: null,

    main: null,
    contacts: null,
    faq: null,
    'how-choose-a-photo': null,
    'order-registration': null,
    'purchase-questions': null,
    'terms-and-conditions': null,
}

export const layoutsSlice = createSlice({
    name: 'layouts',
    initialState,
    reducers: {
        setError(state: StringResourcesState, action: PayloadAction<ErrorType | null>) {
            state.error = action.payload
        },
        setNotice(state: StringResourcesState, action: PayloadAction<string>) {
            state.notice = action.payload
        }
    },
    extraReducers: {
        [stringResourcesThunk.pending.type]: (state: StringResourcesState) => {
            state.isStringResourcesLoading = true
        },
        [stringResourcesThunk.fulfilled.type]: (state: StringResourcesState, action: PayloadAction<{stringResources: StringResourcesActionPayload, target: PageName}>) => {
            state.error = null
            //@ts-ignore
            state[action.payload.target] = action.payload.layout
            state.isStringResourcesLoading = false
        },
        [stringResourcesThunk.rejected.type]: (state: StringResourcesState, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = JSON.parse(action.payload) as ErrorType
            state.isStringResourcesLoading = false
        }
    }
})


export default layoutsSlice.reducer
