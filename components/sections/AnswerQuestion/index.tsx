import {FC, memo} from 'react'
import styles from './QuestionAnswer.module.scss'
import classNames from 'classnames'
import {ExpandingButton, useExpandingButton} from '@UI'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Section, UserSectionData} from '@apiModels/sections'
import {FAQ} from '../../FAQ'
import {QuestionAnswer as QuestionAnswerType} from '@apiModels/sections/questionAnswer'
import {FAQ as FAQType} from '@apiModels/faq'


type QuestionAnswerProps = {
    section: Section<UserSectionData<QuestionAnswerType>>
    faqs: FAQType[]
}

export const QuestionAnswerComponent: FC<QuestionAnswerProps> = memo<QuestionAnswerProps>(({faqs, section}) => {

    const {
        id,
        order,
        expandingButtonUrl,
        data,
        type
    } = section

    const {
        title,
        expandingButtonTitle,
        backgroundImage
    } = data

    const {
        expandingButtonClick,
        expandingButtonHidden,
        visibleItems
    } = useExpandingButton<FAQType>({items: faqs, pageSize: 3})

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    return (
        <section
            id={id}
            ref={root}
            className={classNames(
                styles.main,
                {[styles.expandingButtonHidden]: expandingButtonHidden}
            )}
        >
            <section className={styles.main__backgroundWrapper}>
                <section
                    className={styles.main__background}
                    style={{backgroundImage: `url(${backgroundImage})`}}
                />
            </section>
            <h2>{title}</h2>
            <div className={styles.main__itemsWrapper}>
                {visibleItems.map(faq => {
                    return (
                        <FAQ
                            key={faq.id}
                            faq={faq}
                        />
                    )
                })}
            </div>
            <ExpandingButton
                id='question-answer-show-more-button'
                title={expandingButtonTitle!}
                clickHandler={expandingButtonClick}
                expandingButtonUrl={expandingButtonUrl}
            />
        </section>
    )
})
