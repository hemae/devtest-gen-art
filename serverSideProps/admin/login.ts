import {GetServerSideProps} from 'next'
import {adminRedirect} from '@serverHandlers'


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    let props = null
    try {
        const {req, res, query} = context
        const {code} = query
        if (!code) return {notFound: true}
        if (req.cookies.jwt) return adminRedirect(res)
        props = {}
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
