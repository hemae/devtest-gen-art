import Link from 'next/link'
import styles from './LinkMarkdown.module.scss'


type Options = {
    id?: string
    string: string | undefined
    isNewWindow: boolean
    notNextLink: boolean
}

type Returned = JSX.Element

function linkHandler(options: Options): Returned {

    const {
        id,
        string,
        isNewWindow,
        notNextLink
    } = options

    if (!string) return <></>

    if (!~string.indexOf('[')) return <p>{string}</p>

    let separatedString = string
        .split(/[\[\]()]/)
        .filter(el => !!el)

    if (separatedString.length === 2) separatedString = ['', ...separatedString]

    if (isNewWindow) {
        return (
            <p
                id={id}
                className={styles.main}
            >
                {separatedString[0]}
                <a
                    href={separatedString[2]}
                    target='_blank'
                >{separatedString[1]}</a>
                {separatedString.slice(3).join(' ')}
            </p>
        )
    }

    if (notNextLink) {
        return (
            <p
                id={id}
                className={styles.main}
            >
                {separatedString[0]}
                <a href={separatedString[2]}>{separatedString[1]}</a>
                {separatedString.slice(3).join(' ')}
            </p>
        )
    }

    return (
        <p
            id={id}
            className={styles.main}
        >
            {separatedString[0]}
            <Link
                href={separatedString[2]}>
                <a>{separatedString[1]}</a>
            </Link>
            {separatedString.slice(3).join(' ')}
        </p>
    )
}

export default linkHandler
