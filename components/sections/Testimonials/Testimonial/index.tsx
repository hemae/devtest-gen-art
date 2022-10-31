import {memo} from 'react'
import styles from './Testimonial.module.scss'
import {Testimonial as TestimonialType} from '@apiModels/testimonial'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {DateComponent, FullscreenImage, Rating} from '@UI'


type TestimonialProps = {
    testimonial: TestimonialType
}

export const Testimonial = memo<TestimonialProps>((props) => {

    const {
        testimonial
    } = props

    const {root} = useAdditionalAttributes({'data-id': `testimonial-${testimonial.id}`})

    return (
        <div
            ref={root}
            className={styles.main}
        >
            <div id='testimonial-header'>
                <Rating rating={testimonial.rate} maxRating={5}/>
                <DateComponent date={testimonial.createdAt}/>
            </div>
            <h3>{testimonial.sender}</h3>
            <p>{testimonial.testimonial}</p>
            <div id='testimonial-images'>
                {testimonial.images.map(testimonialImage => {
                    return (
                        <FullscreenImage
                            key={testimonialImage.id}
                            src={testimonialImage.src}
                            alt={`testimonial-image-${testimonialImage.id}`}
                        />
                    )
                })}
            </div>
        </div>
    )
})
