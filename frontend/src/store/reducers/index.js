let userStorage;
try {
    userStorage = JSON.parse(localStorage.getItem('user') || JSON.stringify({}))
} catch(e) {
    userStorage = {}
    localStorage.setItem('user', JSON.stringify({}))
}

const initialState = {
    user: userStorage,
    products: [],
    popularProducts: [],
    categories: [],
    itemsInCart: [],
    productsPerCategory: []
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case 'login':
            localStorage.setItem('user', JSON.stringify(action.user));
            return {...state, user: action.user}
        case 'products':
            return {...state, products: action.products}
        case 'productCategories':
            return {...state, productsPerCategory: action.products}
        case 'logout':
            localStorage.setItem('user', JSON.stringify({}))
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