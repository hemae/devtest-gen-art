export type Meta = {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export type FullResponse<Entity> = {
    data: Entity[]
    meta: Meta
}
