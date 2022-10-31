import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {UniqueId} from '@apiModels/common'
import generateId from 'hans-id'
import {clearCurrentImageLinks} from '@slices/upload'
import {AdminFAQ, FAQ} from '@apiModels/faq'
import {addFAQ, updateFAQ} from '@slices/faqs/faqsThunkCreators'
import {deleteImages} from '@slices/upload/uploadThunkCreators'


type Options = {
    locale: string
    initialData?: FAQ<AdminFAQ>
}

type Returned = {
    title: string
    description: string
    images: { id: UniqueId, src: string }[]
    inputChange: (fieldName: 'title' | 'description') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    uploaderShown: boolean
    uploaderClick: MouseEventHandler
    deleteImage: (imageSrc: string) => void
    submit: MouseEventHandler
    disabled: boolean
}

export default function useFAQLanguageForm(options: Options): Returned {

    const {
        locale,
        initialData
    } = options

    const [title, setTitle] = useState<string>(initialData?.data[locale] ? initialData?.data[locale].title : '')
    const [description, setDescription] = useState<string>(initialData?.data[locale] ? initialData?.data[locale].description : '')
    const [images, setImages] = useState<{ id: UniqueId, src: string }[]>(initialData && initialData.data[locale] ? initialData.data[locale].images : [])

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)
    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    const disabled = !acceptLanguages?.find(language => language.data.locale === locale)!.enabled

    const deleteImage = (imageSrc: string): void => {
        setImages(prev => prev.filter(image => image.src !== imageSrc))
        dispatch(deleteImages({
            chunkName: 'faq-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (target === `faq-${locale}-${initialData ? initialData.id : 'new'}` && currentImageLinks?.length) {
            setImages(prev => [...prev, ...currentImageLinks.map(imageLink => ({src: imageLink, id: generateId()}))])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, initialData])

    const [uploaderShown, setUploaderShown] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const inputChange = (fieldName: 'title' | 'description'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'title') setTitle(event.target.value)
        else if (fieldName === 'description') setDescription(event.target.value)
    }

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        event.stopPropagation()
        if (initialData) {
            dispatch(updateFAQ({
                id: initialData.id,
                data: {
                    data: {
                        data: {
                            ...initialData.data,
                            [locale]: {
                                title, description, images
                            }
                        }
                    }
                }
            }))
        } else {
            if (acceptLanguages) {
                let data = {}
                acceptLanguages
                    .map(language => language.data.locale)
                    .forEach(locale => {
                        //@ts-ignore
                        data[locale] = {
                            title: '',
                            description: '',
                            images: []
                        }
                    })
                dispatch(addFAQ({
                    data: {
                        data: {
                            data: {
                                ...data,
                                [locale]: {
                                    title, description, images
                                }
                            }
                        }
                    }
                }))
                setTitle('')
                setDescription('')
                setImages([])
            }
        }
    }, [title, description, images, images.length, acceptLanguages?.length])

    const uploaderClick: MouseEventHandler = useCallback((): void => {
        setUploaderShown(prev => !prev)
    }, [setUploaderShown])

    return {
        title,
        description,
        images,
        inputChange,
        uploaderShown,
        uploaderClick,
        deleteImage,
        submit,
        disabled
    }
}
