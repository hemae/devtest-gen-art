import {useCallback, useState, MouseEventHandler} from 'react'


type Returned = {
    active: boolean
    activeClick: MouseEventHandler
}

export default function useFullscreenImage(): Returned {

    const [active, setActive] = useState<boolean>(false)

    const activeClick: MouseEventHandler = useCallback((): void => {
        setActive(prev => !prev)
    }, [setActive])

    return {
        active,
        activeClick
    }
}
