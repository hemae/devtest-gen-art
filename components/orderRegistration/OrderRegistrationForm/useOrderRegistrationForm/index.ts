import {UniqueId} from '@apiModels/common'
import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {useAppDispatch} from '@store'
import {SendOrderRequestPopUp} from '@apiModels/sections/promoButtons'
import {addOrderRequest} from '@slices/orderRequests/orderRequestsThunkCreators'


type Options = {
    popUpData: SendOrderRequestPopUp
    promoPictureId: UniqueId
}

type Returned = {
    email: string
    firstName: string
    lastName: string
    middleName: string
    phoneNumber: string
    inputChange: (fieldName: 'email' | 'firstName' | 'lastName' | 'middleName' | 'phoneNumber') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    submit: FormEventHandler<HTMLFormElement>
    submitButtonDisabled: boolean
    policyAgreement: boolean
    checkboxClick: MouseEventHandler
}

export default function useSendOrderRequest(options: Options): Returned {

    const {
        popUpData,
        promoPictureId
    } = options

    const dispatch = useAppDispatch()

    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [middleName, setMiddleName] = useState<string>('')
    const [policyAgreement, setPolicyAgreement] = useState<boolean>(false)

    const checkboxClick: MouseEventHandler = useCallback(() => {
        setPolicyAgreement(prev => !prev)
    }, [setPolicyAgreement])

    const inputChange = (fieldName: 'firstName' | 'lastName' | 'middleName' | 'email' | 'phoneNumber'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'firstName') setFirstName(event.target.value)
        else if (fieldName === 'lastName') setLastName(event.target.value)
        else if (fieldName === 'middleName') setMiddleName(event.target.value)
        else if (fieldName === 'email') setEmail(event.target.value)
        else if (fieldName === 'phoneNumber') setPhoneNumber(event.target.value)
    }

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (!firstName && popUpData.firstName.required) {
            setSubmitButtonDisabled(true)
        } else if (!lastName && popUpData.lastName.required) {
            setSubmitButtonDisabled(true)
        } else if (!middleName && popUpData.middleName.required) {
            setSubmitButtonDisabled(true)
        } else if (!email && popUpData.email.required) {
            setSubmitButtonDisabled(true)
        } else if (!policyAgreement && popUpData.acceptPolicy.required) {
            setSubmitButtonDisabled(true)
        } else if (!phoneNumber && popUpData.phoneNumber.required) {
            setSubmitButtonDisabled(true)
        } else {
            setSubmitButtonDisabled(false)
        }
    }, [firstName, lastName, middleName, email, phoneNumber, policyAgreement])

    const submit: FormEventHandler<HTMLFormElement> = useCallback((event): void => {
        event.preventDefault()
        dispatch(addOrderRequest({
            data: {
                data: {
                    additionalInfo: null,
                    firstName,
                    lastName,
                    middleName: middleName || null,
                    phoneNumber,
                    images: null,
                    email,
                    promoPictureId,
                    handled: false
                }
            }
        }))
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setPhoneNumber('')
        setEmail('')
        setPolicyAgreement(false)
    }, [firstName, lastName, middleName, email, phoneNumber, promoPictureId])

    return {
        phoneNumber,
        email,
        firstName,
        lastName,
        middleName,
        inputChange,
        submit,
        submitButtonDisabled,
        policyAgreement,
        checkboxClick
    }
}
