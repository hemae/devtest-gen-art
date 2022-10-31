import {MouseEventHandler, useCallback, useEffect, useState} from 'react'


type Options = {
    setElementNonactive: () => void
}

type Returned = {
    elementOver: MouseEventHandler
    elementLeave: MouseEventHandler
}

export default function useExternalClick(options: Options): Returned {

    const {
        setElementNonactive
    } = options

    const [isOnElement, setIsOnElement] = useState<boolean>(false)

    const elementOver: MouseEventHandler = useCallback(() => {
        if (!isOnElement) setIsOnElement(true)
    }, [isOnElement])

    const elementLeave: MouseEventHandler = () => setIsOnElement(false)

    const clickHandler = useCallback((): void => {
        if (!isOnElement) setElementNonactive()
    }, [isOnElement, setElementNonactive])

    useEffect(() => {
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    }, [clickHandler])

    return {
        elementOver, elementLeave
    }
}
