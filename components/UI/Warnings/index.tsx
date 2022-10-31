import {memo} from 'react'
import styles from './Warnings.module.scss'
import classNames from 'classnames'
import useWarnings from '@components/UI/Warnings/useWarnings'
import {ErrorType} from '@apiModels/error'


type WarningsProps = {
    text: string
    type: 'error' | 'notice'
    setError: (error: ErrorType | null) => void
    setNotice?: (notice: string) => void
}

export const Warnings = memo<WarningsProps>((props) => {

    const {
        text,
        type,
        setError,
        setNotice
    } = props

    const {
        isWarningsShown
    } = useWarnings({setError, setNotice, text})

    return (
        <div
            className={styles.warningsContainer}
        >
            <div
                className={classNames(
                    styles.warnings,
                    type === 'error' ? styles.error : styles.notice,
                    {[styles.active]: isWarningsShown && !!text}
                )}
            >
                <span>{text}</span>
            </div>
        </div>
    )
})
