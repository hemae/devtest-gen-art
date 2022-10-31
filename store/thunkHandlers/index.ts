import {setUnauthorized} from '@slices/auth'
import {ErrorType} from '@apiModels/error'


export function defineUnauthorized(e: any) {
    return e.response.status === 401
}

export function unauthorized(thunkAPI: any) {
    console.log('un')
    thunkAPI.dispatch(setUnauthorized(true))
}

export function getError(e: any): ErrorType {
    return {
        status: e.response.status,
        message: e.response.data.message
    }
}

export function getRejectError(thunkAPI: any, e: ErrorType) {
    return thunkAPI.rejectWithValue(JSON.stringify(getError(e)))
}
