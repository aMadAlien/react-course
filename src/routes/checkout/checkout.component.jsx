// import './checkout.styles.scss';

import { useContext } from "react";
import { CartContext } from '../../context/cart.context';

const Checkout = () => {
    // use parameters from Cart Context
    const { cartItems, addItemToCart, removeItemToCart } = useContext(CartContext);

    return (
        <div>
            <h1>checkout page</h1>
            <div>
                {
                cartItems.map((cartItem) => {
                    const { id, name, quantity } = cartItem;
                    
                    return (
                        <div key={id}>
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <br />
                            {/* delete or decrease amount of products */}
                            <span onClick={() => removeItemToCart(cartItem)}>decrement</span>
                            <br />
                            {/* increase amount of products */}
                            <span onClick={() => addItemToCart(cartItem)}>increment</span>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Checkout;