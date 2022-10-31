import generateId from 'hans-id'


export const promoButtonsInitialData = {
    title: null,
    headerLinkTitle: null,
    backgroundImage: null,
    data: {
        items: []
    }
}

export const promoButtonsItemInitialData = {
    id: generateId(),
    order: 0,
    title: null,
    description: null,
    align: 'top'
}
