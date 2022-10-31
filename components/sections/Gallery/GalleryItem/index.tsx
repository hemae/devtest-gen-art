import {memo, useCallback, useEffect, useState} from 'react'
import styles from './GalleryItem.module.scss'
import {PromoPicture} from '@apiModels/promoPicture'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import classNames from 'classnames'
import appRoutes from '@appRoutes'
import Link from 'next/link'
import {useAppSelector} from '@store'


type GalleryItemProps = {
    chooseButtonTitle?: string | null
    promoPicture: PromoPicture
}

export const GalleryItem = memo<GalleryItemProps>((props) => {

    const {
        chooseButtonTitle,
        promoPicture
    } = props

    const {
        id,
        order,
        data
    } = promoPicture

    const {
        mainImage,
        description
    } = data

    const [isAvers, setIsAvers] = useState<boolean>(true)
    const [transform, setTransform] = useState<boolean>(false)

    const {touchableDevice} = useAppSelector(state => state.settingsReducer)

    const {root} = useAdditionalAttributes({
        'data-id': `gallery-item-${id}`,
        'order': order
    })

    useEffect(() => {
        if (transform) {
            setTimeout(() => {
                setTransform(false)
            }, 200)
        }
    }, [transform])

    const mouseEnter = useCallback(() => {
        setTransform(true)
        setIsAvers(false)
    }, [setTransform])

    const mouseLeave = useCallback(() => {
        setTransform(true)
        setIsAvers(true)
    }, [setTransform])

    return (
        <div
            ref={root}
            className={styles.main}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >
            <div
                className={classNames(
                    {[styles.avers]: isAvers},
                    {[styles.reverse]: !isAvers},
                    {[styles.touchableDevice]: touchableDevice}
                )}
                style={{backgroundImage: `url(${mainImage})`}}
            >
                <div/>
                <p>{description}</p>
                <Link
                    href={`${appRoutes.orderRegistration}/${id}`}
                ><a>{chooseButtonTitle}</a></Link></div>
        </div>
    )
})
