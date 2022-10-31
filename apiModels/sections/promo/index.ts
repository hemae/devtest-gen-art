import {Entity} from '@apiModels/common'


export type Promo = {
    headers: string[]
    paragraphs: string[]
    images: Entity<{src: string | null, src2: string | null}>[]
}
