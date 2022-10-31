import {FC, memo} from 'react'
import styles from './Carousel.module.scss'
import {Section, UserSectionData} from '@apiModels/sections'
import {Carousel as CarouselType} from '@apiModels/sections/carousel'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {GradientBackground, Slider} from '@UI'
import useScreen from '@exoticHooks/useScreen'
import {Tab} from '@components/sections/Carousel/Tab'
import useCarousel from '@components/sections/Carousel/useCarousel'


type CarouselProps = {
    section: Section<UserSectionData<CarouselType>>
}

export const Carousel: FC<CarouselProps> = memo<CarouselProps>(({section}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {data: sectionData} = data

    const {
        backgroundImage,
        shadowDirection,
        shadowDirectionMobile,
        shadowColor,
        tabs
    } = sectionData

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    const {screen} = useScreen()

    const tabComponents = tabs.map(tab => {
        return (
            <Tab
                key={tab.id}
                tab={tab}
            />
        )
    })

    const {
        movingStep,
        additionalWidth,
        setCurrentTab,
        currentTab,
        sliderSensibility
    } = useCarousel({tabsCount: tabs.length})

    return (
        <section
            id={id}
            ref={root}
            className={styles.main}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPositionX: `-${(currentTab) * movingStep}px`,
                backgroundSize: screen !== 'desktop' ? 'cover' : `calc(100% + ${additionalWidth}px)`
            }}
        >
            <GradientBackground
                key={`${id}-desktop`}
                shadowColor={shadowColor}
                shadowDirection={shadowDirection}
                deviceType='desktop'
            />
            <GradientBackground
                key={`${id}-mobile`}
                shadowColor={shadowColor}
                shadowDirection={shadowDirectionMobile}
                deviceType='mobile'
            />

            <Slider
                setExternalPosition={setCurrentTab}
                sensibility={sliderSensibility}
                // autoPeriod={4}
            >{tabComponents}</Slider>
        </section>
    )
})
