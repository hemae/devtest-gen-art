import {memo} from 'react'
import ownStyles from '../../FormLanguage.module.scss'
import styles from '../../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ImagesPreview, SimpleUploader} from '@UI'
import {AdminFAQ, FAQ} from '@apiModels/faq'
import useFAQLanguageForm from '@admin/FAQForm/FAQLanguageForm/useFAQLanguageForm'
import classNames from 'classnames'


type FAQLanguageProps = {
    locale: string
    faq: FAQ<AdminFAQ> | undefined
}

export const FAQLanguageForm = memo<FAQLanguageProps>((props) => {

    const {
        locale,
        faq
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `faq-language-form-${locale}-${faq ? faq.id : 'new'}`
    })

    const {
        title,
        description,
        images,
        inputChange,
        uploaderShown,
        uploaderClick,
        deleteImage,
        submit,
        disabled
    } = useFAQLanguageForm({initialData: faq, locale})

    return (
        <div
            ref={root}
            className={classNames(styles.main, ownStyles.ownMain)}
        >
            <h3
                className={classNames({[ownStyles.disabled]: disabled})}
            >{locale} {disabled && '(Disabled)'}</h3>
            <input
                placeholder='Title'
                value={title}
                onChange={inputChange('title')}
            />
            <textarea
                placeholder='Description'
                value={description}
                onChange={inputChange('description')}
            />
            <ImagesPreview
                images={images.map(image => image.src)}
                deleteImage={deleteImage}
            />
            <SimpleUploader
                target={faq ? `faq-${locale}-${faq.id}` : `faq-${locale}-new`}
                chunkName={'faq-images'}
            />
            <button
                onClick={submit}
            >{`Save ${locale}`}</button>
        </div>
    )
})
