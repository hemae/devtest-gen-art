import {memo, MouseEventHandler, useCallback, useState} from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames'
import useHeaderHiding from './useHeaderHiding'
import {Header as HeaderType} from '@apiModels/layouts/header'
import {Language} from '@apiModels/layouts/acceptLanguages'
import {HeaderLink} from '@components'
import router, {useRouter} from 'next/router'
import {MenuToggle} from '@UI/MenuToggle'
import appRoutes from '@appRoutes'
import useSettings from '@exoticHooks/useSettings'
import {HeaderPopUp} from '@components/Header/HeaderPopUp'


type HeaderProps = {
    header: HeaderType | null | undefined
    acceptLanguages: Language[] | null | undefined
}

export const Header = memo<HeaderProps>(({header, acceptLanguages}) => {

    const {isHeaderHidden} = useHeaderHiding({boundaryValue: 150})

    const {touchableDevice} = useSettings()

    const [menuShown, setMenuShown] = useState<boolean>(false)

    if (!header) return <></>

    const toggleClick: MouseEventHandler = (event): void => {
        event.stopPropagation()
        setMenuShown(prev => !prev)
    }

    const {pathname} = useRouter()

    const logoClick: MouseEventHandler = useCallback((): void => {
        if (pathname !== appRoutes.index) router.push(appRoutes.index)
        else document.getElementById('__next')?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }, [pathname])

    const setHidden = (): void => {
        setMenuShown(false)
    }

    return (
        <>

            <header
                className={classNames(
                    styles.main,
                    {[styles.hidden]: !touchableDevice && isHeaderHidden && !menuShown}
                )}
            >
                <div>
                    {header.logoImage &&
                    <img
                        className={classNames({[styles.interactive]: true})}
                        src={header.logoImage}
                        alt='logo'
                        onClick={logoClick}
                    />}
                    {header.mainHeader &&
                    <h1
                        onClick={logoClick}
                        className={classNames({[styles.interactive]: true})}
                    >{header.mainHeader}</h1>}
                    {header.sectionHeaders?.length &&
                    <div className={styles.main__links}>
                        {header.sectionHeaders.map(sectionHeaderLink => {
                            return (
                                <HeaderLink
                                    key={sectionHeaderLink.id}
                                    id={sectionHeaderLink.id!}
                                    order={sectionHeaderLink.order!}
                                    title={sectionHeaderLink.data.title}
                                    sectionId={sectionHeaderLink.data.sectionId}
                                />
                            )
                        })}
                        {header.links.filter(link => !!link.scrollTo).map(link => {
                            return (
                                <HeaderLink
                                    key={link.id}
                                    id={link.id!}
                                    order={link.order!}
                                    title={link.title}
                                    scrollTo={link.scrollTo}
                                />
                            )
                        })}
                    </div>}
                    <MenuToggle
                        onClick={toggleClick}
                        active={menuShown}
                    />
                </div>
            </header>

            <HeaderPopUp
                isHeaderHidden={isHeaderHidden}
                menuShown={menuShown}
                setHidden={setHidden}
                sectionHeaders={header.sectionHeaders}
                links={header.links}
            />
        </>
    )
})
