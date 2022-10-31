import {useState, MouseEventHandler, useCallback} from 'react'


type Returned = {
    active: boolean
    toggleClick: MouseEventHandler
    navbarEnter: MouseEventHandler
    navbarLeave: MouseEventHandler
}

export default function useNavbar(): Returned {

    const [active, setActive] = useState<boolean>(false)

    const toggleClick: MouseEventHandler = useCallback((): void => {
        setActive(prev => !prev)
    }, [setActive])

    const navbarEnter: MouseEventHandler = useCallback((): void => {
        setActive(true)
    }, [setActive])

    const navbarLeave: MouseEventHandler = useCallback((): void => {
        setActive(false)
    }, [setActive])

    return {
        active,
        toggleClick,
        navbarEnter,
        navbarLeave
    }
}
