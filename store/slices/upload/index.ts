import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {deleteImages, uploadImages} from './uploadThunkCreators'
import {ErrorType} from '@apiModels/error'


type UploadState = {
    isUploadLoading: boolean
    currentImageLinks: string[] | null
    notice: string
    error: ErrorType | null
    target: string | null
}

const initialState: UploadState = {
    isUploadLoading: false,
    currentImageLinks: null,
    notice: '',
    error: null,
    target: null
}

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        clearCurrentImageLinks(state: UploadState) {
            state.currentImageLinks = null
        },
        setError(state: UploadState, action: PayloadAction<ErrorType | null>) {
            state.error = action.payload
        },
        setNotice(state: UploadState, action: PayloadAction<string>) {
            state.notice = action.payload
        }
    },
    extraReducers: {
        [uploadImages.pending.type]: (state: UploadState) => {
            state.isUploadLoading = true
        },
        [uploadImages.fulfilled.type]: (state: UploadState, action: PayloadAction<{imageLinks: string[], target: string}>) => {
            state.error = null
            state.notice = 'Successfully uploaded'
            state.currentImageLinks = action.payload.imageLinks
            state.target = action.payload.target
            state.isUploadLoading = false
        },
        [uploadImages.rejected.type]: (state: UploadState, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = JSON.parse(action.payload) as ErrorType
            state.isUploadLoading = false
        },

        [deleteImages.pending.type]: (state: UploadState) => {
            state.isUploadLoading = true
        },
        [deleteImages.fulfilled.type]: (state: UploadState) => {
            state.error = null
            state.notice = 'Successfully deleted'
            state.isUploadLoading = false
        },
        [deleteImages.rejected.type]: (state: UploadState, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = JSON.parse(action.payload) as ErrorType
            state.isUploadLoading = false
        }
    }
})

export const clearCurrentImageLinks = uploadSlice.actions.clearCurrentImageLinks


export default uploadSlice.reducer
