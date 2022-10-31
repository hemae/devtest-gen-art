import {memo} from 'react'
import styles from './ImageComparator.module.scss'
import useImageComparator from '@UI/ImageComparator/useImageComparator'
import classNames from 'classnames'
import {MoveLayer} from '@UI'


type ImageComparatorProps = {
    id?: string
    src1: string
    src2: string
    parentOffsetX?: number | null
}

export const ImageComparator = memo<ImageComparatorProps>((props) => {

    const {
        id,
        src1,
        src2,
        parentOffsetX
    } = props

    const {
        x,
        root,
        dividerWidth,
        rollerSize,
        width,
        rollerActive,
        setX,
        downHandler,
        upHandler,
        initialX
    } = useImageComparator()

    return (
        <div
            id={id || 'image-comparator'}
            ref={root}
            className={styles.main}
        >
            <div
                className={styles.main__1}
            ><img src={src1} alt='compared-image-1'/></div>
            <div
                className={styles.main__2}
                style={{width: `${100 - x}%`}}
            ><img
                src={src2}
                alt='compared-image-2'
                style={{
                    width: `${width}px`
                }}
            /></div>
            <div
                className={styles.main__divider}
                style={{
                    left: `calc(${x}% - ${(dividerWidth || 0) / 2}px)`,
                    width: `${dividerWidth || 0}px`
                }}
            >
                <div
                    className={classNames({[styles.active]: rollerActive})}
                    style={{
                        width: `${rollerSize || 0}px`,
                        height: `${rollerSize || 0}px`,
                        top: `calc(50% - ${(rollerSize || 0) / 2}px)`,
                        left: `calc(-${(rollerSize || 0) / 2}px + ${(dividerWidth || 0) / 2}px)`
                    }}
                >{'< >'}</div>
            </div>
            <MoveLayer
                parentOffsetX={parentOffsetX}
                parentWidth={width}
                setTargetX={setX}
                downHandler={downHandler}
                upHandler={upHandler}
                initialX={initialX}
            />
        </div>
    )
})
