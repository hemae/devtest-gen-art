import {FC, memo} from 'react'
import PopUpWrapper from './Wrapper'
import PopUpComponents, {PopUpType} from './PopUps'
import usePopUps from '@UI/PopUp/usePopUp'


export const PopUp = memo<{ renderingComponent: PopUpType }>(
    ({renderingComponent}) => {

        const RenderingComponent = PopUpComponents[renderingComponent]

        return (
            <PopUpWrapper>
                {RenderingComponent && <RenderingComponent/>}
            </PopUpWrapper>
        )
    }
)

export const PopUps: FC = () => {

    const {popUps} = usePopUps()

    return (
        <>
            {popUps.map((options) => {
                return (
                    <PopUp
                        key={options.renderingComponent}
                        renderingComponent={options.renderingComponent}
                    />
                )
            })}
        </>
    )
}
