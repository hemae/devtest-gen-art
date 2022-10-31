import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserHowChooseAPhotoPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import {parseLocale} from '@helpers/locale'
import handlers from '@requestHandlers/handlers'
import getQuery from '@helpers/query'
import {HowChooseAPhotoSection} from '@apiModels/howChooseAPhotoSection'
import {cacheControl} from '@serverHandlers'


export type HowChooseAPhotoPageProps = StringResourcesProps & {
    howChooseAPhotoSections: HowChooseAPhotoSection[]
}

export const getServerSideProps: GetServerSideProps<HowChooseAPhotoPageProps | {}> = async (context) => {
    let props = null
    try {
        const {req, res} = context
        cacheControl(res)

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserHowChooseAPhotoPage>({
            target: 'how-choose-a-photo',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const howChooseAPhotoSections = await handlers.gets<HowChooseAPhotoSection>({
            entity: 'howChooseAPhotoSections',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as HowChooseAPhotoSection[]

        props = {
            pageData,
            layouts,
            howChooseAPhotoSections
        }
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
