import axios from 'axios';

export const getCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi khi lấy danh mục sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh mục sản phẩm: ', error);
    }
};

export const getCategory = async (id) => {
    try {
        const response = await axios.get(`/api/category?id=${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi khi lấy danh mục sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh mục sản phẩm: ', error);
    }
};
