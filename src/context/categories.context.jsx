import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocs } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        // create getCategoriesMap to use as async/await fucn
        const getCategoriesMap = async () => {
            // receive the docs
            const categoryMap = await getCategoriesAndDocs();
            console.log(categoryMap);
            // change state using received docs
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    // create new collection in DB, must be used only one time to create
    // useEffect(() => {
    //     addCollectionAndDocs('categories', SHOP_DATA);
    // }, []);

    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};