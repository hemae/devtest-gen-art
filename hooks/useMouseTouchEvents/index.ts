import {
    MouseEventHandler,
    useCallback,
    useState,
    TouchEventHandler,
    TouchEvent,
    MouseEvent, Dispatch, SetStateAction
} from 'react'
import {useAppSelector} from '@store'
import usePreviousTouch from '@hooks/usePreviousTouch'


type Options = {
    offsetX?: number | null
    offsetY?: number | null
    initialX?: number
    initialY?: number
    moveCoefX?: number
    moveCoefY?: number
    rightBorder?: number
    leftBorder?: number
    topBorder?: number
    bottomBorder?: number
}

type Returned = {
    x: number
    y: number
    mouseDown: (event: MouseEvent, callback?: () => void) => void
    mouseUp: (event: MouseEvent, callback?: () => void) => void
    mouseMove: MouseEventHandler
    touchStart: (event: TouchEvent, callback?: () => void) => void
    touchEnd: (event: TouchEvent, callback?: () => void) => void
    touchMove: TouchEventHandler
    active: boolean
    setX: Dispatch<SetStateAction<number>>
    setY: Dispatch<SetStateAction<number>>
    downX: number | null
    downY: number | null
}

export default function useMouseTouchEvents(options: Options): Returned {

    const {
        offsetX,
        offsetY,
        initialX,
        initialY,
        moveCoefX,
        moveCoefY,
        rightBorder,
        leftBorder,
        topBorder,
        bottomBorder
    } = options

    const {
        previousTouchMoveX,
        previousTouchMoveY,
        setPreviousTouch,
        setPreviousMoveTouch,
        initializePreviousTouch
    } = usePreviousTouch()

    const [active, setActive] = useState<boolean>(false)
    const [x, setX] = useState<number>(initialX || 0)
    const [y, setY] = useState<number>(initialY || 0)

    const [downX, setDownX] = useState<number | null>(null)
    const [downY, setDownY] = useState<number | null>(null)

    const {touchableDevice} = useAppSelector(state => state.settingsReducer)

    const downHandler = useCallback((event: MouseEvent | TouchEvent, callback?: () => void): void => {
        setActive(true)
        let currentDownX
        let currentDownY
        if ((event as MouseEvent).clientX && (event as MouseEvent).clientY) {
            currentDownX = ((event as MouseEvent).clientX - (offsetX || 0)) * (moveCoefX || 1)
            currentDownY = ((event as MouseEvent).clientY - (offsetY || 0)) * (moveCoefY || 1)
        } else {
            currentDownX = ((event as TouchEvent).touches[0].clientX - (offsetX || 0)) * (moveCoefX || 1)
            currentDownY = ((event as TouchEvent).touches[0].clientY - (offsetY || 0)) * (moveCoefY || 1)
        }
        setX(currentDownX)
        setY(currentDownY)
        if (setDownX) setDownX(currentDownX)
        if (setDownY) setDownY(currentDownY)
        if (callback) callback()
    }, [moveCoefX, moveCoefY, offsetX, offsetY, setDownX, setDownY])

    const upHandler = useCallback((callback?: () => void): void => {
        setActive(false)
        if (setDownX) setDownX(null)
        if (setDownY) setDownY(null)
        if (callback) callback()
    }, [setDownX, setDownY])

    const moveHandler = useCallback((movementX: number, movementY: number) => {
        if (active) {
            setX(
                prev => {
                    if (typeof rightBorder === 'number' && (prev + movementX >= rightBorder)) return rightBorder
                    if (typeof leftBorder === 'number' && (prev + movementX <= leftBorder)) return leftBorder
                    return prev + movementX
                })
            setY(
                prev => {
                    if (typeof bottomBorder === 'number' && (prev + movementY >= bottomBorder)) return bottomBorder
                    if (typeof topBorder === 'number' && (prev + movementY <= topBorder)) return topBorder
                    return prev + movementY
                }
            )
        }
    }, [active, setX, setY, rightBorder, leftBorder, topBorder, bottomBorder])


    const mouseDown: (event: MouseEvent, callback?: () => void) => void = useCallback((event, callback?: () => void): void => {
        if (!touchableDevice) downHandler(event, callback)
    }, [touchableDevice, downHandler])

    const mouseUp: (event: MouseEvent, callback?: () => void) => void = useCallback((event, callback?: () => void): void => {
        if (!touchableDevice) upHandler(callback)
    }, [touchableDevice, upHandler])

    const mouseMove: MouseEventHandler = useCallback((event): void => {
        if (!touchableDevice) moveHandler(event.movementX * (moveCoefX || 1), event.movementY * (moveCoefY || 1))
    }, [touchableDevice, moveHandler, moveCoefX, moveCoefY])


    const touchStart: (event: TouchEvent, callback?: () => void) => void = useCallback((event, callback?: () => void): void => {
        event.stopPropagation()
        if (touchableDevice) {
            setPreviousTouch(event)
            downHandler(event, callback)
        }
    }, [touchableDevice, downHandler, setPreviousTouch])

    const touchEnd: (event: TouchEvent, callback?: () => void) => void = useCallback((event, callback?: () => void): void => {
        event.stopPropagation()
        if (touchableDevice) {
            initializePreviousTouch()
            upHandler(callback)
        }
    }, [touchableDevice, upHandler, initializePreviousTouch])

    const touchMove: TouchEventHandler = useCallback((event): void => {
        event.stopPropagation()
        if (touchableDevice && previousTouchMoveX && previousTouchMoveY) {
            moveHandler(
                (event.changedTouches[0].clientX - previousTouchMoveX) * (moveCoefX || 1),
                (event.changedTouches[0].clientY - previousTouchMoveY) * (moveCoefY || 1)
            )
            setPreviousMoveTouch(event)
        }
    }, [touchableDevice, moveHandler, previousTouchMoveX, previousTouchMoveY, moveCoefX, moveCoefY])


    return {
        x, y,
        active,
        mouseDown,
        mouseUp,
        mouseMove,
        touchStart,
        touchEnd,
        touchMove,
        setX,
        setY,
        downX,
        downY
    }
}
