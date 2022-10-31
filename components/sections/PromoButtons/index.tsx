import {FC, memo} from 'react'
import styles from './PromoButtons.module.scss'
import classNames from 'classnames'
import {Section, UserSectionData} from '@apiModels/sections'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {PromoButtons} from '@apiModels/sections/promoButtons'
import usePromoButtons from '@components/sections/PromoButtons/usePromoButtons'


type PromoButtonsComponentProps = {
    section: Section<UserSectionData<PromoButtons>>
}

export const PromoButtonsComponent: FC<PromoButtonsComponentProps> = memo<PromoButtonsComponentProps>(({section}) => {

    const {
        id,
        order,
        data,
        type
    } = section

    const {
        data: sectionData,
        backgroundImage,
        title
    } = data

    const {items, popUpData} = sectionData

    const {root} = useAdditionalAttributes({
        'data-id': `${type}-${id}`,
        'order': order
    })

    const {openOrderRequestPopup} = usePromoButtons({popUpData})

    return (
        <section
            id={id}
            ref={root}
            className={styles.main}
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <aside className={styles.top}/>
            <h2>{title}</h2>
            <div className={styles.main__wrapper}>
                {items
                    .sort((button1, button2) => {
                        if (button1.order! > button2.order!) return 1
                        if (button1.order! < button2.order!) return -1
                        return 0
                    })
                    .map((button) => {
                        return (
                            <div
                                key={button.id}
                                className={styles[button.align]}
                            >
                                <div>
                                    <button
                                        onClick={button.action === 'open-order-request-popup' ? openOrderRequestPopup : undefined}
                                    >{button.title}</button>
                                    <div>
                                        <div id='pale'/>
                                        <p>{button.description}</p>
                                    </div>
                                    <div className={styles.main__divider}/>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <aside className={styles.bottom}/>
        </section>
    )
})
