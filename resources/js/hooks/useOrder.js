import { useCallback, useState } from 'react';7

const useProduct = (initialOrder = {}) => {
    const [order, setOrder] = useState({
    
        ...initialOrder,
    });

    const setOrderField = (field, value) => {

    };


    return {
        order,
        setOrder,
        setOrderField,
    };
};

export default useOrder;
