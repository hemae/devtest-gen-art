import {CarouselForm} from './CarouselForm'
import {AdminSectionData, Section, SectionDataTypeList, SectionTypes} from '@apiModels/sections'
import {FC} from 'react'


export default {
    carousel: CarouselForm
} as Record<SectionTypes, FC<{section?: Section<AdminSectionData<SectionDataTypeList>>}>>
