import {useEffect, useState} from 'react'
import {useAppDispatch} from '@store'
import {setAlert} from '@slices/alert'
import {Alert} from '@slices/alert/models'


type Options = {
    alert: Alert
}

type Returned = {
    active: boolean
    hidden: boolean
    alertMessage: string
}

export default function useWarnings(options: Options): Returned {

    const {
        alert
    } = options

    const dispatch = useAppDispatch()

    const [active, setActive] = useState<boolean>(false)
    const [hidden, setHidden] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => setActive(true), 0)
        setTimeout(() => {
            setHidden(true)
        }, 3000)
        setTimeout(() => {
            dispatch(setAlert({id: alert.id}))
        }, 4010)
    }, [])

    return {
        active,
        hidden,
        alertMessage: alert.message!
    }
}
