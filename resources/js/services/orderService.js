import axios from 'axios';
import user from '~/pages/user';

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


export const getOrders = async (page = 1, perPage = 10) => {
    try {
        const params = {
            page: page,
            per_page: perPage,
        };

        const token = localStorage.getItem('token');
        const response = await axios.get('/api/orders', {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Lỗi lấy danh sách đơn hàng', error);
    }
}

export const getUserOders = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/userOrders`, {
            params: { user_id: userId },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Lỗi lấy danh sách đơn hàng', error);
    }
}



export const getOrder = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Lỗi lấy thông tin đơn hàng', error);
    }
}

export const confirmOrder = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`/api/order/confirm/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log('Lỗi xác nhận đơn hàng', error);
    }
}