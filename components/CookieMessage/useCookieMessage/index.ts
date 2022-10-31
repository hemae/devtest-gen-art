import {useEffect, useState, MouseEventHandler, useCallback} from 'react'


type Returned = {
    isCookieMessageShown: boolean
    acceptCookieClick: MouseEventHandler
}

export default function useCookieMessage(): Returned {

    const [isCookieMessageShown, setIsCookieMessageShown] = useState<boolean>(false)

    useEffect(() => {
        const cookieMessageWasClosed: string | null = localStorage.getItem('cookieMessageWasClosed')
        if (!cookieMessageWasClosed) setIsCookieMessageShown(true)
    }, [])

    const acceptCookieClick: MouseEventHandler = useCallback((): void => {
        localStorage.setItem('cookieMessageWasClosed', 'true')
        setIsCookieMessageShown(false)
    }, [setIsCookieMessageShown])

    return {
        isCookieMessageShown,
        acceptCookieClick
    }
}
