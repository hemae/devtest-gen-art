import {Entity} from '@apiModels/common'


export type CarouselColor = 'dark' | 'light'
export type CarouselAlign = 'left' | 'center' | 'right'
export type CarouselVerticalAlign = 'top' | 'center' | 'bottom'

export type CarouselTab = Entity<{
    textAlign: CarouselAlign
    textVerticalAlign: CarouselVerticalAlign
    textColor: CarouselColor
    backgroundImage: string | null
    image: string | null
    headers: string[]
    paragraphs: string[]
    shadowDirection: number | null
    shadowDirectionMobile: number | null
    shadowColor: CarouselColor
}>

export type Carousel = {
    backgroundImage: string | null
    shadowDirection: number | null
    shadowDirectionMobile: number | null
    shadowColor: CarouselColor
    tabs: CarouselTab[]
}
