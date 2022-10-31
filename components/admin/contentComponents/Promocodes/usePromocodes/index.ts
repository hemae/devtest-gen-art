import {Promocode} from '@apiModels/promocode'
import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import {getPromocodes} from '@slices/promocodes/promocodesThunkCreators'


type Returned = {
    promocodes: Promocode[]
}

export default function usePromocodes(): Returned {

    const {promocodes} = useAppSelector(state => state.promocodesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPromocodes())
    }, [])

    return {
        promocodes
    }
}
