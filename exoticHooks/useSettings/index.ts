import {useAppSelector} from '@store'
import {Device, DeviceName} from '@helpers/userAgentParser'


type Returned = {
    device: Device | null
    touchableDevice: boolean
    deviceName: DeviceName | null
}

export default function useSettings(): Returned {

    const {
        touchableDevice,
        device,
        deviceName
    } = useAppSelector(state => state.settingsReducer)

    return {
        touchableDevice,
        device,
        deviceName
    }
}
