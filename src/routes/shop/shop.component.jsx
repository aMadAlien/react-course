import './shop.styles.scss';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocs } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action';
import { setCategories } from '../../store/categories/category.action';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // create getCategoriesMap to use as async/await fucn
        const getCategoriesMap = async () => {
            // receive the docs
            const categoriesArray = await getCategoriesAndDocs('categories');
            // change state using received docs
            dispatch(setCategories(categoryMap));
        }

        getCategoriesMap();
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;