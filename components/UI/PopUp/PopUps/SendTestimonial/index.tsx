import {ChangeEventHandler, FC} from 'react'
import styles from './SendTestimonial.module.scss'
import useSendTestimonialPopUp from '@components/UI/PopUp/PopUps/SendTestimonial/useSendTestimonialPopUp'
import {Checkbox, ImagesPreview, Input, Rating, SimpleUploader, Textarea} from '@UI'
import {LinkMarkdown} from '@appComponents'


export const SendTestimonial: FC = () => {

    const {
        rate,
        setRate,
        email,
        name,
        testimonial,
        inputChange,
        submit,
        submitButtonDisabled,
        deleteImage,
        images,
        checkboxClick,
        policyAgreement,
        popUpData
    } = useSendTestimonialPopUp()

    return (
        <section
            className={styles.main}
        >
            <h2>{popUpData.header}</h2>
            <form
                className={styles.main__inputsWrapper}
                onSubmit={submit}
            >
                <div
                    id='rating'
                >
                    <span>{popUpData.rate.label}{popUpData.rate.label && popUpData.rate.required && '*'}</span>
                    <Rating
                        interactive
                        rating={rate}
                        maxRating={5}
                        setRating={setRate}
                    />
                </div>
                <div
                    id='email'
                >
                    <span>{popUpData.email.label}{popUpData.email.label && popUpData.email.required && '*'}</span>
                    <Input
                        id='email-input'
                        placeholder={popUpData.email.placeholder || ''}
                        value={email}
                        onChange={inputChange('email') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='name'
                >
                    <span>{popUpData.name.label}{popUpData.name.label && popUpData.name.required && '*'}</span>
                    <Input
                        id='name-input'
                        placeholder={popUpData.name.placeholder || ''}
                        value={name}
                        onChange={inputChange('name') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='testimonial'
                >
                    <span>{popUpData.testimonial.label}{popUpData.testimonial.label && popUpData.testimonial.required && '*'}</span>
                    <Textarea
                        id='testimonial-textarea'
                        placeholder={popUpData.testimonial.placeholder || ''}
                        value={testimonial}
                        onChange={inputChange('testimonial') as ChangeEventHandler<HTMLTextAreaElement>}
                    />
                </div>
                <div
                    id='uploader'
                >
                    <span>{popUpData.addImages.label}{popUpData.addImages.label && popUpData.addImages.required && '*'}</span>
                    <ImagesPreview
                        images={images.map(image => image.src)}
                        deleteImage={deleteImage}
                    />

                    <SimpleUploader
                        isRussian
                        target={'user-testimonial-new'}
                        chunkName={'testimonial-images'}
                    />
                </div>
                <div
                    id='policy'
                >
                    <Checkbox
                        onChange={checkboxClick}
                        checked={policyAgreement}
                        label={popUpData.acceptPolicy.label ?
                            <LinkMarkdown isNewWindow>{popUpData.acceptPolicy.label}</LinkMarkdown> : ''}
                    />
                </div>
                <div
                    id='submit-button'
                >
                    <button
                        type='submit'
                        disabled={submitButtonDisabled}
                    >{popUpData.submitButtonLabel}</button>
                </div>
            </form>
        </section>
    )
}
