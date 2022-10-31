import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {Promocode} from '@apiModels/promocode'
import {useAppDispatch} from '@store'
import {addPromocode, deletePromocode, updatePromocode} from '@slices/promocodes/promocodesThunkCreators'


type Options = {
    initialData?: Promocode
}

type Returned = {
    name: string
    promocodeBody: string
    discount: string
    expired: boolean
    reusable: boolean
    submitButtonDisabled: boolean
    submit: MouseEventHandler
    inputChange: (fieldName: 'promocode' | 'discount' | 'name') => ChangeEventHandler<HTMLInputElement>
    checkboxChange: (fieldName: 'expired' | 'reusable') => MouseEventHandler
    deleteClick: MouseEventHandler
}

export default function usePromocodeForm(options: Options): Returned {

    const {
        initialData
    } = options

    const [name, setName] = useState<string>(initialData?.name || '')
    const [promocodeBody, setPromocodeBody] = useState<string>(initialData?.promocode || '')
    const [discount, setDiscount] = useState<string>(initialData?.discount.toString() || '')
    const [expired, setExpired] = useState<boolean>(initialData ? initialData.expired : false)
    const [reusable, setReusable] = useState<boolean>(initialData ? initialData.reusable : true)

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setSubmitButtonDisabled(
            (!promocodeBody || isNaN(+discount))
            || (
                initialData
                    ? promocodeBody === initialData.promocode
                        && name === initialData.name
                        && +discount === initialData.discount
                        && expired === initialData.expired
                        && reusable === initialData.reusable
                    : false
            )
        )
    }, [promocodeBody, discount, expired, reusable, initialData, name])

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (initialData) dispatch(updatePromocode({
            id: initialData.id,
            data: {
                data: {
                    name,
                    promocode: promocodeBody,
                    discount: +discount,
                    expired,
                    reusable
                }
            }
        }))
        else {
            dispatch(addPromocode({
                data: {
                    data: {
                        name,
                        promocode: promocodeBody,
                        discount: +discount,
                        expired,
                        reusable
                    }
                }
            }))
            setName('')
            setPromocodeBody('')
            setDiscount('')
            setExpired(false)
            setReusable(true)
        }
    }, [promocodeBody, discount, expired, reusable, name])

    const inputChange = (fieldName: 'promocode' | 'discount' | 'name'): ChangeEventHandler<HTMLInputElement> => (event) => {
        if (fieldName === 'promocode') setPromocodeBody(event.target.value)
        else if (fieldName === 'discount') setDiscount(event.target.value)
        else if (fieldName === 'name') setName(event.target.value)
    }

    const checkboxChange = (fieldName: 'expired' | 'reusable'): MouseEventHandler => () => {
        if (fieldName === 'expired') setExpired(prev => !prev)
        else if (fieldName === 'reusable') setReusable(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (initialData) {
            dispatch(deletePromocode({
                id: initialData.id
            }))
        }
    }, [initialData])

    return {
        name,
        submitButtonDisabled,
        submit,
        promocodeBody,
        discount,
        expired,
        reusable,
        inputChange,
        checkboxChange,
        deleteClick
    }
}
