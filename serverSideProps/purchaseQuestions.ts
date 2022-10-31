import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserPurchaseQuestionsPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import {parseLocale} from '@helpers/locale'
import handlers from '@requestHandlers/handlers'
import getQuery from '@helpers/query'
import {PurchaseQuestionSection} from '@apiModels/purchaseQuestionsSection'
import {cacheControl} from '@serverHandlers'


export type PurchaseQuestionsPageProps = StringResourcesProps & {
    purchaseQuestionSections: PurchaseQuestionSection[]
}

export const getServerSideProps: GetServerSideProps<PurchaseQuestionsPageProps | {}> = async (context) => {
    let props = null
    try {
        const {req, res} = context
        cacheControl(res)

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserPurchaseQuestionsPage>({
            target: 'purchase-questions',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const purchaseQuestionSections = await handlers.gets<PurchaseQuestionSection>({
            entity: 'purchaseQuestionsSections',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as PurchaseQuestionSection[]

        props = {
            pageData,
            layouts,
            purchaseQuestionSections
        }
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
