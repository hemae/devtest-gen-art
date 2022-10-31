import generateId from 'hans-id'


export const orderManualInitialData = {
    title: null,
    headerLinkTitle: null,
    bottomTitle: null,
    data: {
        items: []
    }
}

export const orderManualItemInitialData = {
    id: generateId(),
    order: 0,
    title: null,
    src: null
}
