import { createContext, useEffect, useState } from "react";

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
    isCartOpen: false,
    setCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

// CART PROVIDER
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCout] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // change amout of items
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCout(newCartCount);
    }, [cartItems]);

    // count amout of items
    useEffect(() => { 
        const newCarrTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCarrTotal);
    }, [cartItems]);
    
    // increase amount of items - change state
    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    };

    // decrease amount of items - change state
    const removeItemFromCart = (cartItem) => {
        setCartItems(removeCartItem(cartItems, cartItem));
    };

    // delete a kind of items - change state
    const clearItemFromCart = (cartItem) => {
        setCartItems(clearCartItem(cartItems, cartItem));
    };
    
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};