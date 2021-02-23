const initialState = {
    user: {},
    products: [],
    popularProducts: [],
    categories: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'login':
            return {...state, user: action.user}
        case 'products':
            return {...state, products: action.products}
        case 'logout':
            return {...state, user: {}}
        case 'popularProducts':
            return {...state, popularProducts: action.popularProducts}
        case 'categories':
            return {...state, categories: action.categories}
        default: 
            return state
    }
}

export default reducer