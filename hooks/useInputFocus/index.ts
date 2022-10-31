import {FocusEventHandler, useState} from 'react'


type Returned<ElementType> = {
    active: boolean
    focus: FocusEventHandler<ElementType>
    blur: FocusEventHandler<ElementType>
}

export default function useInputFocus<ElementType>(): Returned<ElementType> {

    const [active, setActive] = useState<boolean>(false)

    const focus: FocusEventHandler<ElementType> = (): void => {
        setActive(true)
    }

    const blur: FocusEventHandler<ElementType> = (): void => {
        setActive(false)
    }

    return {
        active,
        focus,
        blur
    }
}
