import {memo, MouseEventHandler, useCallback} from 'react'
import styles from './Footer.module.scss'
import {Footer as FooterType} from '@apiModels/layouts/footer'
import {HeaderLink} from '@components'
import {Contacts} from '@apiModels/layouts/contacts'
import router, {useRouter} from 'next/router'
import appRoutes from '@appRoutes'
import classNames from 'classnames'


type FooterProps = {
    footer: FooterType | null | undefined
    contacts: Contacts | null | undefined
}

export const Footer = memo<FooterProps>((props) => {

    const {footer, contacts} = props

    if (!footer) return <></>

    const {pathname} = useRouter()

    const logoClick: MouseEventHandler = useCallback((): void => {
        if (pathname !== appRoutes.index) router.push(appRoutes.index)
        else document.getElementById('__next')?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, [pathname])

    return (
        <footer
            id='footer'
            className={styles.main}
        >
            <img src={footer.backgroundImage} alt='footer-background-image'/>
            <div className={styles.main__container}>
            <div
                className={styles.main__links}
            >
                <>{footer.links.map(link => {
                    return (
                        <HeaderLink
                            key={link.id}
                            id={link.id!}
                            order={link.order!}
                            title={link.title}
                            url={link.url}
                            scrollTo={link.scrollTo}
                        />
                    )
                })}</>
                <>{footer.sectionHeaders.map(link => {
                    return (
                        <HeaderLink
                            key={link.id}
                            id={link.id!}
                            order={link.order!}
                            title={link.data.title}
                            sectionId={link.data.sectionId}
                        />
                    )
                })}</>
            </div>
            <div
                className={styles.main__contacts}
            >
                <h3
                    onClick={logoClick}
                    className={classNames({[styles.interactive]: true})}
                >{'GEN-ART'}</h3>
                <div>
                    <img
                        onClick={logoClick}
                        className={classNames({[styles.interactive]: true})}
                        src={footer.logoImage}
                        alt='footer-logo-image'/>
                </div>
                <div>
                    <a
                        href={contacts?.whatsApp.src}
                        title={contacts?.whatsApp.content || ''}
                        target='_blank'
                    ><img src='/whats-app.png' alt='social-icon-whats-app'/></a>
                    <a
                        title={contacts?.telegram.content || ''}
                        href={contacts?.telegram.src}
                        target='_blank'
                    ><img src='/telegram.png' alt='social-icon-telegram'/></a>
                </div>
                <div>
                    <a href={`mailto:${contacts?.email}`}>{contacts?.email}</a>
                    <a href={`tel:${contacts?.phoneNumber}`}>{contacts?.phoneNumber}</a>
                    <a>{contacts?.accessibility}</a>
                </div>
            </div>
            </div>
        </footer>
    )
})
