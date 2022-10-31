import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {UniqueId, UniqueNum} from '@apiModels/common'
import generateId from 'hans-id'
import {clearCurrentImageLinks} from '@slices/upload'
import {addPromoPicture, updatePromoPicture} from '@slices/promoPictures/promoPicturesThunkCreators'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'


type Options = {
    locale: string
    initialData?: PromoPicture<AdminPromoPicture>
}

type Returned = {
    mainImage: string | null
    description: string
    price: string
    images: { id: UniqueId, image: string, order?: number }[]
    inputChange: (fieldName: 'description' | 'price') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    uploaderShown: boolean
    uploaderClick: MouseEventHandler
    uploaderMainShown: boolean
    uploaderMainClick: MouseEventHandler
    deleteImage: (kind: 'main' | 'sub') => (imageSrc: string) => void
    submit: MouseEventHandler
    disabled: boolean
}

export default function usePromoPictureLanguageForm(options: Options): Returned {

    const {
        locale,
        initialData
    } = options

    const [mainImage, setMainImage] = useState<string | null>(initialData && initialData.data[locale] ? initialData.data[locale].mainImage : null)
    const [price, setPrice] = useState<string>(initialData && initialData.data[locale] ? (initialData.data[locale].price || 0).toString() : '')
    const [description, setDescription] = useState<string>(initialData?.data[locale] ? initialData?.data[locale].description : '')
    const [images, setImages] = useState<{ id: UniqueId, order?: UniqueNum, image: string }[]>(initialData && initialData.data[locale] ? initialData.data[locale].images : [])

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)
    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    const disabled = !acceptLanguages?.find(language => language.data.locale === locale)!.enabled

    const deleteImage = (kind: 'main' | 'sub') => (imageSrc: string): void => {
        if (kind === 'sub') setImages(prev => prev.filter(image => image.image !== imageSrc))
        else setMainImage(null)
        dispatch(deleteImages({
            chunkName: 'promo-pictures-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (target === `promo-picture-${locale}-${initialData ? initialData.id : 'new'}` && currentImageLinks?.length) {
            setImages(prev => [...prev, ...currentImageLinks.map((imageLink, index) => ({image: imageLink, id: generateId(), order: index + 1}))])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, initialData])

    useEffect(() => {
        if (target === `promo-picture-main-${locale}-${initialData ? initialData.id : 'new'}` && currentImageLinks?.length) {
            setMainImage(currentImageLinks[0])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, initialData])

    const [uploaderShown, setUploaderShown] = useState<boolean>(false)
    const [uploaderMainShown, setUploaderMainShown] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const inputChange = (fieldName: 'price' | 'description'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'price') setPrice(event.target.value)
        else if (fieldName === 'description') setDescription(event.target.value)
    }

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        event.stopPropagation()
        if (initialData) {
            dispatch(updatePromoPicture({
                id: initialData.id,
                data: {
                    data: {
                        data: {
                            ...initialData.data,
                            [locale]: {
                                mainImage,
                                price: +price,
                                description,
                                images,
                                currency: 'ruble'
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
                            price: 0,
                            description: '',
                            currency: 'ruble',
                            images: []
                        }
                    })
                dispatch(addPromoPicture({
                    data: {
                        data: {
                            data: {
                                ...data,
                                [locale]: {
                                    mainImage,
                                    price: +price,
                                    description,
                                    images
                                }
                            }
                        }
                    }
                }))
                setPrice('')
                setMainImage(null)
                setDescription('')
                setImages([])
            }
        }
    }, [price, mainImage, description, images, images.length, acceptLanguages?.length])

    const uploaderClick: MouseEventHandler = useCallback((): void => {
        setUploaderShown(prev => !prev)
    }, [setUploaderShown])

    const uploaderMainClick: MouseEventHandler = useCallback((): void => {
        setUploaderMainShown(prev => !prev)
    }, [setUploaderMainShown])

    return {
        price,
        description,
        mainImage,
        images,
        inputChange,
        uploaderShown,
        uploaderMainShown,
        uploaderClick,
        uploaderMainClick,
        deleteImage,
        submit,
        disabled
    }
}
