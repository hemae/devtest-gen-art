import {Language} from '@apiModels/layouts/acceptLanguages'
import {useAppSelector} from '@store'

type Returned = {
    acceptLanguages: Language[] | null
}

export default function useAcceptLanguages(): Returned {

    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    return {
        acceptLanguages
    }
}
