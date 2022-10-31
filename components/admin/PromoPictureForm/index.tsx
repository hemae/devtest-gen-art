import {memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Switcher} from '@UI'
import {useAppSelector} from '@store'
import {DeleteButton} from '@admin/DeleteButton'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'
import usePromoPictureForm from '@admin/PromoPictureForm/usePromoPictureForm'
import {PromoPictureLanguageForm} from '@admin/PromoPictureForm/PromoPictureLanguageForm'


type PromoPictureFormProps = {
    promoPicture?: PromoPicture<AdminPromoPicture>
}

export const PromoPictureForm = memo<PromoPictureFormProps>((props) => {

    const {
        promoPicture
    } = props

    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    const {root} = useAdditionalAttributes({
        'data-id': `promo-picture-form-${promoPicture ? promoPicture.id : 'new'}`
    })

    const {
        submitButtonDisabled,
        submit,
        publicVisible,
        checkboxChange,
        deleteClick,
        inputChange,
        order
    } = usePromoPictureForm({initialData: promoPicture})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {promoPicture && <DeleteButton onClick={deleteClick}/>}
            {acceptLanguages?.map(language => language.data.locale)
                .map(key => {
                    return (
                        <PromoPictureLanguageForm
                            key={key}
                            locale={key}
                            promoPicture={promoPicture}
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
