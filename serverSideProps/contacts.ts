import {StringResourcesProps} from '@serverSideProps/types'
import {GetServerSideProps} from 'next'
import {getStringResourcesHandler} from '@requestHandlers/stringResources'
import {UserContactsPage} from '@apiModels/stringResources'
import {getLayoutsHandler} from '@requestHandlers/layouts'
import {parseLocale} from '@helpers/locale'
import {ContactsSection} from '@apiModels/contactSection'
import handlers from '@requestHandlers/handlers'
import getQuery from '@helpers/query'
import {cacheControl} from '@serverHandlers'


export type ContactsPageProps = StringResourcesProps & {
    contactsSections: ContactsSection[]
}

export const getServerSideProps: GetServerSideProps<ContactsPageProps | {}> = async (context) => {
    let props = null
    try {
        const {req, res} = context
        cacheControl(res)

        const {locale} = req.cookies

        let requestLocale = parseLocale(req.rawHeaders[req.rawHeaders.findIndex(el => el === 'Accept-Language') + 1])

        const pageData = await getStringResourcesHandler<UserContactsPage>({
            target: 'contacts',
            token: null,
            locale: locale || requestLocale
        })
        const layouts = await getLayoutsHandler(locale || requestLocale, null)

        const contactsSections = await handlers.gets<ContactsSection>({
            entity: 'contactsSections',
            whole: true,
            locale: locale || requestLocale,
            token: null,
            query: getQuery({
                sort: 'asc:order',
                filters: {params: ['[publicVisible][true]']}
            })
        }) as ContactsSection[]

        props = {
            pageData,
            layouts,
            contactsSections
        }
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
