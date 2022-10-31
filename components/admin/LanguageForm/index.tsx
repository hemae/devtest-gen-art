import {memo} from 'react'
import styles from './LanguageForm.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Language} from '@apiModels/layouts/acceptLanguages'
import useLanguageForm from '@admin/LanguageForm/useLanguageForm'
import {Switcher} from '@UI'


type LanguageFormProps = {
    language?: Language
    acceptLanguages: Language[] | null
}

export const LanguageForm = memo<LanguageFormProps>((props) => {

    const {
        language,
        acceptLanguages
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `language-form-${language ? language.id : 'new'}`
    })

    const {
        locale,
        title,
        order,
        inputChange,
        checkboxChange,
        deleteClick,
        submit,
        isSubmitButtonDisable,
        enabled
    } = useLanguageForm({language, acceptLanguages})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {language &&
            <button
                id='delete-language'
                onClick={deleteClick}
                type='button'
            >&times;</button>}
            <input
                placeholder='Locale (ru, en, ...)'
                value={locale}
                onChange={inputChange('locale')}
            />
            <input
                placeholder='Title'
                value={title}
                onChange={inputChange('title')}
            />
            <input
                type='number'
                placeholder='Order'
                value={order}
                onChange={inputChange('order')}
            />
            <Switcher
                checked={enabled}
                onChange={checkboxChange('enabled')}
                label={'Enabled'}
            />
            <button
                type='submit'
                disabled={isSubmitButtonDisable}
                onClick={submit}
            >{'Save'}</button>
        </section>
    )
})
