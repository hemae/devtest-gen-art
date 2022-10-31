
export function parseQueryParams(path: string): Record<string, string> {
    const query = path.split('?')[1]

    let params: Record<any, string> = {}

    query
        .split('&')
        .map(param => param.split('='))
        .forEach(param => params[param[0]] = param[1])

    return params
}

export function removeQueryParametersFromPath(path: string, paramNames: string[]): string {

    const params = parseQueryParams(path)

    return '?' + Object
        .keys(params)
        .filter(key => !paramNames.includes(key))
        .map(key => `${key}=${params[key]}`)
        .join('&')
}
