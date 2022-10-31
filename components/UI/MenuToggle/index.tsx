import {memo, MouseEventHandler} from 'react'
import styles from './MenuToggle.module.scss'
import classNames from 'classnames'


type MenuToggleProps = {
    id?: string
    onClick: MouseEventHandler
    active: boolean
}

export const MenuToggle = memo<MenuToggleProps>((props) => {

    const {
        id,
        onClick,
        active
    } = props

    const click: MouseEventHandler = (event): void => {
        onClick(event)
    }

    return (
        <div
            id={id || 'menu-toggle'}
            className={classNames(
                styles.main,
                {[styles.active]: active}
            )}
            onClick={click}
        >
            <div/>
            <div/>
            <div/>
        </div>
    )
})
