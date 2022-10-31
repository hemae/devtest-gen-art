import {Component, ErrorInfo} from 'react'
import styles from '@styles/pages/Error.module.scss'
import MainLayout from '@layouts/Main'
import {LinkMarkdown} from '../LinkMarkdown'
import appRoutes from '@appRoutes'


type ErrorBoundaryProps = {
    children: JSX.Element[] | JSX.Element
}

type ErrorBoundaryState = {
    error: string | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {error: null}
    }

    static getDerivedStateFromError(error: string) {
        return {error}
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log({error, errorInfo})
    }

    render() {
        if (this.state.error) {
            return (
                <MainLayout
                    title={`${process.env.APPLICATION_TITLE} | Что-то пошло не так`}
                    className={styles.main}
                >
                    <div><img src='/logo.png' alt=''/></div>
                    <LinkMarkdown>{
                        `Что-то пошло не так :(, перейти на [главную](${appRoutes.index})`
                    }</LinkMarkdown>
                </MainLayout>
            )
        }

        return this.props.children
    }
}
