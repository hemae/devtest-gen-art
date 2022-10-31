import generateId from 'hans-id'


export const promoInitialData = {
    title: null,
    headerLinkTitle: null,
    data: {
        headers: [],
        paragraphs: [],
        images: []
    }
}

export const promoImageInitialData = {
    id: generateId(),
    order: 0,
    src: null
}
