import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PopUpType} from '@components/UI/PopUp/PopUps'


export type PopUpsOptions = {
    renderingComponent: PopUpType
    props?: any
}

type PopUpsState = {
    popUps: PopUpsOptions[]
}

const initialState: PopUpsState = {
    popUps: []
}

export const popUpsSlice = createSlice({
    name: 'popUps',
    initialState,
    reducers: {
        showPopUp(state: PopUpsState, action: PayloadAction<PopUpsOptions>) {
            state.popUps.push(action.payload)
        },
        closePopUp(state: PopUpsState) {
            state.popUps = state.popUps.slice(0, state.popUps.length - 1)
        }
    }
})

export const showPopUp = popUpsSlice.actions.showPopUp
export const closePopUp = popUpsSlice.actions.closePopUp


export default popUpsSlice.reducer
