import {Entity} from '@apiModels/common'

export type OrderManualItem = Entity<{
    title: string
    src: string | null
}>

export type OrderManual = {
    items: OrderManualItem[]
}
