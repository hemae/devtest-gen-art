import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LayoutActionPayload, layoutThunk} from './layoutsThunkCreators'
import {ErrorType} from '@apiModels/error'
import {Language} from '@apiModels/layouts/acceptLanguages'
import {AdminHeader} from '@apiModels/layouts/header'
import {AdminFooter} from '@apiModels/layouts/footer'
import {AdminScripts} from '@apiModels/layouts/scripts'
import {AdminStyles} from '@apiModels/layouts/styles'
import {AdminCookieMessage} from '@apiModels/layouts/cookieMessage'
import {LayoutName} from '@apiModels/layouts'


type LayoutsState = {
    isLayoutsLoading: boolean
    notice: string
    error: ErrorType | null

    acceptLanguages: Language[] | null
    header: AdminHeader | null,
    footer: AdminFooter | null,
    scripts: AdminScripts | null,
    styles: AdminStyles | null,
    cookieMessage: AdminCookieMessage | null,
}

const initialState: LayoutsState = {
    isLayoutsLoading: false,
    notice: '',
    error: null,

    acceptLanguages: null,
    header: null,
    footer: null,
    scripts: null,
    styles: null,
    cookieMessage: null
}

export const layoutsSlice = createSlice({
    name: 'layouts',
    initialState,
    reducers: {
        setError(state: LayoutsState, action: PayloadAction<ErrorType | null>) {
            state.error = action.payload
        },
        setNotice(state: LayoutsState, action: PayloadAction<string>) {
            state.notice = action.payload
        }
    },
    extraReducers: {
        [layoutThunk.pending.type]: (state: LayoutsState) => {
            state.isLayoutsLoading = true
        },
        [layoutThunk.fulfilled.type]: (state: LayoutsState, action: PayloadAction<{layout: LayoutActionPayload, target: LayoutName}>) => {
            state.error = null
            //@ts-ignore
            state[action.payload.target] = action.payload.layout
            state.isLayoutsLoading = false
        },
        [layoutThunk.rejected.type]: (state: LayoutsState, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = JSON.parse(action.payload) as ErrorType
            state.isLayoutsLoading = false
        }
    }
})


export default layoutsSlice.reducer
