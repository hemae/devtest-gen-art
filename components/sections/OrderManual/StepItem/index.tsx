import {memo} from 'react'
import styles from './StepItem.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {UniqueId} from '@apiModels/common'


type StepItemProps = {
    id: UniqueId
    order: number
    title: string
    imageSrc: string
}

export const StepItem = memo<StepItemProps>((props) => {

    const {
        id,
        order,
        title,
        imageSrc
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `order-manual-step-${id}`,
        'order': order
    })

    return (
        <div
            ref={root}
            className={styles.main}
        >
            <div className={styles.main__number}>{order}</div>
            <div className={styles.main__picture}><img src={imageSrc} alt='step-image'/></div>
            <p>{title}</p>
        </div>
    )
})
