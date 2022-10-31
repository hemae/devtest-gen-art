import {memo, MouseEventHandler} from 'react'
import styles from './DeleteButton.module.scss'


type DeleteButtonProps = {
    onClick: MouseEventHandler
}

export const DeleteButton = memo<DeleteButtonProps>((props) => {

    const {
        onClick
    } = props

    return (
        <button
            id='delete'
            onClick={onClick}
            type='button'
            className={styles.main}
        >&times;</button>
    )
})
