import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import router from 'next/router'
import appRoutes from '@appRoutes'
import {setUnauthorized} from '@slices/auth'


export default function useUnauthorized() {

    const {becameUnauthorized} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (becameUnauthorized) {
            dispatch(setUnauthorized(false))
            router.push(appRoutes.index)
        }
    }, [becameUnauthorized])
}
