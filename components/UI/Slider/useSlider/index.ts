import {
    Dispatch,
    RefObject,
    SetStateAction, useCallback, useEffect,
    useState
} from 'react'
import useElementDimensions from '@hooks/useElementDimensions'


const moveSensibility = 50

type Options = {
    childrenCount: number
    sensibility?: number
    autoPeriod?: number
    setExternalPosition?: Dispatch<SetStateAction<number>>
}

type Returned = {
    slider: RefObject<HTMLDivElement>
    sliderWidth: number | null
    sliderOffsetX: number | null
    sliderContainer: RefObject<HTMLDivElement>
    setX: Dispatch<SetStateAction<number>>
    setDownX: Dispatch<SetStateAction<number | null>>
    upHandler: () => void
    downHandler: () => void
    currentPosition: number
    setCurrentPosition: Dispatch<SetStateAction<number>>
    prevHandler: () => void
    nextHandler: () => void
}


export default function useSlider(options: Options): Returned {

    const {
        childrenCount,
        sensibility,
        autoPeriod,
        setExternalPosition
    } = options

    const sliderSensibility = sensibility || moveSensibility

    const {
        element: slider,
        width: sliderWidth
    } = useElementDimensions<HTMLDivElement>()

    const {
        element: sliderContainer,
        offsetX: sliderOffsetX
    } = useElementDimensions<HTMLDivElement>()

    const [currentPosition, setCurrentPosition] = useState<number>(0)

    // const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>(null)

    // const timeOuts: NodeJS.Timeout[] = []

    // const refreshTimeOut = () => {
    //     timeOuts.forEach(timeout => clearTimeout(timeout))
    //     if (autoPeriod) {
    //         timeOuts.push(setTimeout(() => {
    //             cycleHandler()
    //         }, autoPeriod * 1000))
    //     }
    // }

    const prevHandler = useCallback((): void => {
        // refreshTimeOut()
        setCurrentPosition(prev => {
            let nextValue = prev - 1
            if (prev - 1 < 0) nextValue = 0
            if (setExternalPosition) setExternalPosition(nextValue)
            return nextValue
        })
    }, [setCurrentPosition, setExternalPosition])

    const nextHandler = useCallback((): void => {
        // refreshTimeOut()
        setCurrentPosition(prev => {
            let nextValue = prev + 1
            if (prev + 1 > childrenCount - 1) nextValue = childrenCount - 1
            if (setExternalPosition) setExternalPosition(nextValue)
            return nextValue
        })
    }, [setCurrentPosition, setExternalPosition, childrenCount])

    const cycleHandler = useCallback((): void => {
        setCurrentPosition(prev => {
            let nextValue = prev + 1
            if (prev + 1 > childrenCount - 1) nextValue = 0
            if (setExternalPosition) setExternalPosition(nextValue)
            return nextValue
        })
    }, [setCurrentPosition, setExternalPosition, childrenCount])

    // useEffect(() => {
    //     refreshTimeOut()
    // }, [currentPosition])

    const [x, setX] = useState<number>(0)
    const [downX, setDownX] = useState<number | null>(null)

    const downHandler = useCallback((): void => {
        // timeOuts.forEach(timeout => clearTimeout(timeout))
    }, [])

    const upHandler = useCallback((): void => {
        if (downX && (downX - x) > sliderSensibility) nextHandler()
        if (downX && (x - downX) > sliderSensibility) prevHandler()
    }, [downX, x, nextHandler])

    useEffect(() => {
        if (slider?.current) slider.current.scrollTo({
            behavior: 'smooth',
            left: (currentPosition + ((downX || 0) - x) / 100) * (sliderWidth || 0)
        })
    }, [x, downX, slider?.current, currentPosition, sliderWidth])

    return {
        slider,
        sliderOffsetX,
        sliderWidth,
        setX,
        sliderContainer,
        setDownX,
        upHandler,
        downHandler,
        currentPosition,
        setCurrentPosition,
        prevHandler,
        nextHandler
    }
}
