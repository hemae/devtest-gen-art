import {NextPage} from 'next'
import styles from '@styles/pages/PurchaseQuestions.module.scss'
import MainLayout from '@layouts/Main'
import {PurchaseQuestionsPageProps} from '@serverSideProps/purchaseQuestions'
import {PurchaseQuestionSection} from '@components'

export {getServerSideProps} from '@serverSideProps/purchaseQuestions'


const HowChooseAPhotoPage: NextPage<PurchaseQuestionsPageProps> = (props) => {

    const {
        pageData,
        layouts,
        purchaseQuestionSections
    } = props

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={pageData.pageDescription}
            combinedClassName={styles.main}
        >
            <h1>{pageData.heroTitle}</h1>
            <>{purchaseQuestionSections.map(section => {
                return (
                    <PurchaseQuestionSection
                        key={section.id}
                        section={section}
                    />
                )
            })}</>
        </MainLayout>
    )
}

export default HowChooseAPhotoPage
