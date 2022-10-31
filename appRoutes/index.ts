
export type AppRouteKeys =
    'index'
    | 'contacts'
    | 'faq'
    | 'howChooseAPhoto'
    | 'orderRegistration'
    | 'purchaseQuestion'

    | 'adminIndex'
    | 'adminLogin'

export type AppRoutes =
    '/'
    | '/contacts'
    | '/faq'
    | '/how-choose-a-photo'
    | '/order-registration'
    | '/purchase-question'

    | '/admin'
    | '/admin/login'

export default {
    index: '/',
    contacts: '/contacts',
    faq: '/faq',
    howChooseAPhoto: '/how-choose-a-photo',
    orderRegistration: '/order-registration',
    purchaseQuestion: '/purchase-question',

    adminIndex: '/admin',
    adminLogin: '/admin/login'
} as Record<AppRouteKeys, AppRoutes>
