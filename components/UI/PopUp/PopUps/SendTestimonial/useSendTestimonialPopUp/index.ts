import {TestimonialPopUp} from '@apiModels/sections/testimonials'
import {UniqueId, UniqueNum} from '@apiModels/common'
import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import generateId from 'hans-id'
import {clearCurrentImageLinks} from '@slices/upload'
import {addTestimonial} from '@slices/testimonials/testimonialsThunkCreators'
import {closePopUp} from '@slices/popUps'
import usePopUpProps from '@UI/PopUp/usePopUpProps'


type Returned = {
    rate: number
    setRate: (rate: UniqueNum) => void
    email: string
    name: string
    testimonial: string
    inputChange: (fieldName: 'email' | 'name' | 'testimonial') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    submit: FormEventHandler<HTMLFormElement>
    submitButtonDisabled: boolean
    images: {id: UniqueId, src: string}[]
    deleteImage: (imageSrc: string) => void
    checkboxClick: MouseEventHandler
    policyAgreement: boolean
    popUpData: TestimonialPopUp
}

export default function useSendTestimonialPopUp(): Returned {

    const {popUpData} = usePopUpProps<{popUpData: TestimonialPopUp}>({renderingComponent: 'SendTestimonial'})!

    const dispatch = useAppDispatch()

    const [rate, setRate] = useState<number>(0)
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [testimonial, setTestimonial] = useState<string>('')
    const [images, setImages] = useState<{id: UniqueId, src: string}[]>([])
    const [policyAgreement, setPolicyAgreement] = useState<boolean>(false)

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)

    const deleteImage = (imageSrc: string): void => {
        setImages(prev => prev.filter(image => image.src !== imageSrc))
        dispatch(deleteImages({
            isRussian: true,
            chunkName: 'testimonial-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (target === 'user-testimonial-new' && currentImageLinks?.length) {
            setImages(prev => [...prev, ...currentImageLinks.map(imageLink => ({src: imageLink, id: generateId()}))])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target])

    const checkboxClick: MouseEventHandler = useCallback(() => {
        setPolicyAgreement(prev => !prev)
    }, [setPolicyAgreement])

    const inputChange = (fieldName: 'testimonial' | 'name' | 'email'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'testimonial') setTestimonial(event.target.value)
        else if (fieldName === 'name') setName(event.target.value)
        else if (fieldName === 'email') setEmail(event.target.value)
    }

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (!testimonial && popUpData.testimonial.required) {
            setSubmitButtonDisabled(true)
        } else if (!name && popUpData.name.required) {
            setSubmitButtonDisabled(true)
        } else if (!email && popUpData.email.required) {
            setSubmitButtonDisabled(true)
        } else if (!images.length && popUpData.addImages.required) {
            setSubmitButtonDisabled(true)
        } else if (!rate && popUpData.rate.required) {
            setSubmitButtonDisabled(true)
        } else if (!policyAgreement && popUpData.acceptPolicy.required) {
            setSubmitButtonDisabled(true)
        } else {
            setSubmitButtonDisabled(false)
        }
    }, [testimonial, name, email, rate, images, images.length, policyAgreement])

    const submit: FormEventHandler<HTMLFormElement> = useCallback((event): void => {
        event.preventDefault()
        dispatch(addTestimonial({
            data: {
                data: {
                    testimonial,
                    sender: name,
                    publicVisible: true,
                    rate,
                    images
                }
            }
        }))
        setTestimonial('')
        setName('')
        setRate(0)
        setImages([])
        setPolicyAgreement(false)
        dispatch(closePopUp())
    }, [testimonial, name, email, rate, images, images.length])

    return {
        rate,
        setRate,
        email,
        name,
        testimonial,
        inputChange,
        submit,
        submitButtonDisabled,
        images,
        deleteImage,
        checkboxClick,
        policyAgreement,
        popUpData
    }
}
