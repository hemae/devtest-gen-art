import {Entity} from '@apiModels/common'


export type Promocode = Entity<{
    name: string
    promocode: string
    expired: boolean
    reusable: boolean
    discount: number
}>
