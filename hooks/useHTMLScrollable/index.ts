import {useCallback, useEffect, useState} from 'react'

type Returned = {
    setScrollable: (scrollable: boolean) => void
}

export default function useHTMLScrollable(): Returned {

    const [html, setHtml] = useState<HTMLHtmlElement | null>(null)
    const [body, setBody] = useState<HTMLBodyElement | null>(null)

    useEffect(() => {
        setHtml(document.querySelector('html'))
        setBody(document.querySelector('body'))
    }, [])

    const setScrollable = useCallback((scrollable: boolean): void => {
        if (!scrollable) {
            if (html) html.classList.add('not-scrollable')
            if (body) body.classList.add('not-scrollable')
        } else {
            if (html) html.classList.remove('not-scrollable')
            if (body) body.classList.remove('not-scrollable')
        }
    }, [html, body])

    return {
        setScrollable
    }
}
