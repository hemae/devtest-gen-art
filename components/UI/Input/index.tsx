import {FC, HTMLAttributes, memo, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './Input.module.scss'
import {Divider} from '@UI'
import classNames from 'classnames'
import useInputFocus from '@hooks/useInputFocus'


export const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = memo<HTMLAttributes<HTMLInputElement>>((props) => {

    const {
        active,
        focus,
        blur
    } = useInputFocus<HTMLInputElement>()

    return (
        <div
            className={classNames(
                styles.main,
                {[styles.active]: active}
            )}
        >
            <input
                {...props}
                onFocus={focus}
                onBlur={blur}
            />
            <Divider/>
        </div>
    )
})
