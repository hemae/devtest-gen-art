import {memo} from 'react'
import styles from './PurchaseQuestionSection.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {PurchaseQuestionSection as PurchaseQuestionSectionType} from '@apiModels/purchaseQuestionsSection'
import {Divider} from '@UI'


type PurchaseQuestionSectionProps = {
    section: PurchaseQuestionSectionType
}

export const PurchaseQuestionSection = memo<PurchaseQuestionSectionProps>((props) => {

    const {
        section
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `purchase-question-section-${section.id}`,
        'order': section.order
    })

    return (
        <section
            ref={root}
            className={styles.main}
        >
            <h3>{section.data.title}</h3>
            <p>{section.data.description}</p>
            <Divider/>
        </section>
    )
})
