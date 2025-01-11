import { useState } from 'react';

const useVariants = (initialVariants = []) => {
    const [variants, setVariants] = useState(
        initialVariants.length > 0
            ? initialVariants
            : [
                  {
                      quantity: '',
                      images: '',
                      copy_id: '',
                      image_files: [],
                      copy_name: '',
                      sold_quantity: 0,
                  },
              ],
    );
    const [deleteVariantList, setDeleteVariantList] = useState([]);

    const deleteVariant = (index) => {
        setVariants((prev) => {
            if (prev.length > 1) {
                const updatedVars = prev.filter((_, i) => i !== index);
                console.log(updatedVars);
                return updatedVars;
            } else {
                return prev;
            }
        });
    };

    const addVariant = () => {
        setVariants((prev) => [
            ...prev,
            {
                quantity: '',
                images: '',
                copy_id: '',
                image_files: [],
                copy_name: '',
                sold_quantity: 0,
            },
        ]);
    };

    const updateVariant = (variant, index) => {
        setVariants((prev) => prev.map((v, i) => (i === index ? variant : v)));
    };

    const updateVariantField = (field, value, index) => {
        setVariants((prev) => prev.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)));
    };

    const deleteVariantField = (field, index) => {
        setVariants((prevVariants) => {
            const newVariants = [...prevVariants];
            const variant = { ...newVariants[index] };
            delete variant[field];
            newVariants[index] = variant;
            return newVariants;
        });
    };

    const resetVariants = () => {
        setVariants([
            {
                quantity: '',
                images: '',
                copy_id: '',
                image_files: [],
                copy_name: '',
                sold_quantity: 0,
            },
        ]);
    };

    return {
        variants,
        deleteVariantList,
        setVariants,
        setDeleteVariantList,
        resetVariants,
        deleteVariant,
        addVariant,
        updateVariant,
        updateVariantField,
        deleteVariantField,
    };
};

export default useVariants;
