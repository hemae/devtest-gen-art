import {combineReducers, configureStore} from '@reduxjs/toolkit'

// reducers
import authReducer, {authSlice} from './slices/auth'
import uploadReducer, {uploadSlice} from './slices/upload'
import settingsReducer, {settingsSlice} from './slices/settings'
import alertReducer, {alertSlice} from './slices/alert'
import popUpsReducer, {popUpsSlice} from './slices/popUps'

import sectionsReducer, {sectionsSlice} from './slices/sections'
import promoPicturesReducer, {promoPicturesSlice} from './slices/promoPictures'
import promocodesReducer, {promocodesSlice} from './slices/promocodes'
import testimonialsReducer, {testimonialsSlice} from './slices/testimonials'
import orderRequestsReducer, {orderRequestsSlice} from './slices/orderRequests'
import faqsReducer, {faqsSlice} from './slices/faqs'
import layoutsReducer, {layoutsSlice} from './slices/layouts'

// redux
import {createWrapper} from 'next-redux-wrapper'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'


const reducer = combineReducers({
    layoutsReducer,
    authReducer,
    uploadReducer,
    settingsReducer,
    sectionsReducer,
    promoPicturesReducer,
    promocodesReducer,
    testimonialsReducer,
    faqsReducer,
    alertReducer,
    popUpsReducer,
    orderRequestsReducer
})

const setupStore = () => configureStore({
    reducer,
    devTools: true
})

const store = setupStore()

export type State = ReturnType<typeof reducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = typeof store.dispatch

export const wrapper = createWrapper<Store>(setupStore)

export const slices = {
    layoutsSlice,
    authSlice,
    uploadSlice,
    settingsSlice,
    sectionsSlice,
    promoPicturesSlice,
    promocodesSlice,
    testimonialsSlice,
    faqsSlice,
    alertSlice,
    popUpsSlice,
    orderRequestsSlice
}

export type SliceName =
    'auth'
    | 'upload'
    | 'settings'
    | 'alert'

    | 'sections'
    | 'promoPictures'
    | 'promocodes'
    | 'testimonials'
    | 'orderRequests'
    | 'faqs'
    | 'popUps'

    | 'layouts'

export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export default store
