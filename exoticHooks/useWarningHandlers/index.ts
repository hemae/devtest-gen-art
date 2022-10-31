import {useAppDispatch, useAppSelector} from '@store'
import {SliceName} from '@store'
import {slices} from '@store'
import {useState} from 'react'
import {ErrorType} from '@apiModels/error'


type Returned = {
    setError: (error: ErrorType | null) => void
    setNotice: (notice: string) => void
    error: ErrorType | null
    notice: string
}

export default function useWarningHandlers(slice: SliceName): Returned {

    let [error, setError] = useState<ErrorType | null>(null)
    let [notice, setNotice] = useState<string>('')

    if (!slice) {
        return {
            setError, setNotice,
            error, notice
        }
    }

    const dispatch = useAppDispatch()

    //@ts-ignore
    return {
        //@ts-ignore
        setError: (error: ErrorType | null) => dispatch(slices[`${slice}Slice`].actions.setError(error)),
        //@ts-ignore
        setNotice: (notice: string) => dispatch(slices[`${slice}Slice`].actions.setNotice(notice)),
        ...useAppSelector(state => state[`${slice}Reducer`])
    }
}
