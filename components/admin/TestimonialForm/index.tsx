import {memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {Switcher, Rating, SimpleUploader, ImagesPreview} from '@UI'
import {Testimonial} from '@apiModels/testimonial'
import useTestimonialForm from '@admin/TestimonialForm/useTestimonialForm'
import {DeleteButton} from '@admin/DeleteButton'


type TestimonialFormProps = {
    testimonial?: Testimonial
}

export const TestimonialForm = memo<TestimonialFormProps>((props) => {

    const {
        testimonial
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `testimonial-form-${testimonial ? testimonial.id : 'new'}`
    })

    const {
        submitButtonDisabled,
        submit,
        testimonialBody,
        sender,
        publicVisible,
        rate,
        setRate,
        images,
        inputChange,
        checkboxChange,
        deleteClick,
        uploaderShown,
        uploaderClick,
        deleteImage
    } = useTestimonialForm({initialData: testimonial})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {testimonial && <DeleteButton onClick={deleteClick}/>}
            <input
                placeholder='Sender'
                value={sender}
                onChange={inputChange('sender')}
            />
            <textarea
                placeholder='Testimonial'
                value={testimonialBody}
                onChange={inputChange('testimonial')}
            />
            <Switcher
                checked={publicVisible}
                onChange={checkboxChange('publicVisible')}
                label={'Public visible'}
            />
            <Rating
                rating={rate}
                maxRating={5}
                interactive
                setRating={setRate}
            />
            <ImagesPreview
                images={images.map(image => image.src)}
                deleteImage={deleteImage}
            />
            <SimpleUploader
                target={testimonial ? `testimonial-${testimonial.id}` : 'testimonial-new'}
                chunkName={'testimonial-images'}
            />
            <button
                disabled={submitButtonDisabled}
                onClick={submit}
            >{'Save'}</button>
        </section>
    )
})
