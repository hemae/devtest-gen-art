import {useCallback, useState, MouseEventHandler, ChangeEventHandler} from 'react'
import {useAppDispatch} from '@store'
import {AdminFAQ, FAQ} from '@apiModels/faq'
import {addFAQ, deleteFAQ, updateFAQ} from '@slices/faqs/faqsThunkCreators'


type Options = {
    initialData?: FAQ<AdminFAQ>
}

type Returned = {
    publicVisible: boolean
    submitButtonDisabled: boolean
    submit: MouseEventHandler
    checkboxChange: (fieldName: 'publicVisible') => MouseEventHandler
    deleteClick: MouseEventHandler
    inputChange: (fieldName: 'order') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    order: string
}

export default function useFAQForm(options: Options): Returned {

    const {
        initialData
    } = options

    const [publicVisible, setPublicVisible] = useState<boolean>(initialData ? initialData.publicVisible : true)
    const [order, setOrder] = useState<string>(initialData ? (initialData.order || 0).toString() : '')

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (initialData) {
            dispatch(updateFAQ({
                id: initialData.id,
                data: {
                    data: {
                        publicVisible,
                        order: +order
                    }
                }
            }))
        } else {
            dispatch(addFAQ({
                data: {
                    data: {
                        publicVisible,
                        order: +order
                    }
                }
            }))
            setPublicVisible(true)
        }
    }, [publicVisible, order])

    const inputChange = (fieldName: 'order'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'order') setOrder(event.target.value)
    }

    const checkboxChange = (fieldName: 'publicVisible'): MouseEventHandler => () => {
        if (fieldName === 'publicVisible') setPublicVisible(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (initialData) {
            dispatch(deleteFAQ({
                id: initialData.id
            }))
        }
    }, [initialData])

    return {
        submitButtonDisabled,
        submit,
        publicVisible,
        checkboxChange,
        deleteClick,
        inputChange,
        order
    }
}
