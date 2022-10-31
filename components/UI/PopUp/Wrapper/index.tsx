import {memo, MouseEventHandler, useCallback, useEffect, useState} from 'react'
import styles from './PopUpWrapper.module.scss'
import classNames from 'classnames'
import Modal from '../Modal'
import {closePopUp} from '@slices/popUps'
import {Close} from '@UI'
import {useAppDispatch} from '@store'

//@ts-ignore
export default memo(({children}) => {

    const dispatch = useAppDispatch()

    const [mounted, setMounted] = useState<boolean>(false)
    const [backgroundMounted, setBackgroundMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            setBackgroundMounted(true)
        } else {
            setBackgroundMounted(false)
        }
    }, [mounted])

    const closeHandler: MouseEventHandler = useCallback((event): void => {
        setMounted(false)
        setTimeout(() => {
            dispatch(closePopUp())
        }, 250)
        event.stopPropagation()
    }, [setMounted, dispatch])

    return (
        <>
            <section
                className={classNames(
                    styles.background,
                    {[styles.mounted]: backgroundMounted}
                )}
            />
            <section
                onClick={closeHandler}
                className={classNames(
                    styles.popUpWrapper,
                    {[styles.mounted]: mounted}
                )}
            >
                <Modal
                    onClick={(event) => event.stopPropagation()}
                >
                    <Close onClick={closeHandler}/>
                    {children}
                </Modal>
            </section>
        </>
    )
})
