import {Reducer} from '@reduxjs/toolkit'
import getSlice, {EntitiesState} from '@slices/getSlice'
import {Promocode} from '@apiModels/promocode'
import {getPromocodes, promocodeThunk} from '@slices/promocodes/promocodesThunkCreators'


export const promocodesSlice = getSlice<Promocode>({
    entity: 'promocodes',
    getEntities: getPromocodes,
    entityThunk: promocodeThunk
})

export default promocodesSlice.reducer as Reducer<EntitiesState<Promocode>, any>
