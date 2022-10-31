import {memo} from 'react'
import styles from './AuthForm.module.scss'
import useAuthForm from '@components/UI/AuthForm/useAuthForm'
import {AuthData} from '../../../store/API/authAPI/types'
import {Loader} from '@UI'


type AuthFormProps = {
    onSubmit: (data: AuthData) => void
}

export const AuthForm = memo<AuthFormProps>((props) => {

    const {
        onSubmit
    } = props

    const {
        formSubmit,
        inputChange,
        username,
        password,
        isAuthLoading
    } = useAuthForm({onSubmit})

    return (
        <form
            className={styles.main}
            onSubmit={formSubmit}
        >
            <input
                placeholder='Username'
                value={username}
                onChange={inputChange('username')}
            />
            <input
                placeholder='Password'
                type='password'
                value={password}
                onChange={inputChange('password')}
            />
            <button
                type='submit'
                disabled={isAuthLoading}
            >{isAuthLoading ? <Loader size={16}/> : 'Sign in'}</button>
        </form>
    )
})
