import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {Section} from '@apiModels/sections'
import {PromoPicture} from '@apiModels/promoPicture'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserMainPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import handlers from '@requestHandlers/handlers'
import {parseLocale} from '@helpers/locale'
import getQuery from '@helpers/query'
import {Testimonial} from '@apiModels/testimonial'
import {FAQ} from '@apiModels/faq'
import {cacheControl} from '@serverHandlers'


export type MainPageProps = StringResourcesProps & {
    sections: Section<{}>[]
    promoPictures: PromoPicture[]
    testimonials: Testimonial[]
    faqs: FAQ[]
}


export const getServerSideProps: GetServerSideProps<MainPageProps | {}> = async (context) => {
    let props = null
    try {
        const {req, res} = context
        cacheControl(res)

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserMainPage>({
            target: 'main',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const sections = await handlers.gets<Section<{}>>({
            entity: 'sections',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as Section<{}>[]

        const promoPictures = await handlers.gets<PromoPicture>({
            entity: 'promoPictures',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as PromoPicture[]

        const testimonials = await handlers.gets<Testimonial>({
            entity: 'testimonials',
            whole: true,
            token: null,
            query: getQuery({
                sort: 'desc:createdAt',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as Testimonial[]

        const faqs = await handlers.gets<FAQ>({
            entity: 'faq',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as FAQ[]

        props = {
            pageData,
            layouts,
            sections,
            promoPictures,
            testimonials,
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
