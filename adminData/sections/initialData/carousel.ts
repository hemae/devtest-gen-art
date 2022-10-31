import generateId from 'hans-id'


export const carouselInitialData = {
    title: null,
    headerLinkTitle: null,
    data: {
        backgroundImage: null,
        shadowDirection: null,
        shadowDirectionMobile: null,
        tabs: []
    }
}

export const carouselTabInitialData = {
    id: generateId(),
    order: 0,
    textAlign: 'left',
    backgroundImage: null,
    image: null,
    headers: [],
    paragraphs: []
}
