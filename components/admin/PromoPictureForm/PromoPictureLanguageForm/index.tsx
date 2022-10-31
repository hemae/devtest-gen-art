import {memo} from 'react'
import ownStyles from '../../FormLanguage.module.scss'
import styles from '../../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ImagesPreview, SimpleUploader} from '@UI'
import classNames from 'classnames'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'
import usePromoPictureLanguageForm from '@admin/PromoPictureForm/PromoPictureLanguageForm/usePromoPictureLanguageForm'


type PromoPictureLanguageProps = {
    locale: string
    promoPicture: PromoPicture<AdminPromoPicture> | undefined
}

export const PromoPictureLanguageForm = memo<PromoPictureLanguageProps>((props) => {

    const {
        locale,
        promoPicture
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `promo-picture-language-form-${locale}-${promoPicture ? promoPicture.id : 'new'}`
    })

    const {
        price,
        mainImage,
        description,
        images,
        inputChange,
        uploaderShown,
        uploaderClick,
        deleteImage,
        submit,
        disabled
    } = usePromoPictureLanguageForm({initialData: promoPicture, locale})

    return (
        <div
            ref={root}
            className={classNames(styles.main, ownStyles.ownMain)}
        >
            <h3
                className={classNames({[ownStyles.disabled]: disabled})}
            >{locale} {disabled && '(Disabled)'}</h3>
            <textarea
                placeholder='Description'
                value={description}
                onChange={inputChange('description')}
            />
            <input
                placeholder='Price'
                value={price}
                onChange={inputChange('price')}
            />
            <h3>Main image (in the gallery)</h3>
            <ImagesPreview
                images={mainImage ? [mainImage] : []}
                deleteImage={deleteImage('main')}
            />
            <SimpleUploader
                target={promoPicture ? `promo-picture-main-${locale}-${promoPicture.id}` : `promo-picture-main-${locale}-new`}
                chunkName={'promo-pictures-images'}
            />
            <h3>Other images</h3>
            <ImagesPreview
                images={images.map(image => image.image)}
                deleteImage={deleteImage('sub')}
            />
            <SimpleUploader
                target={promoPicture ? `promo-picture-${locale}-${promoPicture.id}` : `promo-picture-${locale}-new`}
                chunkName={'promo-pictures-images'}
            />
            <button
                onClick={submit}
            >{`Save ${locale}`}</button>
        </div>
    )
})
