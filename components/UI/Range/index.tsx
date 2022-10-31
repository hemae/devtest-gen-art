import {memo} from 'react'
import styles from './Range.module.scss'
import {$primary, $lightGrey} from '@styles/colors'
import classNames from 'classnames'


type RangeProps = {
    value: number
    setValue: (value: number) => void
    disabled?: boolean
    from: number
    upto: number
    step?: number
    iconPrefix?: JSX.Element
    iconSuffix?: JSX.Element

    setActive?: (value: boolean) => void
}

export const Range = memo<RangeProps>((props) => {

    const {
        value,
        setValue,
        disabled = false,
        from,
        upto,
        step,
        iconPrefix,
        iconSuffix,
        setActive
    } = props

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(+event.target.value)
    }

    const localStep = step || (upto - from) / 200

    const normalizedValue = (value - from) / (upto - from) * 100

    const onMouseDown = (): void => {
        if (setActive) {
            setActive(true)
        }
    }

    const onMouseUp = (): void => {
        if (setActive) {
            setActive(false)
        }
    }

    return (
        <div className={classNames(
            styles.main,
            {[styles.prefix]: !!iconPrefix},
            {[styles.suffix]: !!iconSuffix},
            {[styles.disabled]: disabled}
        )}>
            {iconPrefix}
            <input type='range'
                   min={from}
                   max={upto}
                   step={localStep}
                   value={value}
                   onChange={onValueChange}
                   disabled={disabled}
                   style={{
                       background: `linear-gradient(to left, ${$lightGrey} ${100 - normalizedValue}%, ${$primary} ${100 - normalizedValue}%)`
                   }}
                   onMouseDown={onMouseDown}
                   onMouseUp={onMouseUp}
            />
            {iconSuffix}
        </div>
    )
})
