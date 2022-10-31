import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'
import {getPromoPictures} from '@slices/promoPictures/promoPicturesThunkCreators'


type Returned = {
    promoPictures: PromoPicture<AdminPromoPicture>[]
}

export default function usePromoPictures(): Returned {

    const {promoPictures} = useAppSelector(state => state.promoPicturesReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPromoPictures())
    }, [])

    return {
        promoPictures
    }
}
