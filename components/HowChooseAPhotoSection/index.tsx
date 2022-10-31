import {memo} from 'react'
import styles from './HowChooseAPhotoSection.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {HowChooseAPhotoSection as HowChooseAPhotoSectionType} from '@apiModels/howChooseAPhotoSection'
import {Divider} from '@UI'
import WrongSVG from '../../assets/icons/wrong.svg'
import RightSVG from '../../assets/icons/right.svg'


type HowChooseAPhotoSectionProps = {
    section: HowChooseAPhotoSectionType
}

export const HowChooseAPhotoSection = memo<HowChooseAPhotoSectionProps>((props) => {

    const {
        section
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `how-choose-a-photo-section-${section.id}`,
        'order': section.order
    })

    return (
        <section
            ref={root}
            className={styles.main}
        >
            <h3>{section.data.title}</h3>
            <div
                className={styles.main__imagesWrapper}
            >
                {section.data.items.map(item => {
                    return (
                        <div
                            key={item.id}
                        >
                            <img src={item.src || ''} alt='how-choose-a-photo-image'/>
                            {item.right !== null ? <div>{item.right ? <RightSVG/> : <WrongSVG/>}</div> : <></>}
                        </div>
                    )
                })}
            </div>
            <Divider/>
        </section>
    )
})
