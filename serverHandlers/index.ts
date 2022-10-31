import appRoutes from '@appRoutes'


export function cacheControl(res: any, cacheControl?: string) {
    res.setHeader('Cache-Control', cacheControl || 'public, s-maxage=10, stale-while-revalidate=59')
}

export function redirect(res: any, targetUrl: string) {
    res.writeHead(301, {Location: targetUrl})
    return res.end()
}

export function indexRedirect(res: any) {
    res.writeHead(301, {Location: appRoutes.index})
    return res.end()
}

export function adminRedirect(res: any) {
    res.writeHead(301, {Location: appRoutes.adminIndex})
    return res.end()
}
