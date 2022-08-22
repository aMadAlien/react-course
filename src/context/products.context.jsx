import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocs } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    // create new collection in DB, must be used only one time to create
    // useEffect(() => {
    //     addCollectionAndDocs('categories', SHOP_DATA);
    // }, []);

    const value = {products};

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};