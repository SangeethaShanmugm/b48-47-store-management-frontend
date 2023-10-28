
const initialState = {
    loading: false,
    cartItems: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "addToCart":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case "showLoading":
            return {
                ...state,
                loading: true
            };
        case "hideLoading":
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
}