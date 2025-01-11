import axios from 'axios';

export const getProduct = async (id, variants = true) => {
    try {
        const response = await axios.get('/api/product', { params: { id: id } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi lấy sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi lấy sản phẩm: ', error);
    }
};

export const getProducts = async (type = 'new', page = 1, categoryId = null, perPage = 10) => {
    try {
        const params = {
            type: type,
            page: page,
            per_page: perPage,
        };

        if (categoryId) params.category_id = categoryId;

        const response = await axios.get('/api/products', { params });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi lấy ds sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi lấy ds sản phẩm: ', error);
    }
};
