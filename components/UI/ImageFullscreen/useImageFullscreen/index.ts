import {MouseEventHandler, useCallback, useEffect, useState} from 'react'
import useHTMLScrollable from '@hooks/useHTMLScrollable'


type Options = {
    hideHandler: MouseEventHandler
}

type Returned = {
    shown: boolean
    hideClick: MouseEventHandler
}

export default function useImageFullscreen(options: Options): Returned {

    const {
        hideHandler
    } = options

    const [shown, setShown] = useState<any>(false)

    const {setScrollable} = useHTMLScrollable()

    useEffect(() => {
        setShown(true)
        setScrollable(false)
    }, [setScrollable])

    const hideClick: MouseEventHandler = useCallback((event): void => {
        setShown(false)
        setScrollable(true)
        setTimeout(() => {
            hideHandler(event)
        }, 210)
    }, [hideHandler, setScrollable])

    return {
        shown,
        hideClick
    }
}
