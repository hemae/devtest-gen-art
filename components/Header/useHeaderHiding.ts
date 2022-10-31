import {useEffect, useState} from 'react'


type Options = {
    boundaryValue: number
}

type Returned = {
    isHeaderHidden: boolean
}

export default function useHeaderHiding(options: Options): Returned {

    const {boundaryValue} = options

    const [isHeaderHidden, setIsHeaderPaleHidden] = useState<boolean>(false)

    const scrollHandler = (event: any): void => {
        if (event.target.documentElement.scrollTop > boundaryValue) {
            setIsHeaderPaleHidden(true)
        }
        if (event.target.documentElement.scrollTop <= boundaryValue) {
            setIsHeaderPaleHidden(false)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [])

    return {isHeaderHidden}
}
