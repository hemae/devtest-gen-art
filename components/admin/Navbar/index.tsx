import {FC} from 'react'
import styles from './Navbar.module.scss'
import navbarData from '@adminData/navbar'
import {NavbarLink} from '@admin/NavbarLink'
import useNavbar from '@admin/Navbar/useNavbar'
import classNames from 'classnames'
import {useAppSelector} from '@store'


export const Navbar: FC = () => {

    const {
        active,
        toggleClick,
        navbarEnter,
        navbarLeave
    } = useNavbar()

    const {touchableDevice} = useAppSelector(state => state.settingsReducer)

    return (
        <nav
            onMouseEnter={navbarEnter}
            onMouseLeave={navbarLeave}
            className={classNames(
                styles.main,
                {[styles.active]: active},
                {[styles.nonTouchable]: !touchableDevice}
            )}
        >
            {touchableDevice &&
            <button
                onClick={toggleClick}
            >{active ? '<' : '>'}</button>}
            {navbarData.map(link => {
                return (
                    <NavbarLink
                        key={link.path}
                        link={link}
                    />
                )
            })}
        </nav>
    )
}
