import {memo} from 'react'
import styles from './FullscreenImage.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ImageFullscreen} from '@UI'
import useFullscreenImage from '@UI/FullscreenImage/useFullscreenImage'
import classNames from 'classnames'


type FullscreenImageProps = {
    id?: string
    className?: string
    src: string
    alt: string
}

export const FullscreenImage = memo<FullscreenImageProps>((props) => {

    const {
        id,
        className,
        src,
        alt
    } = props

    const {root} = useAdditionalAttributes({'data-id': `fullscreen-image-${src}`})

    const {
        active,
        activeClick
    } = useFullscreenImage()

    return (
        <>
            <div
                ref={root}
                className={classNames(styles.main, className)}
            >
                <img
                    id={id}
                    onClick={activeClick}
                    src={src}
                    alt={alt}
                />
            </div>
            {active && <ImageFullscreen src={src} hideHandler={activeClick}/>}
        </>
    )
})
