import { useState } from 'react';

const useVariant = (initialVariant = {}) => {
    const [variant, setVariant] = useState({
        quantity: '',
        images: '',
        copy_id: '',
        image_files: [],
        copy_name: '',
        ...initialVariant,
    });

    const setVariantField = (field, value) => {
        setVariant((prev) => ({ ...prev, [field]: value }));
    };

    const resetVariant = () => {
        setVariant({});
    };

    return { variant, setVariant, setVariantField, resetVariant };
};

export default useVariant;
