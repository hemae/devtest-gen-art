import React, {FC, useEffect, useState} from 'react'
import styles from './LoaderFullScreen.module.scss'
import classNames from 'classnames'
import {Loader} from '@components/UI'
import useAppLoading from '@exoticHooks/useAppLoading'


export const LoaderFullScreen: FC = () => {

    const [isShown, setIsShown] = useState<boolean>(false)

    useEffect(() => {
        setIsShown(true)
    }, [])

    return (
        <section
            className={classNames(
                styles.main,
                {[styles.isShown]: isShown}
            )}
        ><Loader/></section>
    )
}

export const AppLoader: FC = () => {
    const {isAppLoading} = useAppLoading()
    return <>{isAppLoading ? <LoaderFullScreen/> : <></>}</>
}
