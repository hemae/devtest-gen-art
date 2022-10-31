import {AdminData, ResponseData, UserData} from '@apiModels/common'


export type PageName =
    'main'
    | 'contacts'
    | 'faq'
    | 'how-choose-a-photo'
    | 'order-registration'
    | 'purchase-questions'
    | 'terms-and-conditions'

export type Page<PageData = Record<string, string | null>> = {
    pageTitle: string
    pageDescription: string
    pageImagePreview: string | null
    heroTitle: string | null
} & PageData

export type UserPage<PageData = {}> = UserData<Page<PageData>>
export type AdminPage<PageData = {}> = AdminData<Page<PageData>>
export type PageResponse<DataType = UserPage> = ResponseData<DataType>

type MainPageType = { top: string }
export type UserMainPage = UserData<Page<MainPageType>>
export type AdminMainPage = AdminData<Page<MainPageType>>
export type MainPageResponse<DataType = UserMainPage> = ResponseData<DataType>

type ContactsPageType = {}
export type UserContactsPage = UserData<Page<ContactsPageType>>
export type AdminContactsPage = AdminData<Page<ContactsPageType>>
export type ContactsPageResponse<DataType = UserContactsPage> = ResponseData<DataType>

type FAQPageType = {}
export type UserFAQPage = UserData<Page<FAQPageType>>
export type AdminFAQPage = AdminData<Page<FAQPageType>>
export type FAQPageResponse<DataType = UserFAQPage> = ResponseData<DataType>

type HowChooseAPhotoPageType = {}
export type UserHowChooseAPhotoPage = UserData<Page<HowChooseAPhotoPageType>>
export type AdminHowChooseAPhotoPage = AdminData<Page<HowChooseAPhotoPageType>>
export type HowChooseAPhotoPageResponse<DataType = UserHowChooseAPhotoPage> = ResponseData<DataType>

type OrderRegistrationPageType = {}
export type UserOrderRegistrationPage = UserData<Page<OrderRegistrationPageType>>
export type AdminOrderRegistrationPage = AdminData<Page<OrderRegistrationPageType>>
export type OrderRegistrationPageResponse<DataType = UserOrderRegistrationPage> = ResponseData<DataType>

type PurchaseQuestionsPageType = {}
export type UserPurchaseQuestionsPage = UserData<Page<PurchaseQuestionsPageType>>
export type AdminPurchaseQuestionsPage = AdminData<Page<PurchaseQuestionsPageType>>
export type PurchaseQuestionsPageResponse<DataType = UserPurchaseQuestionsPage> = ResponseData<DataType>

type TermsAndConditionsPageType = {}
export type UserTermsAndConditionsPage = UserData<Page<TermsAndConditionsPageType>>
export type AdminTermsAndConditionsPage = AdminData<Page<TermsAndConditionsPageType>>
export type TermsAndConditionsPageResponse<DataType = UserTermsAndConditionsPage> = ResponseData<DataType>


export type StringResources<MainPage = AdminMainPage,
    ContactsPage = AdminContactsPage,
    FAQPage = AdminFAQPage,
    HowChooseAPhotoPage = AdminHowChooseAPhotoPage,
    OrderRegistrationPage = AdminOrderRegistrationPage,
    PurchaseQuestionsPage = AdminPurchaseQuestionsPage,
    TermsAndConditionsPage = AdminTermsAndConditionsPage> = {
    main: MainPageResponse<MainPage>
    contacts: ContactsPageResponse<ContactsPage>
    faq: FAQPageResponse<FAQPage>
    'how-choose-a-photo': HowChooseAPhotoPageResponse<HowChooseAPhotoPage>
    'order-registration': OrderRegistrationPageResponse<OrderRegistrationPage>
    'purchase-questions': PurchaseQuestionsPageResponse<PurchaseQuestionsPage>
    'terms-and-conditions': TermsAndConditionsPageResponse<TermsAndConditionsPage>
}

export type StringResourcesResponse = ResponseData<StringResources>
