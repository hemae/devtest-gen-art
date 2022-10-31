import styles from '@styles/pages/admin/Admin.module.scss'
import {NextPage} from 'next'
import MainLayout from '@layouts/Main'
import {Content, Navbar} from '@admin'
import useContentComponent from '@pageHooks/admin/useContentComponent'
import transformPathIntoPhrase from '@helpers/transformPathIntoPhrase'

export {getServerSideProps} from '@serverSideProps/admin/main'


const ContentComponent: NextPage = () => {

    const {childComponent, contentComponent} = useContentComponent()

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Admin Panel | ${transformPathIntoPhrase(contentComponent)} | ${transformPathIntoPhrase(childComponent)}`}
            className={styles.main}
        >
            <Navbar/>
            <Content contentComponent={childComponent}/>
        </MainLayout>
    )
}


export default ContentComponent
