import { useCallback, useState } from 'react';

const useProduct = (initialProduct = {}) => {
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        original_price: '',
        price: '',
        avatar: '',
        intro: '',
        detail: '',
        sale: '',
        image_file: '',
        category_name: '',
        sale_type: 'not',
        ...initialProduct,
    });

    const setProductField = (field, value) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const resetProduct = () => {
        setProduct({
            name: '',
            category_id: '',
            original_price: '',
            price: '',
            avatar: '',
            intro: '',
            detail: '',
            sale: '',
            sale_type: 'not',
            image_file: '',
            category_name: '',
        });
    };

    return {
        product,
        setProduct,
        setProductField,
        resetProduct,
    };
};

export default useProduct;
