import {createSlice} from '@reduxjs/toolkit'
import ua, {Device, DeviceName} from '@helpers/userAgentParser'


type SettingsState = {
    device: Device | null
    touchableDevice: boolean
    deviceName: DeviceName | null
}

const initialState: SettingsState = {
    device: null,
    touchableDevice: false,
    deviceName: null
}


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setClientData(state: SettingsState) {
            const userAgentData = ua(window.navigator.userAgent)
            state.device = userAgentData.device
            state.touchableDevice = userAgentData.touchDevice
            state.deviceName = userAgentData.deviceName
        }
    },
})

export const setClientData = settingsSlice.actions.setClientData

export default settingsSlice.reducer
