import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import SHOP_DATA from '../../shop-data.json';


const Shop = () => {
    const { products } = useContext(ProductsContext);
    return (
        <div>
            {SHOP_DATA.map( ({id, name}) => (
                <div key={id}>
                    <h2>{name}</h2>
                </div>
            ))}
        </div>
    );
};

export default Shop;