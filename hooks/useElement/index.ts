import {RefObject, useRef} from 'react'


type Returned<ElementType> = {
    element: RefObject<ElementType>
}

export default function useElement<ElementType extends HTMLElement = HTMLDivElement>(): Returned<ElementType> {

    const element = useRef<ElementType>(null)

    return {element}
}
