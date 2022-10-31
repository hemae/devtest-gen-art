import {memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Switcher} from '@UI'
import {AdminFAQ, FAQ} from '@apiModels/faq'
import useFAQForm from '@admin/FAQForm/useFAQForm'
import {FAQLanguageForm} from '@admin/FAQForm/FAQLanguageForm'
import {useAppSelector} from '@store'
import {DeleteButton} from '@admin/DeleteButton'


type FAQFormProps = {
    faq?: FAQ<AdminFAQ>
}

export const FAQForm = memo<FAQFormProps>((props) => {

    const {
        faq
    } = props

    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    const {root} = useAdditionalAttributes({
        'data-id': `faq-form-${faq ? faq.id : 'new'}`
    })

    const {
        submitButtonDisabled,
        submit,
        publicVisible,
        checkboxChange,
        deleteClick,
        inputChange,
        order
    } = useFAQForm({initialData: faq})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {faq && <DeleteButton onClick={deleteClick}/>}
            {acceptLanguages?.map(language => language.data.locale)
                .map(key => {
                    return (
                        <FAQLanguageForm
                            key={key}
                            locale={key}
                            faq={faq}
                        />
                    )
                })}
            <Switcher
                checked={publicVisible}
                onChange={checkboxChange('publicVisible')}
                label={'Public visible'}
            />
            <input
                type='number'
                placeholder='Order'
                value={order}
                onChange={inputChange('order')}
            />
            <button
                disabled={submitButtonDisabled}
                onClick={submit}
            >{'Save'}</button>
        </section>
    )
})
