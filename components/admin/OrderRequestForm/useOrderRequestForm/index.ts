import {useCallback, useState, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {UniqueId} from '@apiModels/common'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import {OrderRequest} from '@apiModels/orderRequest'
import {deleteOrderRequest, updateOrderRequest} from '@slices/orderRequests/orderRequestsThunkCreators'
import {getPromoPicture} from '@slices/promoPictures/promoPicturesThunkCreators'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'


type Options = {
    initialData?: OrderRequest
}

type Returned = {
    handled: boolean
    images: {id: UniqueId, src: string}[]
    submitButtonDisabled: boolean
    submit: MouseEventHandler
    checkboxChange: (fieldName: 'handled') => MouseEventHandler
    deleteClick: MouseEventHandler
    deleteImage: (imageSrc: string) => void
    currentPromoPicture: PromoPicture<AdminPromoPicture> | null
}

export default function useOrderRequestForm(options: Options): Returned {

    const {
        initialData
    } = options

    const dispatch = useAppDispatch()

    const [handled, setHandled] = useState<boolean>(initialData ? initialData.handled : true)
    const [images, setImages] = useState<{id: UniqueId, src: string}[]>(initialData ? initialData.images || [] : [])

    const [currentPromoPicture, setCurrentPromoPicture] = useState<PromoPicture<AdminPromoPicture> | null>(null)

    const {promoPictures} = useAppSelector(state => state.promoPicturesReducer)

    useEffect(() => {
        if (promoPictures?.length && initialData && initialData?.promoPictureId) {
            setCurrentPromoPicture(promoPictures.find(picture => picture.id === initialData.promoPictureId) || null)
        }
    }, [promoPictures?.length, initialData])

    useEffect(() => {
        if (initialData && initialData?.promoPictureId) {
            dispatch(getPromoPicture({id: initialData.promoPictureId}))
        }
    }, [initialData])

    const deleteImage = (imageSrc: string): void => {
        setImages(prev => prev.filter(image => image.src !== imageSrc))
        dispatch(deleteImages({
            chunkName: 'order-request-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        setSubmitButtonDisabled(initialData
            ? handled === initialData.handled
            : false)
    }, [handled, initialData])

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (initialData) dispatch(updateOrderRequest({
            id: initialData.id,
            data: {
                data: {handled}
            }
        }))
    }, [handled])

    const checkboxChange = (fieldName: 'handled'): MouseEventHandler => () => {
        if (fieldName === 'handled') setHandled(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (initialData) {
            dispatch(deleteOrderRequest({
                id: initialData.id
            }))
        }
    }, [initialData])

    return {
        handled,
        submitButtonDisabled,
        submit,
        images,
        checkboxChange,
        deleteClick,
        deleteImage,
        currentPromoPicture
    }
}
