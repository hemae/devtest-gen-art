import {FC, memo} from 'react'
import styles from '../../Form.module.scss'
import {useAppSelector} from '@store'
import {Carousel} from '@apiModels/sections/carousel'
import {AdminSectionData, Section} from '@apiModels/sections'
import {CarouselLanguageForm} from '@admin/sectionForms/CarouselForm/CarouselLanguageForm'


type CarouselFormProps = {
    section?: Section<AdminSectionData<Carousel>>
}

export const CarouselForm: FC<CarouselFormProps> = memo<CarouselFormProps>((props) => {

    const {
        section
    } = props

    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    return (
        <section
            className={styles.main}
        >
            {acceptLanguages?.map(language => language.data.locale)
                .map(key => {
                    return (
                        <CarouselLanguageForm
                            key={key}
                            locale={key}
                            section={section}
                        />
                    )
                })}
        </section>
    )
})
