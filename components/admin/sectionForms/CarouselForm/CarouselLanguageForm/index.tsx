import {memo} from 'react'
import ownStyles from '../../../FormLanguage.module.scss'
import styles from '../../../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ImagesPreview, SimpleUploader} from '@UI'
import classNames from 'classnames'
import useCarouselLanguageForm from '@admin/sectionForms/CarouselForm/CarouselLanguageForm/useCarouselLanguageForm'
import {AdminSectionData, Section} from '@apiModels/sections'
import {Carousel} from '@apiModels/sections/carousel'
import {TabCarouselForm} from '@admin/sectionForms/CarouselForm/CarouselLanguageForm/TabCarouselForm'


type CarouselLanguageFormProps = {
    locale: string
    section: Section<AdminSectionData<Carousel>> | undefined
}

export const CarouselLanguageForm = memo<CarouselLanguageFormProps>((props) => {

    const {
        locale,
        section
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `carousel-language-form-${locale}-${section ? section.id : 'new'}`
    })

    const {
        title,
        headerLinkTitle,
        backgroundImage,
        shadowDirection,
        shadowDirectionMobile,
        inputChange,
        uploaderShown,
        uploaderClick,
        deleteImage,
        submit,
        disabled
    } = useCarouselLanguageForm({initialData: section, locale})

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
            <input
                placeholder='Header link title'
                value={headerLinkTitle}
                onChange={inputChange('headerLinkTitle')}
            />
            <input
                placeholder='Shadow direction (desktop)'
                value={shadowDirection}
                onChange={inputChange('shadowDirection')}
            />
            <input
                placeholder='Shadow direction (mobile)'
                value={shadowDirectionMobile}
                onChange={inputChange('shadowDirectionMobile')}
            />
            {backgroundImage &&
            <ImagesPreview
                images={[backgroundImage]}
                deleteImage={deleteImage}
            />}
            <button
                type='button'
                onClick={uploaderClick}
            >{uploaderShown ? 'Hide uploader' : 'Upload files'}</button>
            {uploaderShown &&
            <SimpleUploader
                single
                target={`carousel-section-${locale}-${section ? section.id : 'new'}`}
                chunkName={'carousel-section-images'}
            />}
            <button
                onClick={submit}
            >{`Save ${locale}`}</button>
            <h3>{'Tabs'}</h3>
            {section?.data[locale].data.tabs.map(tab => {
                return (
                    <TabCarouselForm
                        key={tab.id}
                        tab={tab}
                        locale={locale}
                    />
                )
            })}
            <TabCarouselForm
                key='new'
                locale={locale}
            />
        </div>
    )
})
