import {FC, memo} from 'react'
import styles from './Testimonials.module.scss'
import classNames from 'classnames'
import {ExpandingButton, LeaveTestimonialButton, useExpandingButton} from '@UI'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Section, UserSectionData} from '@apiModels/sections'
import {Testimonial as TestimonialType} from '@apiModels/testimonial'
import {Testimonial} from './Testimonial'
import {Testimonials} from '@apiModels/sections/testimonials'


type TestimonialsProps = {
    section: Section<UserSectionData<Testimonials>>
    testimonials: TestimonialType[]
}

export const TestimonialsComponent: FC<TestimonialsProps> = memo<TestimonialsProps>(({section, testimonials}) => {

    const {
        id,
        order,
        data
    } = section

    const {
        title,
        expandingButtonTitle,
        leaveTestimonial,
        leaveTestimonialImage,
        data: sectionData
    } = data

    const {popUpData} = sectionData

    const {
        expandingButtonClick,
        expandingButtonHidden,
        visibleItems
    } = useExpandingButton<TestimonialType>({items: testimonials, pageSize: 3})

    const {root} = useAdditionalAttributes({
        'data-id': `testimonials-${id}`,
        'order': order
    })

    return (
        <section
            id={id}
            ref={root}
            className={classNames(
                styles.main,
                {[styles.expandingButtonHidden]: expandingButtonHidden}
            )}
        >
            <h2>{title}</h2>
            <div className={styles.main__itemsWrapper}>
                {visibleItems.map(testimonial => {
                    return (
                        <Testimonial
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    )
                })}
            </div>
            <ExpandingButton
                id='testimonials-show-more-button'
                title={expandingButtonTitle!}
                clickHandler={expandingButtonClick}
            />
            <LeaveTestimonialButton
                title={leaveTestimonial!}
                imageSrc={leaveTestimonialImage!}
                popUpData={popUpData}
            />
        </section>
    )
})
