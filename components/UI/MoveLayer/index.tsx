import {Dispatch, memo, SetStateAction} from 'react'
import styles from './MoveLayer.module.scss'
import useMoveLayer from '@UI/MoveLayer/useMoveLayer'


type MoveLayerProps = {
    parentOffsetX?: number | null
    parentOffsetY?: number | null
    parentWidth?: number | null
    parentHeight?: number | null
    initialX?: number | null
    initialY?: number | null
    setTargetX?: Dispatch<SetStateAction<number>>
    setTargetY?: Dispatch<SetStateAction<number>>
    nullableX?: boolean
    nullableY?: boolean
    downHandler?: () => void
    upHandler?: () => void
    setDownX?: Dispatch<SetStateAction<number | null>>
    setDownY?: Dispatch<SetStateAction<number | null>>
    blockScroll?: boolean
}

export const MoveLayer = memo<MoveLayerProps>((props) => {

    const {
        parentOffsetX,
        parentOffsetY,
        parentWidth,
        parentHeight,
        initialX,
        initialY,
        setTargetX,
        setTargetY,
        setDownX,
        setDownY,
        nullableX,
        nullableY,
        downHandler,
        upHandler,
        blockScroll = true
    } = props

    const {
        layerDown,
        layerMove,
        layerUp,
        layerTouchStart,
        layerTouchMove,
        layerTouchEnd,
    } = useMoveLayer({
        parentOffsetX,
        parentOffsetY,
        parentWidth,
        parentHeight,
        initialX,
        initialY,
        setTargetX,
        setTargetY,
        nullableX,
        nullableY,
        downHandler,
        upHandler,
        setDownX,
        setDownY,
        blockScroll
    })

    return (
        <div
            className={styles.main}
            onMouseDown={layerDown}
            onMouseUp={layerUp}
            onMouseMove={layerMove}
            onTouchStart={layerTouchStart}
            onTouchEnd={layerTouchEnd}
            onTouchMove={layerTouchMove}
        />
    )
})
