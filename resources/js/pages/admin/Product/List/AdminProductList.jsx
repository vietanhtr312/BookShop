import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './List.module.scss';
import Content from '~/components/Content';
import Table from './Table/Table';
import Pagination from '~/components/Pagination';
import ListHeader from './Part/ListHeader';
import LoadingPage from '~/pages/other/Loading';
import { getProducts, deleteProduct } from '~/services/productService';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        link: '/',
    },
    {
        title: 'Sản phẩm - Danh sách sản phẩm',
        link: '/admin/products',
    },
];

const AdminProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type') || 'new';
    const page = parseInt(searchParams.get('page')) || 1;
    const [totalPage, setTotalPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (typeP, pageP) => {
        setLoading(true);
        try {
            const response = await getProducts(typeP, pageP);
            setProducts(response.products.data);
            setTotalPage(response.products.meta.last_page);
        } catch (error) {
            console.log('Không thể lấy được dữ liệu sản phẩm', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(type, page);
        window.scrollTo(0, 0);
    }, [type, page]);

    const handleDeleteProduct = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (confirmDelete) {
            await deleteProduct(id);
            toast.success('Xóa sản phẩm thành công');
            setTimeout(() => {
                fetchProducts(type, page);
            }, 2000);
        }
    };

    const handleTypeChange = (newType) => {
        setSearchParams({ type: newType, page: 1 });
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ type: type, page: newPage });
    };

    return (
        <Content breadcrumb={BREADCRUMB} className="grid wide">
            <div className={cx('admin-product-list')}>
                <ListHeader type={type} setType={handleTypeChange} />
                {loading ? <LoadingPage /> : <Table products={products} handleDeleteProduct={handleDeleteProduct} />}
                <Pagination current={page} total={totalPage} setPage={handlePageChange} />
            </div>
            <ToastContainer />
        </Content>
    );
};

export default AdminProductList;
