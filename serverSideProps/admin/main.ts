import {GetServerSideProps} from 'next'


export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    let props = null
    try {
        const {req} = context
        const {jwt} = req.cookies
        if (!jwt) return {notFound: true}
        props = {}
    } catch (e) {
        console.log(e)
    }

    return {
        props: props || {},
        redirect: props ? undefined : {destination: '/500'},
    }
}
