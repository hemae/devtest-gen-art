import {TouchEvent, MouseEvent, memo, useEffect, useState} from 'react'
import {ImageParams, LiveImagePosition} from '@UI/Uploader/ImageEditor'
import styles from './Drag.module.scss'


type DragProps = {
    imageParams: ImageParams
    setImageParams: (imageParams: ImageParams) => void
    liveImagePosition: LiveImagePosition
    setLiveImagePosition: (liveImagePosition: LiveImagePosition) => void
}

export const Drag = memo<DragProps>((props) => {

    const {
        imageParams, setImageParams,
        liveImagePosition, setLiveImagePosition
    } = props

    const [mouseDown, setMouseDown] = useState<boolean>(false)
    const [mouseDownX, setMouseDownX] = useState<number>(0)
    const [mouseDownY, setMouseDownY] = useState<number>(0)

    useEffect(() => {
        if (mouseDown) {
            document.querySelector('body')!.style.overflow = 'hidden'
        } else {
            document.querySelector('body')!.style.overflow = 'auto'
        }
    }, [mouseDown])

    const onMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
        setMouseDown(true)
        setMouseDownX(event.nativeEvent.offsetX)
        setMouseDownY(event.nativeEvent.offsetY)
    }

    const onMouseUp = (event: MouseEvent<HTMLDivElement>): void => {
        setMouseDown(false)
        setImageParams({
            ...imageParams,
            positionX: liveImagePosition.x,
            positionY: liveImagePosition.y
        })
    }

    const onMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
        if (mouseDown) {
            setLiveImagePosition({
                ...liveImagePosition,
                x: (event.nativeEvent.offsetX - mouseDownX + imageParams.positionX),
                y: (event.nativeEvent.offsetY - mouseDownY + imageParams.positionY)
            })
        }
    }

    const onMouseLeave = (): void => {
        setMouseDown(false)
    }

    const onTouchStart = (event: TouchEvent<HTMLDivElement>): void => {
        setMouseDown(true)
        setMouseDownX(event.touches[0].clientX)
        setMouseDownY(event.touches[0].clientY)
    }

    const onTouchEnd = (event: TouchEvent<HTMLDivElement>): void => {
        setMouseDown(false)
        setImageParams({
            ...imageParams,
            positionX: liveImagePosition.x,
            positionY: liveImagePosition.y
        })
    }

    const onTouchMove = (event: TouchEvent<HTMLDivElement>): void => {
        if (mouseDown) {
            setLiveImagePosition({
                ...liveImagePosition,
                x: (event.touches[0].clientX - mouseDownX + imageParams.positionX),
                y: (event.touches[0].clientY - mouseDownY + imageParams.positionY)
            })
        }
    }

    const onTouchCancel = (): void => {
        setMouseDown(false)
    }

    return (
        <div
            className={styles.main}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            onTouchCancel={onTouchCancel}
        />
    )
})
