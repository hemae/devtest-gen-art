import styles from '@styles/pages/admin/Admin.module.scss'
import {NextPage} from 'next'
import MainLayout from '@layouts/Main'
import {Content, Navbar} from '@admin'
import transformPathIntoPhrase from '@helpers/transformPathIntoPhrase'

export {getServerSideProps} from '@serverSideProps/admin/main'


const Admin: NextPage = () => {

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Admin Panel | ${transformPathIntoPhrase('home')}`}
            className={styles.main}
        >
            <Navbar/>
            <Content contentComponent='home'/>
        </MainLayout>
    )
}


export default Admin
