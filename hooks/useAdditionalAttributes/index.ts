import {RefObject, useEffect} from 'react'
import useElement from '@hooks/useElement'


type Returned<ElementType> = {
    root: RefObject<ElementType>
}

export default function useAdditionalAttributes<ElementType extends HTMLElement = HTMLDivElement>(options: any): Returned<ElementType> {

    const {element: root} = useElement<ElementType>()

    useEffect(() => {
        if (root) {
            Object
                .keys(options)
                //@ts-ignore
                .forEach(key => root.current?.setAttribute(key, options[key].toString()))
        }
    }, [root])

    return {root}
}
