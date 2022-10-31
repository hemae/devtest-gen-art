import {IncomingMessage, ServerResponse} from 'http'
import {NextApiRequestCookies} from 'next/dist/server/api-utils'


export const getCookie = (req: IncomingMessage & { cookies: NextApiRequestCookies }): Record<string, string> => {
    let cookies = {}
    if (!req.headers.cookie) return cookies
    req.headers.cookie.split('; ')
        .forEach(cookie => {
            const [cookieName, cookieValue] = cookie.split('=')
            //@ts-ignore
            cookies[cookieName] = cookieValue
        })
    return cookies
}

export const writeCookie = (res: ServerResponse, req: IncomingMessage & { cookies: NextApiRequestCookies }, cookieName: string, cookie: string): void => {
    const cookies = getCookie(req)
    console.log(cookies)
    cookies[cookieName] = cookie
    res.setHeader(
        'cookie',
        Object
            .keys(cookies)
            .map(key => [key, cookies[key]])
            .reduce((cookies, cookieItem) => {
                return [...cookies, ...cookieItem]
            }, [])
            .join(' ')
    )
}
