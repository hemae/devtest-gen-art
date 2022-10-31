import {memo} from 'react'
import styles from './ContactSection.module.scss'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {ContactsSection as ContactsSectionType} from '@apiModels/contactSection'
import {Divider} from '@UI'
import {Contacts, Social} from '@apiModels/layouts/contacts'


type ContactSectionSectionProps = {
    section: ContactsSectionType
    contacts: Contacts
}

export const ContactSection = memo<ContactSectionSectionProps>((props) => {

    const {
        section,
        contacts
    } = props

    const {root} = useAdditionalAttributes({
        'data-id': `contact-section-${section.id}`,
        'order': section.order
    })

    return (
        <section
            ref={root}
            className={styles.main}
        >
            <h3>{section.data.title}</h3>
            <>{section.data.items.map(item => {

                const {root} = useAdditionalAttributes({
                    'data-id': `contact-section-item-${item.id}`,
                    'order': item.order
                })

                let additionalLabel = ''
                if (item.type) {
                    if (typeof contacts[item.type] === 'string') additionalLabel = contacts[item.type] as string
                    else additionalLabel = (contacts[item.type] as Social).src
                }

                let link: string | null

                switch (item.type) {
                    case 'email':
                        link = 'mailto:'
                        break
                    case 'phoneNumber':
                        link = 'tel:'
                        break
                    case 'telegram':
                        link = ''
                        break
                    case 'whatsApp':
                        link = ''
                        additionalLabel = additionalLabel.replace('+', '')
                        break
                    case 'vk':
                        link = 'https://'
                        break
                    default:
                        link = null
                }

                return (
                    <p
                        ref={root}
                        key={item.id}
                    >{item.label}{
                        link !== null
                            ? <>: <a target='_blank' href={`${link}${additionalLabel}`}>{
                                item.type
                                    ? typeof contacts[item.type] === 'string'
                                        ? contacts[item.type] as string
                                        : ((contacts[item.type] as Social).content || (contacts[item.type] as Social).src)
                                    : ''
                            }</a></>
                            : <>{additionalLabel}</>
                    }
                    </p>
                )
            })}</>
            <Divider/>
        </section>
    )
})
