import {NextPage} from 'next'
import styles from '@styles/pages/Contacts.module.scss'
import MainLayout from '@layouts/Main'
import {ContactsPageProps} from '@serverSideProps/contacts'
import {ContactSection} from '@components/ContactSection'

export {getServerSideProps} from '@serverSideProps/contacts'


const Contacts: NextPage<ContactsPageProps> = (props) => {

    const {
        pageData,
        layouts,
        contactsSections
    } = props

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={pageData.pageDescription}
            combinedClassName={styles.main}
        >
            <h1>{pageData.heroTitle}</h1>
            <>{contactsSections.map(section => {
                return (
                    <ContactSection
                        key={section.id}
                        section={section}
                        contacts={layouts.contacts.data}
                    />
                )
            })}</>
        </MainLayout>
    )
}

export default Contacts
