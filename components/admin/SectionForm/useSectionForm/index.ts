import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch} from '@store'
import {AdminSectionData, Section, SectionDataTypeList, SectionTypes} from '@apiModels/sections'
import {deleteSection, addSection, updateSection} from '@slices/sections/sectionsThunkCreators'


type Options = {
    initialData?: Section<AdminSectionData<SectionDataTypeList>>
}

type Returned = {
    type: SectionTypes | null
    expandingButtonUrl: string
    order: string
    publicVisible: boolean
    submitButtonDisabled: boolean
    submit: MouseEventHandler
    inputChange: (fieldName: 'order' | 'expandingButtonUrl') => ChangeEventHandler<HTMLInputElement>
    selectChange: (fieldName: 'type') => ChangeEventHandler<HTMLSelectElement>
    checkboxChange: (fieldName: 'publicVisible') => MouseEventHandler
    deleteClick: MouseEventHandler
}

export default function useSectionForm(options: Options): Returned {

    const {
        initialData
    } = options

    const [type, setType] = useState<SectionTypes | null>(initialData?.type || null)
    const [order, setOrder] = useState<string>(initialData?.order!.toString() || '')
    const [expandingButtonUrl, setExpandingButtonUrl] = useState<string>((initialData?.expandingButtonUrl || '').toString() || '')
    const [publicVisible, setPublicVisible] = useState<boolean>(initialData ? initialData.publicVisible : true)

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setSubmitButtonDisabled(
            (!type || order === '')
            || (
                initialData
                    ? order === initialData.order!.toString()
                        && publicVisible === initialData.publicVisible
                        && (expandingButtonUrl || null) === initialData.expandingButtonUrl
                    : false
            )
        )
    }, [type, order, publicVisible, initialData, expandingButtonUrl])

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (initialData) dispatch(updateSection({
            id: initialData.id,
            data: {
                data: {
                    order: +order,
                    publicVisible,
                }
            }
        }))
        else {
            dispatch(addSection({
                data: {
                    data: {
                        type,
                        order: +order,
                        publicVisible
                    }
                }
            }))
            setType(null)
            setOrder('')
            setPublicVisible(true)
        }
    }, [type, order, publicVisible, expandingButtonUrl])

    const inputChange = (fieldName: 'order' | 'expandingButtonUrl'): ChangeEventHandler<HTMLInputElement> => (event) => {
        if (fieldName === 'order') setOrder(event.target.value)
        else if (fieldName === 'expandingButtonUrl') setExpandingButtonUrl(event.target.value)
    }

    const selectChange = (fieldName: 'type'): ChangeEventHandler<HTMLSelectElement> => (event) => {
        if (fieldName === 'type') {
            if (event.target.value === 'Section type') {
                setType(null)
            } else {
                setType(event.target.value as SectionTypes)
            }
        }
    }

    const checkboxChange = (fieldName: 'publicVisible'): MouseEventHandler => () => {
        if (fieldName === 'publicVisible') setPublicVisible(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (initialData) {
            dispatch(deleteSection({
                id: initialData.id
            }))
        }
    }, [initialData])

    return {
        submitButtonDisabled,
        submit,
        type,
        expandingButtonUrl,
        order,
        publicVisible,
        inputChange,
        selectChange,
        checkboxChange,
        deleteClick
    }
}
