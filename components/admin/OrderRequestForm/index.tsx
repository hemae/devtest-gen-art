import {memo} from 'react'
import styles from '../Form.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {DateComponent, ImagesPreview, Switcher} from '@UI'
import {DeleteButton} from '@admin/DeleteButton'
import {OrderRequest} from '@apiModels/orderRequest'
import useOrderRequestForm from '@admin/OrderRequestForm/useOrderRequestForm'


type OrderRequestFormProps = {
    orderRequest?: OrderRequest
}

export const OrderRequestForm = memo<OrderRequestFormProps>((props) => {

    const {
        orderRequest
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `testimonial-form-${orderRequest ? orderRequest.id : 'new'}`
    })

    const {
        handled,
        submitButtonDisabled,
        submit,
        images,
        checkboxChange,
        deleteClick,
        deleteImage,
        currentPromoPicture
    } = useOrderRequestForm({initialData: orderRequest})

    return (
        <section
            ref={root}
            className={styles.main}
        >
            {orderRequest && <DeleteButton onClick={deleteClick}/>}
            <DateComponent date={orderRequest?.createdAt || ''} withTime/>
            <p>{orderRequest?.firstName} {orderRequest?.middleName} {orderRequest?.lastName}</p>
            <p>{orderRequest?.email}</p>
            <p>{orderRequest?.phoneNumber}</p>
            <p>{orderRequest?.additionalInfo}</p>
            <>{currentPromoPicture &&
            <>
                <h2>Picture in the base</h2>
                <div
                    className={styles.main__mainPreview}
                >
                    <img src={currentPromoPicture.data['ru'].mainImage!} alt='main-image-preview'/>
                </div>
            </>}</>
            <Switcher
                checked={handled}
                onChange={checkboxChange('handled')}
                label={'Handled'}
            />
            <ImagesPreview
                images={images.map(image => image.src)}
                deleteImage={deleteImage}
            />
            <button
                disabled={submitButtonDisabled}
                onClick={submit}
            >{'Save'}</button>
        </section>
    )
})
