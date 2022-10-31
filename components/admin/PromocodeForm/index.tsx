import {memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Promocode} from '@apiModels/promocode'
import usePromocodeForm from '@admin/PromocodeForm/usePromocodeForm'
import {Switcher} from '@UI'
import {DeleteButton} from '@admin/DeleteButton'


type PromocodeFormProps = {
    promocode?: Promocode
}

export const PromocodeForm = memo<PromocodeFormProps>((props) => {

    const {
        promocode
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `promocode-form-${promocode ? promocode.id : 'new'}`
    })

    const {
        name,
        promocodeBody,
        discount,
        expired,
        reusable,
        submit,
        inputChange,
        checkboxChange,
        deleteClick,
        submitButtonDisabled
    } = usePromocodeForm({initialData: promocode})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {promocode && <DeleteButton onClick={deleteClick}/>}
            <input
                placeholder='Name'
                value={name}
                onChange={inputChange('name')}
            />
            <input
                placeholder='Promocode'
                value={promocodeBody}
                onChange={inputChange('promocode')}
            />
            <input
                placeholder='discount'
                value={discount}
                onChange={inputChange('discount')}
            />
            <Switcher
                checked={expired}
                onChange={checkboxChange('expired')}
                label={'Expired'}
            />
            <Switcher
                checked={reusable}
                onChange={checkboxChange('reusable')}
                label={'reusable'}
            />
            <button
                disabled={submitButtonDisabled}
                onClick={submit}
            >{'Save'}</button>
        </section>
    )
})
