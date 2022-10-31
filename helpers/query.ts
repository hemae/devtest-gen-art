type FiltersMethod = 'or' | 'and'

type Options = {
    sort?: string
    filters?: {
        method?: FiltersMethod
        params: string[]
    }
    pagination?: {
        page?: number
        pageSize?: number
    }
}

export default function getQuery(options: Options): string {

    const {sort, pagination, filters} = options

    let page: number | undefined
    let pageSize: number | undefined

    if (pagination) {
        page = pagination.page
        pageSize = pagination.pageSize
    }

    if (!sort && !page && !pageSize && !filters) return ''

    let queryString = ''

    let filtersQuery = ''
    if (filters) {
        const method = filters.method
        const params = filters.params
        filtersQuery = params.join('&filters=')
        if (params.length > 1) filtersQuery = `[${method || 'and'}]&filters=` + filtersQuery
    }


    if (sort) queryString += `&sort=${sort}`
    if (page !== undefined) queryString += `&page=${page}`
    if (pageSize !== undefined) queryString += `&pageSize=${pageSize}`
    if (filtersQuery) queryString += `&filters=${filtersQuery}`

    queryString = '?' + queryString.slice(1)

    return queryString
}
