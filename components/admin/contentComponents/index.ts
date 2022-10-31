import {FC} from 'react'
import {DeliverySettings} from './DeliverySettings'
import {PaymentSettings} from './PaymentSettings'
import {FAQs} from './FAQs'
import {Globals} from './Globals'
import {Home} from './Home'
import {OrderRequests} from './OrderRequests'
import {Pages} from './Pages'
import {PromoPictures} from './PromoPictures'
import {Sections} from './Sections'
import {Promocodes} from './Promocodes'
import {Testimonials} from './Testimonials'

import {CDEK} from '../childComponents/delivery/CDEK'
import {RussianPost} from '../childComponents/delivery/RussianPost'
import {Robokassa} from '../childComponents/payment/Robokassa'

import {Main} from '../childComponents/pages/Main'
import {ContactsPage} from '../childComponents/pages/ContactsPage'
import {FAQsPage} from '../childComponents/pages/FAQsPage'
import {HowChooseAPhoto} from '../childComponents/pages/HowChooseAPhoto'
import {OrderRegistration} from '../childComponents/pages/OrderRegistration'
import {PurchaseQuestions} from '../childComponents/pages/PurchaseQuestions'
import {TermsAndConditions} from '../childComponents/pages/TermsAndConditions'

import {AcceptLanguages} from '../childComponents/globals/AcceptLanguages'
import {Header} from '../childComponents/globals/Header'
import {Footer} from '../childComponents/globals/Footer'
import {Scripts} from '../childComponents/globals/Scripts'
import {Styles} from '../childComponents/globals/Styles'
import {CookieMessage} from '../childComponents/pages/CookieMessage'

import {ChildComponent, ContentComponent} from '@components/admin/types'


const contentsComponents = {
    'globals': Globals,
    'delivery-settings': DeliverySettings,
    'payment-settings': PaymentSettings,
    'faqs': FAQs,
    'home': Home,
    'order-requests': OrderRequests,
    'pages': Pages,
    'promo-pictures': PromoPictures,
    'sections': Sections,
    'promocodes': Promocodes,
    'testimonials': Testimonials,

    'cdek': CDEK,
    'robokassa': Robokassa,

    'russian-post': RussianPost,

    'main': Main,
    'contacts-page': ContactsPage,
    'faqs-page': FAQsPage,
    'how-choose-a-photo': HowChooseAPhoto,
    'order-registration': OrderRegistration,
    'purchase-questions': PurchaseQuestions,
    'terms-and-conditions': TermsAndConditions,

    'header': Header,
    'footer': Footer,
    'accept-languages': AcceptLanguages,
    'scripts': Scripts,
    'styles': Styles,
    'cookie-message': CookieMessage,
} as Record<ContentComponent | ChildComponent, FC>

export default contentsComponents
