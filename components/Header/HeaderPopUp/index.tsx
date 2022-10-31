import {memo} from 'react'
import styles from './HeaderPopUpProps.module.scss'
import classNames from 'classnames'
import {HeaderLink} from '@components'
import useSettings from '@exoticHooks/useSettings'
import {SectionHeaderLink, HeaderLink as HeaderLinkType} from '@apiModels/layouts/header'
import useHeaderPopUp from '@components/Header/HeaderPopUp/useHeaderPopUp'
import useExternalClick from '@hooks/useExternalClick'


type HeaderPopUpProps = {
    isHeaderHidden: boolean
    menuShown: boolean
    setHidden: () => void
    sectionHeaders: SectionHeaderLink[]
    links: HeaderLinkType[]
}

export const HeaderPopUp = memo<HeaderPopUpProps>((props) => {

    const {
        isHeaderHidden,
        menuShown,
        sectionHeaders,
        setHidden,
        links
    } = props

    const {touchableDevice} = useSettings()

    const {inlineStyles} = useHeaderPopUp({menuShown})

    const {
        elementOver: popUpOver,
        elementLeave: popUpLeave
    } = useExternalClick({setElementNonactive: setHidden})

    return (
        <section
            className={classNames(
                styles.main,
                {[styles.active]: menuShown},
                {[styles.hidden]: !touchableDevice && isHeaderHidden}
            )}
            onMouseOver={popUpOver}
            onMouseLeave={popUpLeave}
            style={inlineStyles}
        >
            <div>
                <div>
                    {sectionHeaders.map(sectionHeaderLink => {
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
                </div>
                {links.filter(link => !link.scrollTo).map(link => {
                    return (
                        <HeaderLink
                            key={link.id}
                            id={link.id!}
                            order={link.order!}
                            title={link.title}
                            url={link.url}
                        />
                    )
                })}
            </div>
        </section>
    )
})
