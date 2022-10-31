export type ContentComponent =
    'delivery-settings'
    | 'payment-settings'
    | 'faqs'
    | 'home'
    | 'order-requests'
    | 'pages'
    | 'promo-pictures'
    | 'sections'
    | 'promocodes'
    | 'testimonials'

type PaymentComponent =
    'robokassa'

type DeliveryComponent =
    'cdek'
    | 'russian-post'

type PageComponent =
    'contacts-page'
    | 'faqs-page'
    | 'how-choose-a-photo'
    | 'main'
    | 'order-registration'
    | 'purchase-questions'
    | 'terms-and-conditions'

type GlobalComponent =
    'header'
    | 'footer'
    | 'accept-languages'
    | 'scripts'
    | 'styles'
    | 'cookie-message'

export type ChildComponent =
    DeliveryComponent
    | PaymentComponent
    | PageComponent
    | GlobalComponent

