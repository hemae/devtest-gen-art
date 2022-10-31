import {Reducer} from '@reduxjs/toolkit'
import getSlice, {EntitiesState} from '@slices/getSlice'
import {AdminPromoPicture, PromoPicture} from '@apiModels/promoPicture'
import {getPromoPictures, promoPictureThunk} from '@slices/promoPictures/promoPicturesThunkCreators'


export const promoPicturesSlice = getSlice<PromoPicture<AdminPromoPicture>>({
    entity: 'promoPictures',
    getEntities: getPromoPictures,
    entityThunk: promoPictureThunk
})

export default promoPicturesSlice.reducer as Reducer<EntitiesState<PromoPicture<AdminPromoPicture>>, any>
