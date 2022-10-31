import {createAsyncThunk} from '@reduxjs/toolkit'
import getUploadAPI, {UploadApiOptions} from '../../API/uploadAPI'
import {defineUnauthorized, getError, getRejectError, unauthorized} from '../../thunkHandlers'
import {setAlert} from '@slices/alert'


export const uploadImages = createAsyncThunk(
    'uploadImage',
    async (payload: UploadApiOptions, thunkAPI) => {
        try {
            const response = await getUploadAPI().upload(payload)
            const message = payload.isRussian ? 'Успешно загружено' : 'Successfully uploaded'
            thunkAPI.dispatch(setAlert({message, type: 'notice'}))
            return {imageLinks: response.data.data.imageLinks, target: payload.target}
        } catch (e: any) {
            const error = getError(e)
            thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
            return getRejectError(thunkAPI, error)
        }
    }
)

export const deleteImages = createAsyncThunk(
    'deleteImages',
    async (payload: UploadApiOptions, thunkAPI) => {
        try {
            await getUploadAPI().deleteImage(payload)
            const message = payload.isRussian ? 'Успешно удалено' : 'Successfully deleted'
            thunkAPI.dispatch(setAlert({message, type: 'notice'}))
        } catch (e: any) {
            if (defineUnauthorized(e)) return unauthorized(thunkAPI)
            const error = getError(e)
            thunkAPI.dispatch(setAlert({message: error.message, type: 'error'}))
            return getRejectError(thunkAPI, error)
        }
    }
)

