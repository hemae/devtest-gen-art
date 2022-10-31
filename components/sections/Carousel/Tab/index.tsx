import {memo} from 'react'
import styles from './Tab.module.scss'
import {CarouselTab} from '@apiModels/sections/carousel'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {GradientBackground} from '@UI'
import classNames from 'classnames'
import {getFlexType} from '@components/sections/Carousel/Tab/helpers'


type TabProps = {
    tab: CarouselTab
}

export const Tab = memo<TabProps>(({tab}) => {

    const {
        id,
        order,
        headers,
        paragraphs,
        textAlign,
        textVerticalAlign,
        textColor,
        backgroundImage,
        shadowDirection,
        shadowDirectionMobile,
        shadowColor
    } = tab

    const {root} = useAdditionalAttributes({
        'data-id': `carousel-tab-${id}`,
        'order': order
    })

    return (
        <div
            ref={root}
            className={classNames(
                styles.main,
                styles[getFlexType(textAlign)],
            )}
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <GradientBackground
                key={`${id}-tab-desktop`}
                shadowColor={shadowColor}
                shadowDirection={shadowDirection}
                deviceType='desktop'
            />
            <GradientBackground
                key={`${id}-tab-mobile`}
                shadowColor={shadowColor}
                shadowDirection={shadowDirectionMobile}
                deviceType='mobile'
            />

            <aside/>

            <div
                className={classNames(
                    styles.main__text,
                    styles[textColor],
                    styles[textVerticalAlign]
                )}
            >
                {headers.map(header => <h1 key={header}>{header}</h1>)}
                {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
        </div>
    )
})
