import * as CT from "./cartTypes";
import axios from "axios";

export const addToCart = (product) => {
    console.log(product);
    return {
        type: CT.ADD_TO_CART,
        payload: product
    };
};
export const removeFromCart = (id) => {
    return {
        type: CT.REMOVE_FROM_CART,
        id,
    };
};
export const emptyCart = () => {
    return {
        type: CT.EMPTY_CART,
    };
};