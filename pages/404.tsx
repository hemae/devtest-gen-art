import {NextPage} from 'next'
import MainLayout from '@layouts/Main'
import styles from '@styles/pages/Error.module.scss'
import {LinkMarkdown} from '@appComponents'
import appRoutes from '@appRoutes'


const NotFound: NextPage = () => {

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Не найдено`}
            className={styles.main}
        >
            <div><img src='/logo.png' alt=''/></div>
            <LinkMarkdown>{
                `Этой страницы не существует, перейти на [главную](${appRoutes.index})`
            }</LinkMarkdown>
        </MainLayout>
    )
}

export default NotFound
