import {useEffect, useState} from 'react'
import useWindowDimensions from '@hooks/useWindowDimensions'
import {maxSectionWidth} from '@styles/screens'


type Options = {
    menuShown: boolean
}

type Returned = {
    inlineStyles: Record<string, string> | undefined
}

export default function useHeaderPopUp(options: Options): Returned {

    const {menuShown} = options

    const {width} = useWindowDimensions()

    const [inlineStyles, setInlineStyles] = useState<Record<string, string> | undefined>(undefined)

    useEffect(() => {
        if ((width || 0) > maxSectionWidth && menuShown) setInlineStyles({right: `${((width || 0) - maxSectionWidth) / 2}px`})
        else setInlineStyles(undefined)
    }, [width, menuShown])

    return {
        inlineStyles
    }
}
