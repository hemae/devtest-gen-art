import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from '@store'
import {signIn} from '@slices/auth/authThunkCreators'
import {useCallback, useEffect} from 'react'
import {AuthData} from '../../store/API/authAPI/types'
import routerObj from 'next/router'
import appRoutes from '@appRoutes'
import useWarningHandlers from '@hooks/../../exoticHooks/useWarningHandlers'


type Returned = {
    authFormSubmit: (data: AuthData) => void
}

export default function useAdminLoginPage(): Returned {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const {code} = router.query as {code: string}

    const {error, notice} = useAppSelector(state => state.authReducer)
    const {setError, setNotice} = useWarningHandlers('auth')

    useEffect(() => {
        if (error) {
            setError(null)
            routerObj.push(appRoutes.index)
        }
    }, [error])

    useEffect(() => {
        if (notice) {
            setNotice('')
            routerObj.push(appRoutes.adminIndex)
        }
    }, [notice])

    const authFormSubmit = useCallback((data: AuthData): void => {
        dispatch(signIn({data: {code, data: {data}}}))
    }, [code])

    return {
        authFormSubmit
    }
}
