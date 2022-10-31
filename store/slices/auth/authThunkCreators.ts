import {createAsyncThunk} from '@reduxjs/toolkit'
import {AuthPayload} from '../../API/authAPI/types'
import getAuthAPI from '../../API/authAPI'
import cookie from 'js-cookie'
import {getError, getRejectError} from '../../thunkHandlers'


export const signIn = createAsyncThunk(
    'signIn',
    async (options: {data: AuthPayload}, thunkAPI) => {
        try {
            const response = await getAuthAPI().signIn(options)
            cookie.set('jwt', response.data.data.token)
        } catch (e: any) {
            const error = getError(e)
            return getRejectError(thunkAPI, error)
        }
    }
)
