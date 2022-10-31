import {FC} from 'react'
import linkHandler from './linkHandler'


type LinkMarkdownProps = {
    id?: string
    children: string | undefined
    isNewWindow?: boolean
    notNextLink?: boolean
}

export const LinkMarkdown: FC<LinkMarkdownProps> = (props) => {

    const {
        id,
        children,
        isNewWindow = false,
        notNextLink = false
    } = props

    return linkHandler({id, string: children, isNewWindow, notNextLink})
}
