import {TouchEventHandler, useCallback, useState} from 'react'


type Returned = {
    previousTouchMoveX: number | null
    previousTouchMoveY: number | null
    setPreviousTouch: TouchEventHandler
    setPreviousMoveTouch: TouchEventHandler
    initializePreviousTouch: () => void
}

export default function usePreviousTouch(): Returned {

    const [previousTouchMoveX, setPreviousTouchMoveX] = useState<number | null>(null)
    const [previousTouchMoveY, setPreviousTouchMoveY] = useState<number | null>(null)

    const setPreviousTouch: TouchEventHandler = useCallback((event) => {
        setPreviousTouchMoveX(event.touches[0].clientX)
        setPreviousTouchMoveY(event.touches[0].clientY)
    }, [setPreviousTouchMoveX, setPreviousTouchMoveY])

    const setPreviousMoveTouch: TouchEventHandler = useCallback((event) => {
        setPreviousTouchMoveX(event.changedTouches[0].clientX)
        setPreviousTouchMoveY(event.changedTouches[0].clientY)
    }, [setPreviousTouchMoveX, setPreviousTouchMoveY])

    const initializePreviousTouch = useCallback(() => {
        setPreviousTouchMoveX(null)
        setPreviousTouchMoveY(null)
    }, [setPreviousTouchMoveX, setPreviousTouchMoveY])

    return {
        previousTouchMoveX,
        previousTouchMoveY,
        setPreviousTouch,
        setPreviousMoveTouch,
        initializePreviousTouch
    }
}
