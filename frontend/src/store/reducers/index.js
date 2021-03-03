
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
            localStorage.setItem('user', JSON.stringify({
                ...action.user,
                date: new Date().getTime() / 1000
            }));
            // window.location.href = "/success";
            return {...state, user: {
                ...action.user,
                date: new Date().getTime() / 1000
            }}
        case 'products':
            return {...state, products: action.products}
        case 'productCategories':
            return {...state, productsPerCategory: action.products}
        case 'logout':
            localStorage.setItem('user', JSON.stringify({}))
            window.location.href = "/success";
            return {...state, user: {}}
        case 'updateUser':
            let user = {
                ...state.user,
                ...action.user
            }
            localStorage.setItem('user', JSON.stringify(user))
            return {...state, user}
        case 'popularProducts':
            return {...state, popularProducts: action.popularProducts}
        case 'tokenExpired':
            return {...state, user: {}}
        case 'categories':
            return {...state, categories: action.categories}
        default: 
            return state
    }
}

export default reducer