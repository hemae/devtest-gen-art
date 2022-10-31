import useElement from '@hooks/useElement'
import {RefObject, useEffect, useState} from 'react'
import useWindowDimensions from '@hooks/useWindowDimensions'


type Returned<ElementType> = {
    element: RefObject<ElementType>
    width: number | null
    height: number | null
    offsetX: number | null
    offsetY: number | null
}

export default function useElementDimensions<ElementType extends HTMLElement = HTMLDivElement>(): Returned<ElementType> {

    const {element} = useElement<ElementType>()
    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)
    const [offsetX, setOffsetX] = useState<number | null>(null)
    const [offsetY, setOffsetY] = useState<number | null>(null)

    const {width: windowWidth} = useWindowDimensions()

    useEffect(() => {
        if (element?.current) {
            setWidth(element.current.offsetWidth)
            setHeight(element.current.offsetHeight)
        }
    }, [element?.current, windowWidth])

    useEffect(() => {
        if (element?.current) {
            setOffsetX(element.current.offsetLeft)
            setOffsetY(element.current.offsetTop)
        }
    }, [element?.current, windowWidth])

    return {
        element,
        width,
        height,
        offsetX,
        offsetY
    }
}
