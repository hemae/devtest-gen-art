import {memo, useState, MouseEventHandler, useCallback} from 'react'
import styles from './Switcher.module.scss'
import classNames from 'classnames'


type SwitcherProps = {
    onChange: MouseEventHandler
    checked: boolean | string
    disabled?: boolean
    label?: string
}

export const Switcher = memo<SwitcherProps>((props) => {

    const {
        onChange,
        checked,
        disabled = false,
        label
    } = props

    const [isChecked, setIsChecked] = useState<boolean>(false)

    const onSwitchClick: MouseEventHandler = useCallback((event): void => {
        if (!disabled) {
            setIsChecked(true)
            onChange(event)
            setTimeout(() => {
                setIsChecked(false)
            }, 150)
        }
    }, [disabled, setIsChecked, onChange])

    return (
        <div
            className={styles.checkboxSwitcherContainer}
        >
            <div
                className={classNames(
                    styles.checkboxSwitcher,
                    {[styles.notCheck]: !checked},
                    {[styles.checked]: isChecked},
                    {[styles.disabled]: disabled}
                )}
                onClick={onSwitchClick}
            >
                <div
                    className={classNames(
                        styles.checkboxSwitcher__toggle,
                        {[styles.active]: checked}
                    )}
                >
                </div>
            </div>
            {label && <span>{label}</span>}
        </div>
    )
})
