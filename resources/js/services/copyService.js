import axios from 'axios';

export const getCopies = async () => {
    try {
        const response = await axios.get('/api/copies');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi khi lấy danh sách bản: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Không thể lấy được danh sách bản');
    }
};

export const getCopy = async (id) => {
    try {
        const response = await axios.get('/api/copy', { params: id });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi khi lấy bản: ${response.statusText}`);
        }
    } catch (error) {
        console.log('Không thể lấy được bản');
    }
};
