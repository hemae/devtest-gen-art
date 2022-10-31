import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Alert} from './models'
import generateId from 'hans-id'


type AlertState = {
    alerts: Alert[]
}

const initialState: AlertState = {
    alerts: []
}


export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(state: AlertState, action: PayloadAction<Alert>) {
            if (action.payload.id) state.alerts = state.alerts.filter(alert => alert.id !== action.payload.id)
            else state.alerts.push({...action.payload, id: generateId()})
        }
    },
})

export const setAlert = alertSlice.actions.setAlert

export default alertSlice.reducer
