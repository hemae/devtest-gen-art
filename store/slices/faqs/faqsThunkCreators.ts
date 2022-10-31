import {UniqueId} from '@apiModels/common'
import {getThunks} from '../../thunkGetter'
import {FAQ} from '@apiModels/faq'


type FAQsOptions = {
    id?: UniqueId
    data?: Record<string, any>
}

const thunks = getThunks<FAQ>({entity: 'faq'})

export const getFAQs = thunks.getThunkGetEntities

export const FAQThunk = thunks.getThunkEntity

export const addFAQ = (options: FAQsOptions) => FAQThunk({
    ...options,
    method: 'post'
})

export const updateFAQ = (options: FAQsOptions) => FAQThunk({
    ...options,
    method: 'put'
})

export const deleteFAQ = (options: FAQsOptions) => FAQThunk({
    ...options,
    method: 'delete'
})
