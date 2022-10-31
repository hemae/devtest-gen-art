import type {NextPage} from 'next'
import styles from '@styles/pages/Home.module.scss'
import sectionComponents from '@sections'
import MainLayout from '@layouts/Main'


import {MainPageProps} from '@serverSideProps/main'
import useMainPage from '@pageHooks/useMainPage'

export {getServerSideProps} from '@serverSideProps/main'


const Home: NextPage<MainPageProps> = (props) => {

    const {
        pageData,
        layouts,
        sections,
        promoPictures,
        testimonials,
        faqs
    } = props

    useMainPage()

    return (
        <MainLayout
            layouts={layouts}
            title={`${process.env.APPLICATION_TITLE} | ${pageData.pageTitle}`}
            description={pageData.pageDescription}
            imagePreview={pageData.pageImagePreview}
            combinedClassName={styles.main}
        >
            {sections.map(section => {
                const Component = sectionComponents[section.type]
                if (!Component) return <></>
                const promoPicturesProps = section.type === 'gallery'
                    ? promoPictures
                    : undefined
                const testimonialsProps = section.type === 'testimonials'
                    ? testimonials
                    : undefined
                const faqsProps = section.type === 'questionAnswer'
                    ? faqs
                    : undefined
                return (
                    <>
                    {Component &&
                    <Component
                        key={section.id}
                        section={section}
                        promoPictures={promoPicturesProps}
                        testimonials={testimonialsProps}
                        faqs={faqsProps}
                    />}</>
                )
            })}
        </MainLayout>
    )
}


export default Home
