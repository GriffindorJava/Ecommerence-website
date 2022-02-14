import * as CT from "./cartTypes";

//id,quantity,price,image path

const initialState = {
    products: [],       
    totalQuantity: 0,
    totalPrice: 0,
};

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case CT.ADD_TO_CART:
            let added_product = action.payload
            console.log('sss', action.payload);
            let existed_product = state.products.find(product => added_product.id === product.id)
            if (existed_product) {
                return {
                    ...state,
                };
            } else {
                let newTotalQ = state.totalQuantity + added_product.quantity
                let newTotalP = state.totalPrice + added_product.quantity * added_product.price

                return {
                    ...state,
                    products: [...state.products, action.payload],
                    totalQuantity: newTotalQ,
                    totalPrice: newTotalP
                };
            }
        case CT.REMOVE_FROM_CART:
            let product_to_remove = state.products.find(product => action.id === product.id)
            let new_products = state.products.filter(product => action.id !== product.id)

            let newTotalQ = state.totalQuantity - product_to_remove.quantity
            let newTotalP = state.totalPrice - product_to_remove.quantity * product_to_remove.price

            return {
                ...state,
                products: new_products,
                totalQuantity: newTotalQ,
                totalPrice: newTotalP
            };
        case CT.EMPTY_CART:
            return {
                ...state,
                products: [],       
                totalQuantity: 0,
                totalPrice: 0,
            }
        default:
            return state;
    }
};

export default reducer;