import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import useScreen from '@exoticHooks/useScreen'


const additionalWidth = 60

type Options = {
    tabsCount: number
}

type Returned = {
    additionalWidth: number
    movingStep: number
    currentTab: number
    setCurrentTab: Dispatch<SetStateAction<number>>
    sliderSensibility: number
}

export default function useCarousel(options: Options): Returned {

    const {
        tabsCount
    } = options

    const {screen} = useScreen()

    const [sliderSensibility, setSliderSensibility] = useState<number>(10)

    useEffect(() => {
        switch (screen) {
            case 'mobile':
                setSliderSensibility(30)
                break
            case 'tablet':
                setSliderSensibility(20)
                break
            default:
                setSliderSensibility(10)
        }
    }, [screen])

    const [currentTab, setCurrentTab] = useState<number>(0)

    const movingStep = additionalWidth / (tabsCount - 1)

    return {
        movingStep,
        additionalWidth,
        setCurrentTab,
        currentTab,
        sliderSensibility
    }
}
