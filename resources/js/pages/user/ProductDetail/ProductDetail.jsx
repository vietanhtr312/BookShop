import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getProducts } from '~/services/productService';
import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { getVariant } from '~/services/variantService';
import LoadingPage from '~/pages/other/Loading';
import ImageSlider from './ImageSlider';
import images from '~/assets/images';
import InfoDetail from './InfoDetail';
import ProductList from '~/components/ProductList';
import { getCopies } from '~/services/copyService';
import Content from '~/components/Content';

const cx = classNames.bind(styles);

const getBreadcrumb = (title, categoryId, categoryName) => {
    return [
        {
            title: 'Trang chủ',
            link: '/',
        },
        {
            title: categoryName,
            link: `products?category_id=${categoryId}`,
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
                setLoading(false);
            }
        };

        const fetchSimilarProduct = async () => {
            try {
                setLoading(true);
                const response = await getProducts('new', 1, product.category_id);
                setSimilar(response.products.data);
            } catch (error) {
                console.log('Lỗi fetch dữ liệu sản phẩm: ', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCopies = async () => {
            const res = await getCopies();
            setCopies(res.copies);
        };

        fetchProduct();
        fetchSimilarProduct();
        fetchCopies();
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
                setLoading(false);
            }
        };

        fetchVariant();
    }, [variantId]);

    console.log(variant);

    return (
        <Content breadcrumb={breadcrumb}>
            {loading && <LoadingPage height="100vh" />}
            {!loading && (
                <div className={cx('product-detail', 'grid wide')}>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <ImageSlider images={variant.images ?? [images.noImage]} />
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
        </Content>
    );
};

export default ProductDetail;
