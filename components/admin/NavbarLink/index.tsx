import {memo, useEffect, useState} from 'react'
import styles from './NavbarLink.module.scss'
import {Link} from '@adminData/navbar'
import LinkComponent from 'next/link'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import classNames from 'classnames'
import {useRouter} from 'next/router'


type NavbarLinkProps = {
    link: Link
}

export const NavbarLink = memo<NavbarLinkProps>((props) => {

    const {link} = props

    const {
        label,
        path,
        children,
        order
    } = link

    const {root} = useAdditionalAttributes({
        'data-path': path,
        'label': label,
        'order': order
    })

    const [isPathActive, setIsPathActive] = useState<boolean>(false)

    const {asPath} = useRouter()

    useEffect(() => {
        setIsPathActive(!!asPath.split('/').find(_path => _path.includes(path.slice(1))))
    }, [asPath])

    return (
        <div
            ref={root}
            className={classNames(
                styles.main,
                {[styles.active]: isPathActive}
            )}
        >
            <LinkComponent href={`/admin${path}`}>
                <a>{label}</a>
            </LinkComponent>
            <div>
                {children?.map(childLink => {
                    return (
                        <NavbarLink
                            key={childLink.path}
                            link={childLink}
                        />
                    )
                })}
            </div>
        </div>
    )
})
