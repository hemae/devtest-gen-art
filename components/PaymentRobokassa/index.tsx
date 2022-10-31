import {memo} from 'react'
import styles from './PaymentRobokassa.module.scss'
import {Input} from '@UI'
import usePaymentRobokassa from '@components/PaymentRobokassa/usePaymentRobokassa'
import {PromoPicture} from '@apiModels/promoPicture'


type PaymentRobokassaProps = {
    promoPicture: PromoPicture
    userData: {
        email: string
        phoneNumber: string
        firstName: string
        lastName?: string
        middleName?: string
    }
    disabled: boolean
}

export const PaymentRobokassa = memo<PaymentRobokassaProps>((props) => {

    const {
        promoPicture, userData,
        disabled
    } = props

    const deliveryCost = 590

    const {
        payClick
    } = usePaymentRobokassa({promoPicture, userData, deliveryCost})

    return (
        <div className={styles.main}>
            <div
                className={styles.main__column}
            >
                <div
                    className={styles.main__item}
                >
                    <span>Картина по фото</span>
                    <Input value={promoPicture.data.price} disabled/>
                </div>
                <div
                    className={styles.main__item}
                >
                    <span>Доставка СДЭК</span>
                    <Input value='590 руб.' disabled/>
                </div>
            </div>
            <div
                className={styles.main__column}
            >
                <div
                    className={styles.main__item}
                >
                    <Input value={`${promoPicture.data.price + deliveryCost}`} disabled/>
                </div>
                <button
                    onClick={payClick}
                    disabled={disabled}
                >Оплатить заказ</button>
                <div
                    className={styles.main__paymentImage}
                ><img src='/payment-systems.png' alt='payment-systems'/></div>
            </div>
        </div>
    )
})
