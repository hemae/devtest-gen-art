import {memo} from 'react'
import styles from './PromoPictureSection.module.scss'
import {Image} from '@apiModels/promoPicture'
import {FullscreenImage} from '@UI'


type PromoPictureSectionProps = {
    images: Image[]
}

export const PromoPictureSection = memo<PromoPictureSectionProps>((props) => {

    const {
        images
    } = props

    if (!images.length) return <></>

    return (
        <section
            className={styles.main}
        >
            <FullscreenImage
                className={styles.main__mainImage}
                src={images[0].image}
                alt='first-promo-picture'
            />
            <div
                className={styles.main__subImages}
            >
                {images.slice(1).map(image => {
                    return (
                        <FullscreenImage
                            key={image.id}
                            src={image.image}
                            alt='other-promo-image'
                        />
                    )
                })}
            </div>
        </section>
    )
})
