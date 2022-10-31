import {FC, memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Switcher} from '@UI'
import {DeleteButton} from '@admin/DeleteButton'
import {AdminSectionData, Section, SectionDataTypeList} from '@apiModels/sections'
import useSectionForm from '@admin/SectionForm/useSectionForm'
import sectionTypes from '@adminData/sections/sectionTypes'
import classNames from 'classnames'
import SectionForms from '../sectionForms'


type SectionFormProps = {
    section?: Section<AdminSectionData<SectionDataTypeList>>
}

export const SectionForm = memo<SectionFormProps>((props) => {

    const {
        section
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `section-form-${section ? section.id : 'new'}`
    })

    const {
        submitButtonDisabled,
        submit,
        type,
        order,
        expandingButtonUrl,
        publicVisible,
        inputChange,
        selectChange,
        checkboxChange,
        deleteClick
    } = useSectionForm({initialData: section})

    let SectionFormComponent: FC<{section?: Section<AdminSectionData<SectionDataTypeList>>}> | null
        = type ? SectionForms[type] : null

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {section && <DeleteButton onClick={deleteClick}/>}
            <select
                value={type || 'Section type'}
                onChange={selectChange('type')}
                className={classNames({placeholder: type === null})}
                disabled={!!section}
            >
                {[...sectionTypes, 'Section type'].map(sectionType => {
                    return (
                        <option
                            key={sectionType}
                        >{sectionType}</option>
                    )
                })}
            </select>
            <input
                type='number'
                placeholder='Order'
                value={order}
                onChange={inputChange('order')}
            />
            <input
                placeholder='Expanding button url'
                value={expandingButtonUrl}
                onChange={inputChange('expandingButtonUrl')}
            />
            <Switcher
                checked={publicVisible}
                onChange={checkboxChange('publicVisible')}
                label={'Public visible'}
            />
            <button
                disabled={submitButtonDisabled}
                onClick={submit}
            >{'Save'}</button>

            {SectionFormComponent && <SectionFormComponent section={section}/>}
        </section>
    )
})
