import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserOrderRegistrationPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import {parseLocale} from '@helpers/locale'
import {PromoPicture} from '@apiModels/promoPicture'
import handlers from '@requestHandlers/handlers'
import {Section, UserSectionData} from '@apiModels/sections'
import getQuery from '@helpers/query'
import {PromoButtons, SendOrderRequestPopUp} from '@apiModels/sections/promoButtons'
import {cacheControl} from '@serverHandlers'


export type OrderRegistrationPageProps = StringResourcesProps & {
    promoPicture: PromoPicture
    popUpData: SendOrderRequestPopUp | null
}

export const getServerSideProps: GetServerSideProps<OrderRegistrationPageProps | {}, any> = async (context) => {
    let props = null
    try {
        const {req, params, res} = context
        cacheControl(res)

        const {promoPictureId} = params
        if (!promoPictureId) return {notFound: true}

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserOrderRegistrationPage>({
            target: 'order-registration',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const promoPicture = await handlers.get<PromoPicture>({
            entity: 'promoPictures',
            id: promoPictureId,
            locale: locale || requestLocale,
            token: null
        })

        if (!promoPicture.publicVisible) return {notFound: true}

        const sections = await handlers.gets<Section<{}>>({
            entity: 'sections',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]', '[type]["promoButtons"]']},
            })
        }) as Section<UserSectionData<PromoButtons>>[]

        const promoButtonsSection = sections[0]

        const popUpData = promoButtonsSection?.data.data.popUpData || null as SendOrderRequestPopUp | null

        props = {
            promoPicture,
            pageData,
            layouts,
            popUpData
        }
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
