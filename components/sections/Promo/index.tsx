import {FC, memo} from 'react'
import styles from './Promo.module.scss'
import {Section, UserSectionData} from '@apiModels/sections'
import {Promo} from '@apiModels/sections/promo'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ImageComparator} from '@UI'
import usePromo from '@components/sections/Promo/usePromo'


type PromoComponentProps = {
    section: Section<UserSectionData<Promo>>
}

export const PromoComponent: FC<PromoComponentProps> = memo<PromoComponentProps>(({section}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {data: sectionData} = data

    const {
        headers,
        paragraphs,
        images
    } = sectionData

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    const {wrapper, offsetX} = usePromo()

    return (
        <section
            id={id}
            ref={root}
            className={styles.main}
        >
            <div className={styles.main__textWrapper}>
                {headers.map(header => {
                    const {root} = useAdditionalAttributes({'data-id': `promo-header-${header}`})
                    return (
                        <h2
                            key={header}
                            ref={root}
                        >{header}</h2>
                    )
                })}
                {paragraphs.map(paragraph => {
                    const {root} = useAdditionalAttributes({'data-id': `promo-paragraph-${paragraph}`})
                    return (
                        <p
                            key={paragraph}
                            ref={root}
                        >{paragraph}</p>
                    )
                })}
            </div>
            <div
                ref={wrapper}
                className={styles.main__imagesWrapper}
            >
                {images
                    .sort((image1, image2) => {
                        if (image1.order! > image2.order!) return 1
                        if (image1.order! < image2.order!) return -1
                        return 0
                    })
                    .map((image) => {

                        const {root} = useAdditionalAttributes({
                            'data-id': `promo-image-${image.id}`,
                            'order': image.order
                        })

                        if (image.src && image.src2) {
                            return (
                                <ImageComparator
                                    key={image.id}
                                    parentOffsetX={offsetX}
                                    src1={image.src}
                                    src2={image.src2}
                                />
                            )
                        }

                        return (
                            <div
                                key={image.id}
                                ref={root}
                            >
                                <img
                                    src={image.src || ''}
                                    alt={`promo-image-${image.id}`}
                                />
                            </div>
                        )
                    })}
            </div>
        </section>
    )
})
