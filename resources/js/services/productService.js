import axios from 'axios';
export const createProduct = async (product) => {
    try {
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        const token = localStorage.getItem('token');

        const response = await axios.post('/api/product/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Lỗi thêm sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi tạo sản phẩm: ', error);
    }
};

export const updateProduct = async (product) => {
    try {
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        const token = localStorage.getItem('token');

        const response = await axios.post(`/api/product/update/${product.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi cập nhật sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi cập nhật sản phẩm: ', error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/api/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Lỗi xóa sản phẩm: ', error);
    }
};

export const getProduct = async (id, variants = true) => {
    try {
        const response = await axios.get('/api/product', { params: { id: id, variants: variants } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi lấy sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi lấy sản phẩm: ', error);
    }
};

export const getProducts = async (type = 'new', page = 1, categoryId = null, variants = true, perPage = 10, start, end, searchTerm) => {
    try {
        const params = {
            type: type,
            page: page,
            variants: variants,
            per_page: perPage,
            start: start,
            end: end,
            name: searchTerm,
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

export const getHomeProducts = async () => {
    try {
        const response = await axios.get('/api/products/home');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi lấy ds sản phẩm: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi lấy ds sản phẩm: ', error);
    }
}
