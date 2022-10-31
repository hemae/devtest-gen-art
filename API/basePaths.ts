export type BasePathsKeys =
    'stringResources'
    | 'layouts'
    | 'sections'
    | 'contactsSections'
    | 'howChooseAPhotoSections'
    | 'orderRegistrationSections'
    | 'purchaseQuestionsSections'
    | 'testimonialPopupSections'
    | 'promoPictures'
    | 'faq'
    | 'testimonials'
    | 'promocodes'
    | 'acceptLanguages'
    | 'orderRequests'

export type BasePaths =
    '/string-resources'
    | '/layouts'
    | '/sections'
    | '/contacts-sections'
    | '/how-choose-a-photo-sections'
    | '/order-registration-sections'
    | '/purchase-questions-sections'
    | '/testimonial-popup-sections'
    | '/promo-pictures'
    | '/faq'
    | '/testimonials'
    | '/promocodes'
    | '/layouts/acceptLanguages'
    | '/order-requests'

export default {
    stringResources: '/string-resources',
    layouts: '/layouts',
    sections: '/sections',
    contactsSections: '/contacts-sections',
    howChooseAPhotoSections: '/how-choose-a-photo-sections',
    orderRegistrationSections: '/order-registration-sections',
    purchaseQuestionsSections: '/purchase-questions-sections',
    testimonialPopupSections: '/testimonial-popup-sections',
    promoPictures: '/promo-pictures',
    faq: '/faq',
    testimonials: '/testimonials',
    promocodes: '/promocodes',
    acceptLanguages: '/layouts/acceptLanguages',
    orderRequests: '/order-requests'
} as Record<BasePathsKeys, BasePaths>
