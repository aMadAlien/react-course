import Button from '../button/button.component.jsx';
import './cart-dropdown.styles.scss';

const CartDropdawn = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                <Button>GO TO CHECKOUT</Button>
            </div>
        </div>
    );
};

export default CartDropdawn;