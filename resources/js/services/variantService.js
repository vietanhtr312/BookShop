import axios from 'axios';

export const createVariant = async (variant, productId) => {
    try {
        const formData = new FormData();
        Object.entries(variant).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key !== 'image_files') {
                    formData.append(key, value);
                } else if (Array.isArray(value)) {
                    value.forEach((image) => formData.append('image_files[]', image));
                }
            }
        });
        formData.append('product_id', productId);

        const token = localStorage.getItem('token');

        const response = await axios.post('/api/variant/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error(`Lỗi thêm các biến thể: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi tạo các biến thể: ', error);
    }
};

export const updateVariant = async (variant, productId = variant.product_id) => {
    try {
        if (!variant.id) {
            const response = await createVariant(variant, productId);
            return response;
        }

        const formData = new FormData();
        Object.entries(variant).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'image_files' && Array.isArray(value)) {
                    value.forEach((image) => formData.append('image_files[]', image));
                } else if (key === 'images' && Array.isArray(value) && value) {
                    value.forEach((image) => formData.append('images[]', image));
                } else {
                    formData.append(key, value);
                }
            }
        });

        const token = localStorage.getItem('token');

        const response = await axios.post(`/api/variant/update/${variant.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi update biến thể: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi update biến thể: ', error);
    }
};

export const deleteVariant = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/api/variant/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log('Lỗi xóa biến thể: ', error);
    }
};

export const deleteVariants = async (ids) => {
    if (ids.length > 0) {
        for (const id of ids) {
            await deleteVariant(id);
        }
    }
};

export const getVariants = async (productId) => {
    try {
        const response = await axios.get('/api/variants', { params: { product_id: productId } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi tìm các biến thể: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi tìm các biến thể: ', error);
    }
};

export const getVariant = async (id) => {
    try {
        const response = await axios.get('/api/variant', { params: { id: id } });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi tìm các biến thể: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Lỗi tìm các biến thể: ', error);
    }
};
