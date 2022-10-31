import {useCallback, useEffect, useState} from 'react'


type SignValue = 1 | -1 | 0

type Returned = {
    width: number | null
    height: number | null
    widthIncrement: SignValue | null
    heightIncrement: SignValue | null
}

export default function useWindowDimensions(): Returned {

    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)

    const [widthIncrement, setWidthIncrement] = useState<SignValue | null>(null)
    const [heightIncrement, setHeightIncrement] = useState<SignValue | null>(null)

    useEffect(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }, [setWidth, setHeight])

    const resize = useCallback(() => {
        setWidth(prev => {
            if (prev) setWidthIncrement(Math.sign(window.innerWidth - prev) as SignValue)
            return window.innerWidth
        })
        setHeight(prev => {
            if (prev) setHeightIncrement(Math.sign(window.innerHeight - prev) as SignValue)
            return window.innerHeight
        })
    }, [setWidth, setHeight])

    useEffect(() => {
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [resize])

    return {
        width, height,
        widthIncrement, heightIncrement
    }
}
