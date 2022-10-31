import {ResponseData} from '@apiModels/common'
import {AcceptLanguages, UserAcceptLanguages} from './acceptLanguages'
import {Header, UserHeader} from './header'
import {Footer, UserFooter} from './footer'
import {Styles, UserStyles} from './styles'
import {Scripts, UserScripts} from './scripts'
import {CookieMessage, UserCookieMessage} from '@apiModels/layouts/cookieMessage'
import {Contacts, UserContacts} from '@apiModels/layouts/contacts'


export type LayoutName =
    'acceptLanguages'
    | 'cookieMessage'
    | 'header'
    | 'footer'
    | 'styles'
    | 'scripts'
    | 'contacts'

export type Layouts<AcceptLanguagesDataType = UserAcceptLanguages,
    CookieMessageDataType = UserCookieMessage,
    HeaderDataType = UserHeader,
    ContactsDataType = UserContacts,
    FooterDataType = UserFooter,
    StylesDataType = UserStyles,
    ScriptsDataType = UserScripts> = {
    acceptLanguages: ResponseData<AcceptLanguages<AcceptLanguagesDataType>>
    cookieMessage: ResponseData<CookieMessage<CookieMessageDataType>>
    header: ResponseData<Header<HeaderDataType>>
    contacts: ResponseData<Contacts<ContactsDataType>>
    footer: ResponseData<Footer<FooterDataType>>
    styles: ResponseData<Styles<StylesDataType>>
    scripts: ResponseData<Scripts<ScriptsDataType>>
}

export type LayoutsResponse = ResponseData<Layouts>
