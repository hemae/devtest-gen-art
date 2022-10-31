import {FC} from 'react'
import useSections from '@admin/contentComponents/Sections/useSections'
import {SectionForm} from '@admin'


export const Sections: FC = () => {

    const {sections} = useSections()

    return (
        <>
            {sections.map(section => {
                return (
                    <SectionForm
                        key={section.id}
                        section={section}
                    />
                )
            })}
            <SectionForm
                key='new-section'
            />
        </>
    )
}
