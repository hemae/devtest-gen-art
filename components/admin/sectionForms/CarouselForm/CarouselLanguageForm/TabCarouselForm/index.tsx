import {memo} from 'react'
import {CarouselTab} from '@apiModels/sections/carousel'
import classNames from 'classnames'
import styles from '@admin/Form.module.scss'
import ownStyles from '@admin/FormLanguage.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import useTabCarouselForm
    from '@admin/sectionForms/CarouselForm/CarouselLanguageForm/TabCarouselForm/useTabCarouselForm'
import {ImagesPreview, SimpleUploader} from '@UI'


type TabCarouselFormProps = {
    locale: string
    tab?: CarouselTab
}

export const TabCarouselForm = memo<TabCarouselFormProps>((props) => {

    const {
        locale,
        tab
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `tab-carousel-form-${locale}-${tab ? tab.id : 'new'}`
    })

    const {
        deleteImage,
        uploaderClick,
        backgroundImage,
        backgroundUploaderShown,
        image,
        imageUploaderShown
    } = useTabCarouselForm({tab, locale})

    return (
        <div
            ref={root}
            className={classNames(styles.main, ownStyles.ownMain)}
        >
            <h4>{`${tab ? tab.id : 'New'} tab`}</h4>
            <select
            >
                {}
            </select>

            <h4>{'Background image'}</h4>
            {backgroundImage &&
            <ImagesPreview
                images={[backgroundImage]}
                deleteImage={deleteImage('background')}
            />}
            <button
                type='button'
                onClick={uploaderClick('background')}
            >{backgroundUploaderShown ? 'Hide background uploader' : 'Upload background file'}</button>
            {backgroundUploaderShown &&
            <SimpleUploader
                single
                target={`carousel-tab-background-${locale}-${tab ? tab.id : 'new'}`}
                chunkName={'carousel-section-images'}
            />}

            <h4>{'Square image'}</h4>
            {image &&
            <ImagesPreview
                images={[image]}
                deleteImage={deleteImage('image')}
            />}
            <button
                type='button'
                onClick={uploaderClick('image')}
            >{imageUploaderShown ? 'Hide square image uploader' : 'Upload square image file'}</button>
            {imageUploaderShown &&
            <SimpleUploader
                single
                target={`carousel-tab-image-${locale}-${tab ? tab.id : 'new'}`}
                chunkName={'carousel-section-images'}
            />}
        </div>
    )
})
