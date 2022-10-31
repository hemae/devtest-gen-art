import useWindowDimensions from '@hooks/useWindowDimensions'
import {useEffect, useState} from 'react'
import {Screen, screenBreakPoints} from '@styles/screens'


type Returned = {
    screen: Screen | null
}

export default function useScreen(): Returned {

    const {width} = useWindowDimensions()

    const [screen, setScreen] = useState<Screen | null>(null)

    useEffect(() => {
        if (width) {
            const currentScreen = Object
                .keys(screenBreakPoints)
                .find(key => {
                    return screenBreakPoints[key as Screen][0] <= width && screenBreakPoints[key as Screen][1] > width
                })
            setScreen(currentScreen as Screen || null)
        }
    }, [width])

    return {
        screen
    }
}
