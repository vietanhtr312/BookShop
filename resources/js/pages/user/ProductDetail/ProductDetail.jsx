import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getProducts, getSimilarProducts } from '~/services/productService';
import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { getVariant } from '~/services/variantService';
import LoadingPage from '~/pages/other/Loading';
import ImageSlider from './ImageSlider';
import images from '~/assets/images';
import InfoDetail from './InfoDetail';
import ProductList from '~/components/Product/ProductList';
import { getCopies } from '~/services/copyService';
import Content from '~/components/ContentWrap/Content';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

const getBreadcrumb = (title, categoryId, categoryName) => {
    return [
        {
            title: 'Trang chủ',
            link: '/',
        },
        {
            title: categoryName,
            link: `/products/${categoryId}`,
        },
        {
            title: title,
        },
    ];
};

const ProductDetail = () => {
    const { productId, variantId } = useParams();
    const [product, setProduct] = useState({});
    const [variant, setVariant] = useState({});
    const [copies, setCopies] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [breadcrumb, setBreadcrumb] = useState([]);

    const fetchSimilarProduct = async () => {
        // console.log('product: ', product);
        try {
            const response = await getSimilarProducts(productId);
            setSimilar(response.products.data);
        } catch (error) {
            console.log('Lỗi fetch dữ liệu sản phẩm: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProduct(productId);
                setProduct(response.product);
                setBreadcrumb(
                    getBreadcrumb(response.product.name, response.product.category_id, response.product.category_name),
                );
            } catch (error) {
                console.log('Lỗi fetch dữ liệu sản phẩm: ', error);
            } finally {
            }
        };

        const fetchCopies = async () => {
            const res = await getCopies();
            setCopies(res.copies);
        };

        fetchProduct();
        fetchCopies();
        fetchSimilarProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    useEffect(() => {
        const fetchVariant = async () => {
            try {
                setLoading(true);
                const response = await getVariant(variantId);
                setVariant(response.variant);
            } catch (error) {
                console.log('Lỗi fetch dữ liệu biến thể: ', error);
            } finally {
            }
        };

        fetchVariant();
    }, [variantId]);



    return (
        <Content breadcrumb={breadcrumb}>
            {loading && <LoadingPage height="100vh" />}
            {!loading && (
                <div className={cx('product-detail', 'grid wide')}>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <ImageSlider images={variant.images ? variant.images.reverse() : [images.noImage]} />
                        </div>
                        <div className={cx('content-right')}>
                            <InfoDetail product={product} variant={variant} copies={copies} />
                        </div>
                    </div>

                    <div className={cx('content-bottom')}>
                        <div className={cx('similar')}>
                            <h3 className={cx('title')}>Sản phẩm tương tự</h3>
                        </div>
                        <ProductList title="Sản phẩm tương tự" data={similar.slice(0, 4)} />
                    </div>
                </div>
            )}
            <ToastContainer />
        </Content>
    );
};

export default ProductDetail;
