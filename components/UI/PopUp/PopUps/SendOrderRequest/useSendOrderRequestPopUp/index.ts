import {UniqueId} from '@apiModels/common'
import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import generateId from 'hans-id'
import {clearCurrentImageLinks} from '@slices/upload'
import {closePopUp} from '@slices/popUps'
import {SendOrderRequestPopUp} from '@apiModels/sections/promoButtons'
import usePopUpProps from '@UI/PopUp/usePopUpProps'
import {addOrderRequest} from '@slices/orderRequests/orderRequestsThunkCreators'


type Returned = {
    email: string
    firstName: string
    lastName: string
    middleName: string
    phoneNumber: string
    additionalInfo: string
    inputChange: (fieldName: 'email' | 'firstName' | 'lastName' | 'middleName' | 'phoneNumber' | 'additionalInfo') => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    submit: FormEventHandler<HTMLFormElement>
    submitButtonDisabled: boolean
    images: {id: UniqueId, src: string}[]
    deleteImage: (imageSrc: string) => void
    popUpData: SendOrderRequestPopUp
    policyAgreement: boolean
    checkboxClick: MouseEventHandler
}

export default function useSendOrderRequestPopUp(): Returned {

    const {popUpData} = usePopUpProps<{popUpData: SendOrderRequestPopUp}>({renderingComponent: 'SendOrderRequest'})!

    const dispatch = useAppDispatch()

    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [additionalInfo, setAdditionalInfo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [middleName, setMiddleName] = useState<string>('')
    const [images, setImages] = useState<{id: UniqueId, src: string}[]>([])
    const [policyAgreement, setPolicyAgreement] = useState<boolean>(false)

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)

    const deleteImage = (imageSrc: string): void => {
        setImages(prev => prev.filter(image => image.src !== imageSrc))
        dispatch(deleteImages({
            isRussian: true,
            chunkName: 'order-request-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (target === 'user-order-request-new' && currentImageLinks?.length) {
            setImages(prev => [...prev, ...currentImageLinks.map(imageLink => ({src: imageLink, id: generateId()}))])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target])

    const checkboxClick: MouseEventHandler = useCallback(() => {
        setPolicyAgreement(prev => !prev)
    }, [setPolicyAgreement])

    const inputChange = (fieldName: 'additionalInfo' | 'firstName' | 'lastName' | 'middleName' | 'email' | 'phoneNumber'): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => (event) => {
        if (fieldName === 'additionalInfo') setAdditionalInfo(event.target.value)
        else if (fieldName === 'firstName') setFirstName(event.target.value)
        else if (fieldName === 'lastName') setLastName(event.target.value)
        else if (fieldName === 'middleName') setMiddleName(event.target.value)
        else if (fieldName === 'email') setEmail(event.target.value)
        else if (fieldName === 'phoneNumber') setPhoneNumber(event.target.value)
    }

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (!additionalInfo && popUpData.additionalInfo.required) {
            setSubmitButtonDisabled(true)
        } else if (!firstName && popUpData.firstName.required) {
            setSubmitButtonDisabled(true)
        } else if (!lastName && popUpData.lastName.required) {
            setSubmitButtonDisabled(true)
        } else if (!middleName && popUpData.middleName.required) {
            setSubmitButtonDisabled(true)
        } else if (!email && popUpData.email.required) {
            setSubmitButtonDisabled(true)
        } else if (!images.length && popUpData.addImages.required) {
            setSubmitButtonDisabled(true)
        } else if (!policyAgreement && popUpData.acceptPolicy.required) {
            setSubmitButtonDisabled(true)
        } else if (!phoneNumber && popUpData.phoneNumber.required) {
            setSubmitButtonDisabled(true)
        } else {
            setSubmitButtonDisabled(false)
        }
    }, [policyAgreement, additionalInfo, firstName, lastName, middleName, email, phoneNumber, images, images.length])

    const submit: FormEventHandler<HTMLFormElement> = useCallback((event): void => {
        event.preventDefault()
        dispatch(addOrderRequest({
            data: {
                data: {
                    additionalInfo: additionalInfo || null,
                    firstName,
                    lastName,
                    middleName: middleName || null,
                    phoneNumber,
                    images,
                    email,
                    promoPictureId: null,
                    handled: false
                }
            }
        }))
        setAdditionalInfo('')
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setPhoneNumber('')
        setImages([])
        setEmail('')
        setPolicyAgreement(false)
        dispatch(closePopUp())
    }, [additionalInfo, firstName, lastName, middleName, email, phoneNumber, images, images.length])

    return {
        phoneNumber,
        additionalInfo,
        email,
        firstName,
        lastName,
        middleName,
        inputChange,
        submit,
        submitButtonDisabled,
        images,
        deleteImage,
        popUpData,
        policyAgreement,
        checkboxClick
    }
}
