import {memo, MouseEventHandler} from 'react'
import styles from './Close.module.scss'
import classNames from 'classnames'


type CloseProps = {
    id?: string
    onClick?: MouseEventHandler
    color?: 'dark' | 'light'
}

export const Close = memo<CloseProps>((props) => {

    const {
        id,
        onClick,
        color = 'dark'
    } = props

    return (
        <div
            id={id || 'popup-close'}
            className={classNames(
                styles.main,
                styles[color]
            )}
            onClick={onClick}
        ><div/><div/></div>
    )
})
