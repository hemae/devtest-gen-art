import {FC, memo} from 'react'
import styles from './Subheader.module.scss'
import {Section, UserSectionData} from '@apiModels/sections'
import {Subheader as SubheaderType} from '@apiModels/sections/subheader'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import classNames from 'classnames'
import useSubheader from '@components/sections/Subheader/useSubheader'
import {GradientBackground} from '@UI'


type SubheaderProps = {
    section: Section<UserSectionData<SubheaderType>>
}

export const Subheader: FC<SubheaderProps> = memo<SubheaderProps>(({section}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {data: sectionData} = data

    const {
        backgroundImage,
        image,
        shadowDirection,
        shadowDirectionMobile,
        shadowColor,
        textColor,
        headers,
        paragraphs
    } = sectionData

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    const {mounted, textShown} = useSubheader()

    return (
        <section
            id={id}
            ref={root}
            className={styles.main}
            style={{backgroundImage: `url(${backgroundImage})`}}
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

            <div
                className={styles.main__container}
            >
                <div
                    className={classNames(
                        styles.main__image,
                        {[styles.shown]: mounted}
                    )}
                ><img src={image || ''} alt='subheader-image'/></div>
                <div
                    className={classNames(
                        styles.main__text,
                        styles[textColor],
                        {[styles.shown]: textShown}
                    )}
                >
                    {headers.map(header => {
                        return (
                            <h1
                                key={header}
                            >{header}</h1>
                        )
                    })}
                    {paragraphs.map(paragraph => {
                        return (
                            <p
                                key={paragraph}
                            >{paragraph}</p>
                        )
                    })}
                </div>
            </div>
        </section>
    )
})
