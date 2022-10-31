import {memo} from 'react'
import styles from './RangeTools.module.scss'
import * as BsIcons from 'react-icons/bs'
import {ImageParamNames} from '@components/UI/Uploader/ImageEditor'
import {Range} from '@components/UI'


type RangeToolsProps = {
    setRotation: (value: boolean) => void
    scale: number
    brightness: number
    contrast: number
    saturate: number
    rotate: number
    onImageParamsChange: (name: ImageParamNames) => (value: number) => void
}

export const RangeTools = memo<RangeToolsProps>((props) => {

    const {
        setRotation,
        scale,
        brightness,
        contrast,
        saturate,
        rotate,
        onImageParamsChange
    } = props

    return (
        <div className={styles.main}>
            <Range
                value={scale}
                from={0.01}
                step={0.01}
                upto={3}
                setValue={onImageParamsChange('scale')}
                iconPrefix={<BsIcons.BsFillRecordFill/>}
                iconSuffix={<BsIcons.BsFillCircleFill/>}
            />
            <Range
                value={brightness}
                from={0}
                upto={200}
                setValue={onImageParamsChange('brightness')}
                iconPrefix={<BsIcons.BsFillPersonFill/>}
                iconSuffix={<BsIcons.BsPerson/>}
            />
            <Range
                value={contrast}
                from={0}
                upto={200}
                setValue={onImageParamsChange('contrast')}
                iconPrefix={<BsIcons.BsFillSquareFill/>}
                iconSuffix={<BsIcons.BsDice5Fill/>}
            />
            <Range
                value={saturate}
                from={0}
                upto={200}
                setValue={onImageParamsChange('saturate')}
                iconPrefix={<BsIcons.BsDroplet/>}
                iconSuffix={<BsIcons.BsDropletHalf/>}
            />
            <Range
                value={rotate}
                from={-180}
                upto={180}
                step={1}
                setValue={onImageParamsChange('rotate')}
                iconPrefix={<BsIcons.BsArrowCounterclockwise/>}
                iconSuffix={<BsIcons.BsArrowClockwise/>}
                setActive={setRotation}
            />
        </div>
    )
})
