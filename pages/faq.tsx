import {NextPage} from 'next'
import styles from '@styles/pages/FAQ.module.scss'
import MainLayout from '@layouts/Main'
import {FAQPageProps} from '@serverSideProps/faq'
import {FAQ} from '@components'


export {getServerSideProps} from '@serverSideProps/faq'

const FAQPage: NextPage<FAQPageProps> = (props) => {

    const {
        pageData,
        layouts,
        faqs
    } = props

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={pageData.pageDescription}
            combinedClassName={styles.main}
        >
            <>
                <h1>{pageData.heroTitle}</h1>
                {faqs.map(faq => {
                    return (
                        <FAQ
                            key={faq.id}
                            faq={faq}
                        />
                    )
                })}
            </>
        </MainLayout>
    )
}

export default FAQPage
