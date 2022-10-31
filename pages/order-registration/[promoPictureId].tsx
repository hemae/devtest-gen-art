import {NextPage} from 'next'
import styles from '@styles/pages/OrderRegistration.module.scss'
import MainLayout from '@layouts/Main'
import {OrderRegistrationPageProps} from '@serverSideProps/orderRegistration'
import {PromoPictureSection} from '@components/orderRegistration/PromoPictureSection'
import {SendOrderRequestForm} from '@components/orderRegistration/OrderRegistrationForm'

export {getServerSideProps} from '@serverSideProps/orderRegistration'


const OrderRegistration: NextPage<OrderRegistrationPageProps> = (props) => {

    const {
        promoPicture,
        pageData,
        layouts,
        popUpData
    } = props

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={`${pageData.pageDescription}: ${promoPicture.data.description}`}
            combinedClassName={styles.main}
            imagePreview={promoPicture.data.mainImage}
        >
            <h1>{pageData.heroTitle}</h1>
            <PromoPictureSection images={promoPicture.data.images}/>
            <div
                className={styles.main__price}
            ><span>Цена: </span><span>{promoPicture.data.price}</span><span>руб</span></div>
            <div id='forpvz' style={{width: '100%', height: '600px'}}/>
            <>{popUpData &&
            <SendOrderRequestForm
                popUpData={popUpData}
                promoPicture={promoPicture}
            />}</>
        </MainLayout>
    )
}

export default OrderRegistration








