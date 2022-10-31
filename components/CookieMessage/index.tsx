import {memo} from 'react'
import styles from './CookieMessage.module.scss'
import {CookieMessage as CookieMessageType} from '@apiModels/layouts/cookieMessage'
import useCookieMessage from '@components/CookieMessage/useCookieMessage'
import {LinkMarkdown} from '@appComponents'


type CookieMessageProps = {
    cookieMessage?: CookieMessageType
}

export const CookieMessage = memo<CookieMessageProps>((props) => {

    const {
        cookieMessage
    } = props

    const {
        isCookieMessageShown,
        acceptCookieClick
    } = useCookieMessage()

    if (!isCookieMessageShown || !cookieMessage) return <></>

    return (
        <aside
            className={styles.main}
        >
            <LinkMarkdown isNewWindow>{cookieMessage.cookieMessage}</LinkMarkdown>
            <button
                onClick={acceptCookieClick}
            >{cookieMessage.acceptButtonTitle}</button>
        </aside>
    )
})
