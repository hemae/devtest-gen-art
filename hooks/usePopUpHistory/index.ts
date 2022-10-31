import {useEffect} from 'react'
import router, {useRouter} from 'next/router'
import {useAppDispatch} from '@store'
import {closePopUp} from '@slices/popUps'


const paramName = 'pop-up-name'

type Options = {
    popUpName: string
    closeHandler?: () => void
}

export default function usePopUpHistory(options: Options): void {

    const {
        popUpName,
        closeHandler
    } = options

    const {asPath, query} = useRouter()

    const dispatch = useAppDispatch()

    useEffect(() => {
        router.push(`${asPath}?${paramName}=${popUpName}`)
    }, [asPath, popUpName])

    useEffect(() => {
        if (query[paramName] !== popUpName) {
            if (!closeHandler) dispatch(closePopUp())
            else closeHandler()
        }
    }, [query[paramName], closeHandler])
}
