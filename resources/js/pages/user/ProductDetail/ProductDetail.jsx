import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getProducts } from '~/services/productService';
import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import LoadingPage from '~/pages/other/Loading';
import ImageSlider from './ImageSlider';
import images from '~/assets/images';
import InfoDetail from './InfoDetail';
import ProductList from '~/components/ProductList';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProduct(productId);
                setProduct(response.product);
                
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

        fetchProduct();
        fetchSimilarProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    // console.log(product);

    return (
        <>
            {loading && <LoadingPage height="100vh" />}
            {!loading && (
                <div className={cx('product-detail', 'grid wide')}>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <ImageSlider images={product.images ?? [images.noImage]} />
                        </div>
                        <div className={cx('content-right')}>
                            <InfoDetail product={product}/>
                        </div>
                    </div>

                    <div className={cx('similar')}>
                        <ProductList title="Sản phẩm tương tự" data={similar.slice(0,4)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;
