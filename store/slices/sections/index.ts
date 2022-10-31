import {Reducer} from '@reduxjs/toolkit'
import {Section} from '@apiModels/sections'
import {getSections, sectionThunk} from '@slices/sections/sectionsThunkCreators'
import getSlice, {EntitiesState} from '@slices/getSlice'


export const sectionsSlice = getSlice<Section<{}>>({
    entity: 'sections',
    getEntities: getSections,
    entityThunk: sectionThunk
})

export default sectionsSlice.reducer as Reducer<EntitiesState<Section<{}>>, any>
