import {FC, HTMLAttributes, memo, DetailedHTMLProps, TextareaHTMLAttributes} from 'react'
import styles from './Textarea.module.scss'
import {Divider} from '@UI'
import classNames from 'classnames'
import useInputFocus from '@hooks/useInputFocus'


export const Textarea: FC<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = memo<HTMLAttributes<HTMLTextAreaElement>>((props) => {

    const {
        active,
        focus,
        blur
    } = useInputFocus<HTMLTextAreaElement>()

    return (
        <div
            className={classNames(
                styles.main,
                {[styles.active]: active}
            )}
        >
            <textarea
                {...props}
                onFocus={focus}
                onBlur={blur}
            />
            <Divider/>
        </div>
    )
})
