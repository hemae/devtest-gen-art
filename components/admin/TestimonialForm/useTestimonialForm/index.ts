import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {addTestimonial, deleteTestimonial, updateTestimonial} from '@slices/testimonials/testimonialsThunkCreators'
import {Testimonial} from '@apiModels/testimonial'
import {UniqueId} from '@apiModels/common'
import {compareObjects} from '@helpers/objectsComparator'
import generateId from 'hans-id'
import {clearCurrentImageLinks} from '@slices/upload'
import {deleteImages} from '@slices/upload/uploadThunkCreators'


type Options = {
    initialData?: Testimonial
}

type Returned = {
    sender: string
    testimonialBody: string
    rate: number
    publicVisible: boolean
    images: {id: UniqueId, src: string}[]
    submitButtonDisabled: boolean
    submit: MouseEventHandler
    inputChange: (fieldName: 'testimonial' | 'sender') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    checkboxChange: (fieldName: 'publicVisible') => MouseEventHandler
    deleteClick: MouseEventHandler
    setRate: (rate: number) => void
    uploaderShown: boolean
    uploaderClick: MouseEventHandler
    deleteImage: (imageSrc: string) => void
}

export default function useTestimonialForm(options: Options): Returned {

    const {
        initialData
    } = options

    const [testimonialBody, setTestimonialBody] = useState<string>(initialData?.testimonial || '')
    const [sender, setSender] = useState<string>(initialData?.sender || '')
    const [publicVisible, setPublicVisible] = useState<boolean>(initialData ? initialData.publicVisible : true)
    const [rate, setRate] = useState<number>(initialData ? initialData.rate : 0)
    const [images, setImages] = useState<{id: UniqueId, src: string}[]>(initialData ? initialData.images : [])

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)

    const deleteImage = (imageSrc: string): void => {
        setImages(prev => prev.filter(image => image.src !== imageSrc))
        dispatch(deleteImages({
            chunkName: 'testimonial-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (target === `testimonial-${initialData ? initialData.id : 'new'}` && currentImageLinks?.length) {
            setImages(prev => [...prev, ...currentImageLinks.map(imageLink => ({src: imageLink, id: generateId()}))])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, initialData])

    const [uploaderShown, setUploaderShown] = useState<boolean>(false)

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setSubmitButtonDisabled(
            (!testimonialBody || !sender)
            || (
                initialData
                    ? testimonialBody === initialData.testimonial
                        && sender === initialData.sender
                        && publicVisible === initialData.publicVisible
                        && rate === initialData.rate
                        && compareObjects(images.map(image => image.src), initialData.images.map(image => image.src))
                        && images.length === initialData.images.length
                    : false
            )
        )
    }, [testimonialBody, sender, publicVisible, rate, initialData, images, images.length])

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (initialData) dispatch(updateTestimonial({
            id: initialData.id,
            data: {
                data: {
                    testimonial: testimonialBody,
                    sender,
                    publicVisible,
                    rate,
                    images
                }
            }
        }))
        else {
            dispatch(addTestimonial({
                data: {
                    data: {
                        testimonial: testimonialBody,
                        sender,
                        publicVisible,
                        rate,
                        images
                    }
                }
            }))
            setTestimonialBody('')
            setSender('')
            setPublicVisible(true)
            setRate(0)
            setImages([])
        }
    }, [testimonialBody, sender, publicVisible, rate, images, images.length])

    const inputChange = (fieldName: 'testimonial' | 'sender'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'testimonial') setTestimonialBody(event.target.value)
        else if (fieldName === 'sender') setSender(event.target.value)
    }

    const checkboxChange = (fieldName: 'publicVisible'): MouseEventHandler => () => {
        if (fieldName === 'publicVisible') setPublicVisible(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (initialData) {
            dispatch(deleteTestimonial({
                id: initialData.id
            }))
        }
    }, [initialData])

    const uploaderClick: MouseEventHandler = useCallback((): void => {
        setUploaderShown(prev => !prev)
    }, [setUploaderShown])

    return {
        submitButtonDisabled,
        submit,
        testimonialBody,
        sender,
        publicVisible,
        rate,
        images,
        inputChange,
        checkboxChange,
        deleteClick,
        setRate,
        uploaderShown,
        uploaderClick,
        deleteImage
    }
}
