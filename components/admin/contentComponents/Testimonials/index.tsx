import {FC} from 'react'
import {TestimonialForm} from '@admin'
import useTestimonials from '@admin/contentComponents/Testimonials/useTestimonials'


export const Testimonials: FC = () => {

    const {testimonials} = useTestimonials()

    return (
        <>
            {testimonials.map(testimonial => {
                return (
                    <TestimonialForm
                        key={testimonial.id}
                        testimonial={testimonial}
                    />
                )
            })}
            <TestimonialForm
                key='new-testimonial'
            />
        </>
    )
}
