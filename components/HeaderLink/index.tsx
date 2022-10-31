import {memo, MutableRefObject} from 'react'
import styles from './HeaderLink.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {UniqueId, UniqueNum} from '@apiModels/common'
import Link from 'next/link'
import useHeaderLink from '@components/HeaderLink/useHeaderLink'


type HeaderLinkProps = {
    id: UniqueId
    order: UniqueNum
    title: string
    sectionId?: string | null
    scrollTo?: string | null
    url?: string | null
}

export const HeaderLink = memo<HeaderLinkProps>((props) => {

    const {
        id,
        order,
        title,
        sectionId,
        scrollTo,
        url
    } = props

    const {root} = useAdditionalAttributes<HTMLAnchorElement | HTMLSpanElement>({
        'data-id': `header-link-${id}`,
        'order': order
    })

    const {linkClick} = useHeaderLink({sectionId, scrollTo})

    if (url) return (
        <Link
            href={url}
        ><a
            className={styles.main}
            ref={root as MutableRefObject<HTMLAnchorElement>}
        >{title}</a></Link>
    )

    return (
        <span
            ref={root}
            className={styles.main}
            onClick={linkClick}
        >{title}</span>
    )
})
