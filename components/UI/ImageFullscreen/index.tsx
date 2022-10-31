import {memo, MouseEventHandler} from 'react'
import styles from './ImageFullscreen.module.scss'
import useImageFullscreen from '@components/UI/ImageFullscreen/useImageFullscreen'
import classNames from 'classnames'


type ImageFullscreenProps = {
    src: string
    hideHandler: MouseEventHandler
}

export const ImageFullscreen = memo<ImageFullscreenProps>((props) => {

    const {
        src,
        hideHandler
    } = props

    const {
        shown,
        hideClick
    } = useImageFullscreen({hideHandler})

    return (
        <section
            className={classNames(
                styles.main,
                {[styles.shown]: shown}
            )}
            onClick={hideClick}
        >
            <div
                id='fullscreen-image'
            >
                <img
                    src={src}
                    alt={`testimonial-fullscreen-image`}
                />
            </div>
        </section>
    )
})
