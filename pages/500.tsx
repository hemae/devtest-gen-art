import {NextPage} from 'next'
import styles from '@styles/pages/Error.module.scss'
import {LinkMarkdown} from '@appComponents'
import appRoutes from '@appRoutes'
import MainLayout from '@layouts/Main'


const SomethingWentWrong: NextPage = () => {

    return (
        <MainLayout
            title={`${process.env.APPLICATION_TITLE} | Что-то пошло не так`}
            className={styles.main}
        >
            <div><img src='/logo.png' alt=''/></div>
            <LinkMarkdown>{
                `Что-то пошло не так, перейти на [главную](${appRoutes.index})`
            }</LinkMarkdown>
        </MainLayout>
    )
}

export default SomethingWentWrong
