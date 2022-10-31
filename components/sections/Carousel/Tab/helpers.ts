import {CarouselAlign} from '@apiModels/sections/carousel'


type ClassType = 'flexStart' | 'flexEnd' | 'center'


export function getFlexType(textAlign: CarouselAlign): ClassType {

    let flexType = 'flexStart'

    switch (true) {
        case textAlign === 'right':
            flexType = 'flexEnd'
            break
        case textAlign === 'center':
            flexType = 'center'
            break
        default:
            break
    }

    return flexType as ClassType
}
