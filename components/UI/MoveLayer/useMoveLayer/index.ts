import useMouseTouchEvents from '@hooks/useMouseTouchEvents'
import {Dispatch, MouseEventHandler, SetStateAction, TouchEventHandler, useCallback, useEffect} from 'react'
import useHTMLScrollable from '@hooks/useHTMLScrollable'


type Options = {
    parentOffsetX?: number | null
    parentOffsetY?: number | null
    parentWidth?: number | null
    parentHeight?: number | null
    initialX?: number | null
    initialY?: number | null
    setTargetX?: Dispatch<SetStateAction<number>>
    setTargetY?: Dispatch<SetStateAction<number>>
    nullableX?: boolean
    nullableY?: boolean
    downHandler?: () => void
    upHandler?: () => void
    setDownX?: Dispatch<SetStateAction<number | null>>
    setDownY?: Dispatch<SetStateAction<number | null>>
    blockScroll: boolean
}

type Returned = {
    layerDown: MouseEventHandler
    layerMove: MouseEventHandler
    layerUp: MouseEventHandler
    layerTouchStart: TouchEventHandler
    layerTouchMove: TouchEventHandler
    layerTouchEnd: TouchEventHandler
}

export default function useMoveLayer(options: Options): Returned {

    const {
        parentOffsetX,
        parentOffsetY,
        parentWidth,
        parentHeight,
        initialX,
        initialY,
        setTargetX,
        setTargetY,
        nullableX,
        nullableY,
        downHandler,
        upHandler,
        setDownX,
        setDownY,
        blockScroll
    } = options

    const {
        x, y,
        setX, setY,
        mouseDown,
        mouseUp,
        mouseMove,
        touchStart,
        touchEnd,
        touchMove,
        downX,
        downY
    } = useMouseTouchEvents({
        offsetX: parentOffsetX,
        offsetY: parentOffsetY,
        moveCoefX: 100 / (parentWidth || 1),
        moveCoefY: 100 / (parentHeight || 1),
        rightBorder: 100, leftBorder: 0,
        initialX: initialX || 0, initialY: initialY || 0
    })

    const {setScrollable} = useHTMLScrollable()

    useEffect(() => {
        if (setTargetX) setTargetX(x)
    }, [x])

    useEffect(() => {
        if (setTargetY) setTargetY(y)
    }, [y])

    useEffect(() => {
        if (setDownX) setDownX(downX)
    }, [downX])

    useEffect(() => {
        if (setDownY) setDownY(downY)
    }, [downY])

    const layerDown: MouseEventHandler = useCallback((event): void => {
        mouseDown(event, () => {
            if (downHandler) downHandler()
        })
    }, [mouseDown, downHandler])

    const layerMove: MouseEventHandler = useCallback((event): void => {
        mouseMove(event)
    }, [mouseMove])

    const layerUp: MouseEventHandler = useCallback((event): void => {
        mouseUp(event, () => {
            if (upHandler) upHandler()
            if (nullableX) setX(0)
            if (nullableY) setY(0)
        })
    }, [mouseUp, setX, setY, nullableX, nullableY, upHandler])


    const layerTouchStart: TouchEventHandler = useCallback((event): void => {
        touchStart(event, () => {
            if (downHandler) downHandler()
            if (blockScroll) setScrollable(false)
        })
    }, [touchStart, downHandler, setScrollable, blockScroll])

    const layerTouchMove: TouchEventHandler = useCallback((event): void => {
        touchMove(event)
    }, [touchMove])

    const layerTouchEnd: TouchEventHandler = useCallback((event): void => {
        touchEnd(event, () => {
            if (upHandler) upHandler()
            if (blockScroll) setScrollable(true)
            if (nullableX) setX(0)
            if (nullableY) setY(0)
        })
    }, [touchEnd, setX, setY, nullableX, nullableY, upHandler, setScrollable, blockScroll])


    return {
        layerDown,
        layerMove,
        layerUp,
        layerTouchStart,
        layerTouchMove,
        layerTouchEnd
    }
}
