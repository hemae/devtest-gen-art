import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styles from './ImageEditor.module.scss'
import {RangeTools} from './tools/RangeTools'
import {Drag} from './tools/Drag'
import frameWhite from '../../../../assets/images/frame-white.png'
import grid from '../../../../assets/images/grid.png'
import {ImageFile} from '../useImage'
// import {getResizedScale} from '@UI/Uploader/ImageEditor/helpers/resizeCalculator'
import classNames from 'classnames'


export type ImageParamNames = 'scale' | 'brightness' | 'contrast' | 'saturate' | 'positionX' | 'positionY' | 'rotate'

export type ImageParams = {
    scale: number
    brightness: number
    contrast: number
    saturate: number
    positionX: number
    positionY: number
    rotate: number
}

export type LiveImagePosition = {
    x: number
    y: number
}

type ImageEditorProps = {
    image: ImageFile | null
    link: string | null
}

export const ImageEditor = memo<ImageEditorProps>((props) => {

    const {
        image,
        link
    } = props

    if (!image && !link) {
        return <></>
    }

    const [imageDimensions, setImageDimensions] = useState<{
        imageWidth: number
        imageHeight: number
    } | null>(null)

    const [isRotationActive, setIsRotationActive] = useState<boolean>(false)

    const img = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        setImageDimensions({
            imageWidth: img?.current?.width as number,
            imageHeight: img?.current?.height as number
        })
    }, [img])

    const initialImageParams: ImageParams = useMemo(() => ({
        scale: 1,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        positionX: 0,
        positionY: 0,
        rotate: 0
    }), [imageDimensions])

    const initialLiveImagePosition: LiveImagePosition = {
        x: 0,
        y: 0
    }

    const [imageParams, setImageParams] = useState<ImageParams>(initialImageParams)
    const [liveImagePosition, setLiveImagePosition] = useState<LiveImagePosition>(initialLiveImagePosition)

    // useEffect(() => {
    //     const scale = getResizedScale({
    //         imageWidth: imageDimensions?.imageWidth as number,
    //         imageHeight: imageDimensions?.imageHeight as number,
    //         frameWidth: 300,
    //         frameHeight: 300
    //     })
    //     setImageParams({
    //         ...imageParams,
    //         positionX: - (imageDimensions?.imageWidth! - imageDimensions?.imageWidth! * scale) * scale,
    //         positionY: - (imageDimensions?.imageHeight! + imageDimensions?.imageHeight! * scale) * scale,
    //         scale
    //     })
    // }, [imageDimensions])

    const onImageParamsChange = (name: ImageParamNames) => useCallback((value: number): void => {
        setImageParams({...imageParams, [name]: value})
    }, [setImageParams, imageParams, name])

    const onSubmit = (): void => {
        console.log(imageParams)
    }

    // const initialScale = getResizedScale(image)

    return (
        <div className={styles.main}>
            <div
                className={classNames(
                    styles.main__container,
                    {[styles.rotation]: isRotationActive}
                )}
            >
                <img
                    ref={img}
                    src={image ? image.content as string : link || ''}
                    alt='user-image'
                    style={{
                        left: `${liveImagePosition.x}px`,
                        top: `${liveImagePosition.y}px`,
                        transform: `scale(${imageParams.scale}) rotate(${imageParams.rotate}deg)`,
                        filter: `
                            brightness(${imageParams.brightness}%)
                            contrast(${imageParams.contrast}%)
                            saturate(${imageParams.saturate}%)
                        `
                    }}
                />
                <img
                    src={frameWhite.src}
                    alt='frame'
                />
                <img
                    src={grid.src}
                    alt='grid'
                />
                <Drag
                    imageParams={imageParams}
                    setImageParams={setImageParams}
                    liveImagePosition={liveImagePosition}
                    setLiveImagePosition={setLiveImagePosition}
                />
            </div>

            <RangeTools
                scale={imageParams.scale}
                brightness={imageParams.brightness}
                contrast={imageParams.contrast}
                saturate={imageParams.saturate}
                rotate={imageParams.rotate}
                onImageParamsChange={onImageParamsChange}
                setRotation={setIsRotationActive}
            />
            {/*<button*/}
            {/*    onClick={onSubmit}*/}
            {/*>Submit</button>*/}
        </div>
    )
})
