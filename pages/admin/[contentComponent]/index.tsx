import styles from '@styles/pages/admin/Admin.module.scss'
import {NextPage} from 'next'
import MainLayout from '@layouts/Main'
import {Content, Navbar} from '@admin'
import useContentComponent from '@pageHooks/admin/useContentComponent'
import transformPathIntoPhrase from '@helpers/transformPathIntoPhrase'

export {getServerSideProps} from '@serverSideProps/admin/main'


const ContentComponent: NextPage = () => {

    const {contentComponent} = useContentComponent()

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Admin Panel | ${transformPathIntoPhrase(contentComponent)}`}
            className={styles.main}
        >
            <Navbar/>
            <Content contentComponent={contentComponent}/>
        </MainLayout>
    )
}


export default ContentComponent
