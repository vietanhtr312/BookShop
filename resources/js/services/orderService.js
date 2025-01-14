import axios from 'axios';

export const createOrder = async (order) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/order/create', order, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.log('Lỗi tạo đơn hàng', error);
    }
};