import {memo, MouseEventHandler} from 'react'
import styles from './ExpandingButton.module.scss'
import {UniqueId} from '@apiModels/common'
import Link from 'next/link'
import {Divider} from '@UI/Divider'


type ExpandingButtonProps = {
    id?: UniqueId
    title: string
    clickHandler: MouseEventHandler
    expandingButtonUrl?: string | null
}

export const ExpandingButton = memo<ExpandingButtonProps>((props) => {

    const {
        id,
        title,
        clickHandler,
        expandingButtonUrl
    } = props

    if (expandingButtonUrl) {
        return (
            <Link href={expandingButtonUrl}>
                <a
                    id={id}
                    className={styles.main}
                >
                    {title}
                    <Divider/>
                </a>
            </Link>
        )
    }

    return (
        <button
            id={id}
            className={styles.main}
            onClick={clickHandler}
        >
            {title}
            <Divider/>
        </button>
    )
})

export {useExpandingButton} from './useExpandingButton'
