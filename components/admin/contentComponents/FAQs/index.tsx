import {FC} from 'react'
import useFAQs from '@admin/contentComponents/FAQs/useFAQs'
import {FAQForm} from '@admin'


export const FAQs: FC = () => {

    const {faq} = useFAQs()

    return (
        <>
            {faq.map(f => {
                return (
                    <FAQForm
                        key={f.id}
                        faq={f}
                    />
                )
            })}
            <FAQForm
                key='new-faq'
            />
        </>
    )
}
