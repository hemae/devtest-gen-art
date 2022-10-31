import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import {AdminFAQ, FAQ} from '@apiModels/faq'
import {getFAQs} from '@slices/faqs/faqsThunkCreators'


type Returned = {
    faq: FAQ<AdminFAQ>[]
}

export default function useFAQs(): Returned {

    const {faq} = useAppSelector(state => state.faqsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFAQs())
    }, [])

    return {
        faq
    }
}
