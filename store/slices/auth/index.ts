import {createSlice, PayloadAction, Reducer} from '@reduxjs/toolkit'
import {ErrorType} from '@apiModels/error'
import {signIn} from '@slices/auth/authThunkCreators'
import cookie from 'js-cookie'


type AuthState = {
    isAuthLoading: boolean
    becameUnauthorized: boolean
    error: ErrorType | null
    notice: string
}

const initialState: AuthState = {
    isAuthLoading: false,
    becameUnauthorized: false,
    error: null,
    notice: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError(state: AuthState, action: PayloadAction<ErrorType | null>) {
            state.error = action.payload
        },
        setNotice(state: AuthState, action: PayloadAction<string>) {
            state.notice = action.payload
        },
        setUnauthorized(state: AuthState, action: PayloadAction<boolean>) {
            state.becameUnauthorized = action.payload
            cookie.remove('jwt')
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state: AuthState) => {
            state.isAuthLoading = true
        },
        [signIn.fulfilled.type]: (state: AuthState) => {
            state.error = null
            state.notice = 'OK'
            state.isAuthLoading = false
        },

        [signIn.rejected.type]: (state: AuthState, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = JSON.parse(action.payload) as ErrorType
            state.isAuthLoading = false
        }
    }
})

export const setUnauthorized = authSlice.actions.setUnauthorized

export default authSlice.reducer as Reducer<AuthState, any>
