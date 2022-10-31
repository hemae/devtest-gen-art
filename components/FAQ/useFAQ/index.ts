import {useState, MouseEventHandler, useCallback, useEffect} from 'react'


type Returned = {
    contentHidden: boolean
    active: boolean
    toggleClick: MouseEventHandler
}

export default function useFAQ(): Returned {

    const [contentHidden, setContentHidden] = useState<boolean>(true)
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        if (contentHidden) setActive(false)
        else {
            setTimeout(() => {
                setActive(true)
            }, 200)
        }
    }, [contentHidden, setActive])

    const toggleClick: MouseEventHandler = useCallback((): void => {
        setContentHidden(prev => !prev)
    }, [setContentHidden])

    return {
        contentHidden,
        active,
        toggleClick
    }
}
