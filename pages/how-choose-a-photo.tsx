import {NextPage} from 'next'
import styles from '@styles/pages/HowChooseAPhoto.module.scss'
import MainLayout from '@layouts/Main'
import {HowChooseAPhotoPageProps} from '@serverSideProps/howChooseAPhoto'
import {HowChooseAPhotoSection} from '@components'


export {getServerSideProps} from '@serverSideProps/howChooseAPhoto'

const HowChooseAPhotoPage: NextPage<HowChooseAPhotoPageProps> = (props) => {

    const {
        pageData,
        layouts,
        howChooseAPhotoSections
    } = props

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={pageData.pageDescription}
            combinedClassName={styles.main}
        >
            <h1>{pageData.heroTitle}</h1>
            <>{howChooseAPhotoSections.map(section => {
                return (
                    <HowChooseAPhotoSection
                        key={section.id}
                        section={section}
                    />
                )
            })}</>
        </MainLayout>
    )
}

export default HowChooseAPhotoPage
