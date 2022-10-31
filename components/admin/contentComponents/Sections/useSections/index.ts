import {useAppDispatch, useAppSelector} from '@store'
import {useEffect} from 'react'
import {getSections} from '@slices/sections/sectionsThunkCreators'
import {AdminSectionData, Section, SectionDataTypeList} from '@apiModels/sections'


type Returned = {
    sections: Section<AdminSectionData<SectionDataTypeList>>[]
}

export default function useSections(): Returned {

    const {sections} = useAppSelector(state => state.sectionsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSections())
    }, [])

    return {
        sections
    }
}
