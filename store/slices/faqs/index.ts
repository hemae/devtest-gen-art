import {Reducer} from '@reduxjs/toolkit'
import getSlice, {EntitiesState} from '@slices/getSlice'
import {FAQThunk, getFAQs} from '@slices/faqs/faqsThunkCreators'
import {AdminFAQ, FAQ} from '@apiModels/faq'


export const faqsSlice = getSlice<FAQ<AdminFAQ>>({
    entity: 'faq',
    getEntities: getFAQs,
    entityThunk: FAQThunk
})

export default faqsSlice.reducer as Reducer<EntitiesState<FAQ<AdminFAQ>>, any>
