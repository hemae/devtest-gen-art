import {FormEventHandler, ChangeEventHandler, useCallback, useState} from 'react'
import {AuthData} from '../../../../store/API/authAPI/types'
import {useAppSelector} from '@store'


type InputType =
    'username'
    | 'password'

type Options = {
    onSubmit: (data: AuthData) => void
}

type Returned = {
    formSubmit: FormEventHandler<HTMLFormElement>
    inputChange: (type: InputType) => ChangeEventHandler<HTMLInputElement>
    username: string
    password: string
    isAuthLoading: boolean
}

export default function useAuthForm(options: Options): Returned {

    const {
        onSubmit
    } = options

    const {isAuthLoading} = useAppSelector(state => state.authReducer)

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const formSubmit: FormEventHandler<HTMLFormElement> = useCallback((event): void => {
        event.preventDefault()
        onSubmit({username, password})
    }, [onSubmit, username, password])

    const inputChange = (type: InputType): ChangeEventHandler<HTMLInputElement> => (event) => {
        switch (type) {
            case 'username':
                setUsername(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
            default:
                return
        }
    }

    return {
        formSubmit,
        inputChange,
        username,
        password,
        isAuthLoading
    }
}
