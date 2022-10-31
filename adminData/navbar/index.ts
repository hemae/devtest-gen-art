export type Link = {
    label: string
    path: string
    children: Link[] | null
    order: number
}

const navbarData: Link[] = [
    {
        label: 'Delivery settings',
        path: '/delivery-settings',
        children: [
            {
                label: 'CDEK',
                path: '/delivery-settings/cdek',
                children: null,
                order: 1
            },
            {
                label: 'Russian post',
                path: '/delivery-settings/russian-post',
                children: null,
                order: 2
            },
        ],
        order: 2
    },
    {
        label: 'Payment settings',
        path: '/payment-settings',
        children: [
            {
                label: 'Robokassa',
                path: '/payment-settings/robokassa',
                children: null,
                order: 1
            },
        ],
        order: 3
    },
    {
        label: 'FAQs',
        path: '/faqs',
        children: null,
        order: 4
    },
    {
        label: 'Globals',
        path: '/globals',
        children: [
            {
                label: 'Header',
                path: '/globals/header',
                children: null,
                order: 1
            },
            {
                label: 'Footer',
                path: '/globals/footer',
                children: null,
                order: 2
            },
            {
                label: 'Accept languages',
                path: '/globals/accept-languages',
                children: null,
                order: 3
            },
            {
                label: 'Scripts',
                path: '/globals/scripts',
                children: null,
                order: 4
            },
            {
                label: 'Styles',
                path: '/globals/styles',
                children: null,
                order: 5
            },
            {
                label: 'Cookie message',
                path: '/globals/cookie-message',
                children: null,
                order: 5
            },
        ],
        order: 5
    },
    {
        label: 'Order requests',
        path: '/order-requests',
        children: null,
        order: 6
    },
    {
        label: 'Pages',
        path: '/pages',
        children: [
            {
                label: 'Main',
                path: '/pages/main',
                children: null,
                order: 1
            },
            {
                label: 'Contacts',
                path: '/pages/contacts-page',
                children: null,
                order: 2
            },
            {
                label: 'How choose a photo',
                path: '/pages/how-choose-a-photo',
                children: null,
                order: 3
            },
            {
                label: 'Order registration',
                path: '/pages/order-registratione',
                children: null,
                order: 4
            },
            {
                label: 'Purchase questions',
                path: '/pages/purchase-questions',
                children: null,
                order: 5
            },
            {
                label: 'Terms and conditions',
                path: '/pages/terms-and-conditions',
                children: null,
                order: 6
            },
            {
                label: 'FAQ',
                path: '/pages/faqs-page',
                children: null,
                order: 7
            },
        ],
        order: 7
    },
    {
        label: 'Promo pictures',
        path: '/promo-pictures',
        children: null,
        order: 8
    },
    {
        label: 'Sections',
        path: '/sections',
        children: null,
        order: 9
    },
    {
        label: 'Promocodes',
        path: '/promocodes',
        children: null,
        order: 10
    },
    {
        label: 'Testimonials',
        path: '/testimonials',
        children: null,
        order: 11
    }
]

export default navbarData
