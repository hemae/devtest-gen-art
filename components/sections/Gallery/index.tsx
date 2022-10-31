import {FC, memo} from 'react'
import styles from './Gallery.module.scss'
import {Section, UserSectionData} from '@apiModels/sections'
import {Gallery} from '@apiModels/sections/gallery'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {GalleryItem} from './GalleryItem'
import {PromoPicture} from '@apiModels/promoPicture'
import {ExpandingButton, useExpandingButton} from '@UI'
import useGallery from '@components/sections/Gallery/useGallery'
import classNames from 'classnames'


type CarouselProps = {
    section: Section<UserSectionData<Gallery>>
    promoPictures: PromoPicture[]
}

export const GalleryComponent: FC<CarouselProps> = memo<CarouselProps>(({section, promoPictures}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {
        title,
        expandingButtonTitle,
        chooseButtonTitle
    } = data

    const {} = useGallery()

    const {
        expandingButtonClick,
        expandingButtonHidden,
        visibleItems
    } = useExpandingButton<PromoPicture>({items: promoPictures, pageSize: 12})

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    return (
        <section
            id={id}
            ref={root}
            className={classNames(
                styles.main,
                {[styles.expandingButtonHidden]: expandingButtonHidden}
            )}
        >
            <h2>{title}</h2>
            <div className={styles.main__itemsWrapper}>
                {visibleItems.map(promoPicture => {
                    return (
                        <GalleryItem
                            key={promoPicture.id}
                            promoPicture={promoPicture}
                            chooseButtonTitle={chooseButtonTitle}
                        />
                    )
                })}
            </div>
            <ExpandingButton
                id='gallery-show-more-button'
                title={expandingButtonTitle!}
                clickHandler={expandingButtonClick}
            />
        </section>
    )
})
