import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserFAQPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import handlers from '@requestHandlers/handlers'
import {parseLocale} from '@helpers/locale'
import getQuery from '@helpers/query'
import {FAQ} from '@apiModels/faq'
import {cacheControl} from '@serverHandlers'


export type FAQPageProps = StringResourcesProps & {
    faqs: FAQ[]
}

export const getServerSideProps: GetServerSideProps<FAQPageProps | {}> = async (context) => {
    let props = null
    try {
        const {req, res} = context
        cacheControl(res)

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserFAQPage>({
            target: 'faq',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const faqs = await handlers.gets<FAQ>({
            entity: 'faq',
            whole: true,
            token: null,
            locale,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as FAQ[]

        props = {
            pageData,
            layouts,
            faqs
        }
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
