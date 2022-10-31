import {useEffect, useState} from 'react'
import {ErrorType} from '@apiModels/error'


type Options = {
    setError: (error: ErrorType | null) => void
    setNotice?: (notice: string) => void
    text: string
}

type Returned = {
    isWarningsShown: boolean
}

export default function useWarnings(options: Options): Returned {

    const {
        setError,
        setNotice,
        text
    } = options

    const [isWarningsShown, setIsWarningsShown] = useState<boolean>(true)

    useEffect(() => {
        setError(null)
        if (setNotice) {
            setNotice('')
        }

        return () => {
            setError(null)
            if (setNotice) {
                setNotice('')
            }
        }
    }, [])

    useEffect(() => {
        if (!!text) {
            setTimeout(() => {
                setIsWarningsShown(false)
            }, 4000)
            setTimeout(() => {
                setIsWarningsShown(true)
                setError(null)
                if (setNotice) {
                    setNotice('')
                }
            }, 7000)
        }
    }, [text])

    return {
        isWarningsShown
    }
}
