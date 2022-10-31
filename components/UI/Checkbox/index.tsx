import {memo, MouseEventHandler, useState} from 'react'
import styles from './Checkbox.module.scss'
import CheckboxSVG from '../../../assets/icons/checkbox.svg'
import CheckboxCheckedSVG from '../../../assets/icons/checkbox-checked.svg'
import classNames from 'classnames'


export type CheckboxProps = {
    onChange: MouseEventHandler
    checked: boolean
    disabled?: boolean
    label?: string | JSX.Element
}

export const Checkbox = memo<CheckboxProps>((props) => {

    const {
        checked,
        onChange,
        label
    } = props

    const [isChecked, setIsChecked] = useState<boolean>(false)

    const onCheckboxMouseDown: MouseEventHandler = (): void => {
        setIsChecked(true)
    }

    const onCheckboxMouseUp: MouseEventHandler = (event): void => {
        setIsChecked(false)
    }

    const onCheckboxClick: MouseEventHandler = (event): void => {
        event.stopPropagation()
        onChange(event)
    }

    return (
        <div className={styles.checkbox}>
            <div
                className={classNames(
                    styles.checkbox__box,
                    {[styles.checked]: checked},
                    {[styles.notChecked]: !checked},
                    {[styles.isChecked]: isChecked},
                )}
                onClick={onCheckboxClick}
                onMouseDown={onCheckboxMouseDown}
                onMouseUp={onCheckboxMouseUp}
            >
                <CheckboxSVG/>
                <CheckboxCheckedSVG/>
            </div>
            {label && <span className={styles.checkbox__label}>{label}</span>}
        </div>
    )
})
