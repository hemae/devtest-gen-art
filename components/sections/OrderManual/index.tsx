import {FC, memo} from 'react'
import styles from './OrderManual.module.scss'
import classNames from 'classnames'
import {Section, UserSectionData} from '@apiModels/sections'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {OrderManual} from '@apiModels/sections/orderManual'
import {StepItem} from '@components/sections/OrderManual/StepItem'
import {LinkMarkdown} from '@appComponents'


type OrderManualComponentProps = {
    section: Section<UserSectionData<OrderManual>>
}

export const OrderManualComponent: FC<OrderManualComponentProps> = memo<OrderManualComponentProps>(({section}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {
        data: sectionData,
        backgroundImage,
        title,
        bottomTitle
    } = data

    const {items} = sectionData

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
                {[styles.background]: !backgroundImage}
            )}
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <h2>{title}</h2>
            <div className={styles.main__wrapper}>
                {items
                    .sort((step1, step2) => {
                        if (step1.order! > step2.order!) return 1
                        if (step1.order! < step2.order!) return -1
                        return 0
                    })
                    .map(step => {
                    return (
                        <StepItem
                            key={step.id}
                            id={step.id!}
                            imageSrc={step.src || ''}
                            title={step.title}
                            order={step.order!}
                        />
                    )
                })}
            </div>
            <LinkMarkdown notNextLink>{bottomTitle}</LinkMarkdown>
        </section>
    )
})
