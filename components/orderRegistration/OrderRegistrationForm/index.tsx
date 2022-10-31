import {ChangeEventHandler, memo} from 'react'
import styles from './SendOrderRequestForm.module.scss'
import {Checkbox, Input} from '@UI'
import {LinkMarkdown} from '@appComponents'
import useSendOrderRequest from '@components/orderRegistration/OrderRegistrationForm/useOrderRegistrationForm'
import {SendOrderRequestPopUp} from '@apiModels/sections/promoButtons'
import {UniqueId} from '@apiModels/common'
import {PaymentRobokassa} from '@components/PaymentRobokassa'
import {PromoPicture} from '@apiModels/promoPicture'


type SendOrderRequestProps = {
    promoPicture: PromoPicture
    popUpData: SendOrderRequestPopUp
}

export const SendOrderRequestForm = memo<SendOrderRequestProps>((props) => {

    const {
        promoPicture,
        popUpData
    } = props

    const {
        phoneNumber,
        email,
        firstName,
        lastName,
        middleName,
        inputChange,
        submit,
        submitButtonDisabled,
        checkboxClick,
        policyAgreement
    } = useSendOrderRequest({popUpData, promoPictureId: promoPicture.id})

    return (
        <section
            className={styles.main}
        >
            <h2>{popUpData.header}</h2>
            <form
                onSubmit={submit}
                className={styles.main__inputsWrapper}
            >
                <div
                    id='firstName'
                >
                    <span>{popUpData.firstName.label}{popUpData.firstName.label && popUpData.firstName.required && '*'}</span>
                    <Input
                        id='firstName-input'
                        placeholder={popUpData.firstName.placeholder || ''}
                        value={firstName}
                        onChange={inputChange('firstName') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='lastName'
                >
                    <span>{popUpData.lastName.label}{popUpData.lastName.label && popUpData.lastName.required && '*'}</span>
                    <Input
                        id='lastName-input'
                        placeholder={popUpData.lastName.placeholder || ''}
                        value={lastName}
                        onChange={inputChange('lastName') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='middleName'
                >
                    <span>{popUpData.middleName.label}{popUpData.middleName.label && popUpData.middleName.required && '*'}</span>
                    <Input
                        id='middleName-input'
                        placeholder={popUpData.middleName.placeholder || ''}
                        value={middleName}
                        onChange={inputChange('middleName') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='email'
                >
                    <span>{popUpData.email.label}{popUpData.email.label && popUpData.email.required && '*'}</span>
                    <Input
                        id='email-input'
                        placeholder={popUpData.email.placeholder || ''}
                        value={email}
                        onChange={inputChange('email') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>
                <div
                    id='phone'
                >
                    <span>{popUpData.phoneNumber.label}{popUpData.phoneNumber.label && popUpData.phoneNumber.required && '*'}</span>
                    <Input
                        id='phoneNumber-input'
                        placeholder={popUpData.phoneNumber.placeholder || ''}
                        value={phoneNumber}
                        onChange={inputChange('phoneNumber') as ChangeEventHandler<HTMLInputElement>}
                    />
                </div>

                <div
                    id='policy'
                >
                    <Checkbox
                        onChange={checkboxClick}
                        checked={policyAgreement}
                        label={popUpData.acceptPolicy.label ?
                            <LinkMarkdown isNewWindow>{popUpData.acceptPolicy.label}</LinkMarkdown> : ''}
                    />
                </div>
                <div
                    id='submit-button'
                >
                    {/*<button*/}
                    {/*    type='submit'*/}
                    {/*    disabled={submitButtonDisabled}*/}
                    {/*>{popUpData.submitButtonLabel}</button>*/}
                </div>
            </form>
            <PaymentRobokassa
                disabled={submitButtonDisabled}
                promoPicture={promoPicture}
                userData={{
                    email,
                    phoneNumber,
                    firstName,
                    lastName,
                    middleName
                }}
            />
        </section>
    )
})
