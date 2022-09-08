import { createContext, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // find the cart item to add
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // increase amount of items
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1 and remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem =>  cartItem.id !== cartItemToRemove.id)
    }

    // return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
};

// delete a kind of items
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

// CART CONTEXT parameters
export const CartContext = createContext({
    isCartOpen: true,
    setCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

// INITIAL STATE FOR REDUCER
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

// REDUCER FUNCTION
const cartReduser = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandles type of ${type} in cartReducer.`)
    }
}

// CART PROVIDER
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReduser, INITIAL_STATE);

    // change items state
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
        );
    };
    
    // increase amount of items - change state
    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    // decrease amount of items - change state
    const removeItemFromCart = (cartItem) => {
        const newCartItems = removeCartItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    };

    // delete a kind of items - change state
    const clearItemFromCart = (cartItem) => {
        const newCartItems = clearCartItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    };

    // set open/close status for cart
    // const setIsCartOpen = (bool) => {
    //     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    // }
    
    const value = {
        isCartOpen, 
        setIsCartOpen: () => {}, 
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};