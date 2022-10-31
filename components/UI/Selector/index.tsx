import {memo} from 'react'
import styles from './Selector.module.scss'
import {UniqueId} from '@apiModels/common'
import classNames from 'classnames'


type SelectorOption = {
    id: UniqueId | undefined
    title: string
    keyValue: string
}

type SelectorProps = {
    id?: UniqueId
    options: SelectorOption[]
    optionHandler?: (keyValue: string) => void
    className?: string
}

export const Selector = memo<SelectorProps>((props) => {

    const {
        id,
        options,
        optionHandler,
        className
    } = props

    const optionClick = (keyValue: string) => (): void => {
        if (optionHandler) optionHandler(keyValue)
    }

    return (
        <section
            id={id || 'selector'}
            className={classNames(
                styles.main,
                className
            )}>
            {options.map(option => {
                return (
                    <button
                        key={option.id}
                        onClick={optionClick(option.keyValue)}
                    >{option.title}</button>
                )
            })}
        </section>
    )
})
