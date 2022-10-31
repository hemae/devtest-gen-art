import {memo} from 'react'
import styles from './LeaveTestimonialButton.module.scss'
import useLeaveTestimonialButton from '@components/UI/LeaveTestimonialButton/useLeaveTestimonialButton'
import {TestimonialPopUp} from '@apiModels/sections/testimonials'


type LeaveTestimonialButtonProps = {
    popUpData: TestimonialPopUp
    imageSrc: string | null
    title: string
}

export const LeaveTestimonialButton = memo<LeaveTestimonialButtonProps>((props) => {

    const {
        popUpData,
        imageSrc,
        title
    } = props

    const {buttonClick} = useLeaveTestimonialButton({popUpData})

    return (
        <div
            id='leave-testimonial'
            className={styles.main}
            onClick={buttonClick}
        >
            {imageSrc && <div id='leave-testimonial-image'><img src={imageSrc} alt='send-feedback'/></div>}
            <button>{title}</button>
        </div>
    )
})
