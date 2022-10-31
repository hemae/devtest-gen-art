import {memo} from 'react'
import styles from './FAQ.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {FAQ as FAQType} from '@apiModels/faq'
import Toggle from '../../assets/icons/toggle.svg'
import useFAQ from '@components/FAQ/useFAQ'
import classNames from 'classnames'
import {LinkMarkdown} from '@appComponents'


type FAQProps = {
    faq: FAQType
}

export const FAQ = memo<FAQProps>((props) => {

    const {
        faq
    } = props

    const {root} = useAdditionalAttributes<HTMLDivElement>({'data-id': `faq-${faq.id}`})

    const {
        contentHidden,
        active,
        toggleClick
    } = useFAQ()

    return (
        <div
            ref={root}
            className={styles.main}
        >
            <div
                className={styles.main__header}
                onClick={toggleClick}
            >
                <div><Toggle
                    className={classNames({[styles.active]: active})}
                /></div>
                <h3>{faq.data.title}</h3>
            </div>
            <div
                className={classNames(
                    styles.main__body,
                    {[styles.hidden]: contentHidden},
                    {[styles.active]: active}
                )}
            >
                <LinkMarkdown>{faq.data.description}</LinkMarkdown>
                <div>
                    {faq.data.images?.length
                    ? faq.data.images.map(image => {
                        return (
                            <div
                                key={image.id}
                            ><img src={image.src} alt='faq-image'/></div>
                        )
                    })
                    : <></>}
                </div>
            </div>
        </div>
    )
})
