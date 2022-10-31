import useUnauthorized from '@hooks/../exoticHooks/useUnauthorized'
import {useEffect} from 'react'
import {useAppDispatch} from '@store'
import {setClientData} from '@slices/settings'


export default function useApp(): void {

    useUnauthorized()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setClientData())
    }, [])
}
