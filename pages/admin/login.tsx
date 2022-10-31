import styles from '@styles/pages/admin/AdminLogin.module.scss'
import {NextPage} from 'next'
import MainLayout from '@layouts/Main'
import useAdminLoginPage from '@pageHooks/admin/useAdminLoginPage'
import {AuthForm} from '@components/UI/AuthForm'

export {getServerSideProps} from '@serverSideProps/admin/login'


const AdminLogin: NextPage = () => {

    const {authFormSubmit} = useAdminLoginPage()

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Admin Panel`}
            combinedClassName={styles.main}
        >
            <AuthForm onSubmit={authFormSubmit}/>
        </MainLayout>
    )
}


export default AdminLogin
