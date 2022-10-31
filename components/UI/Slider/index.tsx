import {Dispatch, FC, memo, SetStateAction} from 'react'
import styles from './Slider.module.scss'
import useSlider from '@UI/Slider/useSlider'
import {MoveLayer, TabSwitcher} from '@UI'
import {UniqueNum} from '@apiModels/common'


type SliderProps = {
    id?: string
    children?: JSX.Element[]
    sensibility?: number
    autoPeriod?: number
    setExternalPosition?: Dispatch<SetStateAction<number>>
}

export const Slider: FC<SliderProps> = memo<SliderProps>((props) => {

    const {
        id,
        children,
        sensibility,
        autoPeriod,
        setExternalPosition
    } = props

    const {
        slider,
        sliderOffsetX,
        sliderWidth,
        setX,
        setDownX,
        sliderContainer,
        upHandler,
        downHandler,
        currentPosition,
        setCurrentPosition,
        prevHandler,
        nextHandler
    } = useSlider({childrenCount: children?.length || 0, sensibility, autoPeriod, setExternalPosition})

    return (
        <div
            className={styles.main}
            id={id || 'slider'}
            ref={sliderContainer}
        >
            <div
                className={styles.main__slider}
                ref={slider}
            >
                <div
                    className={styles.main__slidesWrapper}
                >{children}</div>
            </div>
            <MoveLayer
                parentOffsetX={sliderOffsetX}
                parentWidth={sliderWidth}
                setTargetX={setX}
                setDownX={setDownX}
                upHandler={upHandler}
                downHandler={downHandler}
                blockScroll={false}
                nullableX
            />
            <TabSwitcher
                tabs={children?.map((child, index) => ({order: index})) || []}
                currentTab={currentPosition}
                setCurrentTab={setCurrentPosition}
                prevHandler={prevHandler}
                nextHandler={nextHandler}
            />
        </div>
    )
})
