import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
// import useProduct from '~/hooks/useProduct';
// import useVariants from '~/hooks/useVariants';
// import { deleteProduct, getProduct, updateProduct } from '~/services/productService';
// import { deleteVariants, getVariants, updateVariant } from '~/services/variantService';

// import StepOne from '../Create/Steps/StepOne';
// import StepTwo from '../Create/Steps/StepTwo';
import Content from '~/components/Content';
import LoadingPage from '~/pages/other/Loading';
import { Button } from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const BREADCRUMB = [
    {
        title: 'Trang chủ',
        link: config.routes.admin.dashboard,
    },
    {
        title: 'Sản phẩm - Danh sách',
        link: config.routes.admin.productList,
    },
    {
        title: 'Chi tiết',
    },
];

const AdminProductDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const { product, setProduct, setProductField } = useProduct({});
    // const {
    //     variants,
    //     setVariants,
    //     deleteVariantField,
    //     updateVariantField,
    //     deleteVariant,
    //     deleteVariantList,
    //     setDeleteVariantList,
    // } = useVariants([]);
    const [next, setNext] = useState({
        product: '',
        variants: '',
    });
    const [notification, setNotification] = useState({
        delete: false,
        update: false,
        time: 2000,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productRes = await getProduct(id);
                setProduct(productRes.product);
                setVariants(productRes.product.variants);
            } catch (error) {
                console.log('Lỗi fetch dữ liệu sản phẩm: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const updateProductAndVariants = async () => {
        const productRes = await updateProduct(product);
        setProductField('avatar', productRes.product.avatar);
        setProductField('image_file', '');
        await Promise.all(
            variants.map(async (variant, index) => {
                const variantRes = await updateVariant(variant, product.id);
                updateVariantField('images', variantRes.variant.images, index);
                deleteVariantField('image_files', index);
            }),
        );
        await deleteVariants(deleteVariantList);

        handleShowNotification('update', reset);
    };

    useEffect(() => {
        if (next.product === false && next.variants === false) {
            updateProductAndVariants();
        }
    }, [next]);

    const reset = () => {
        setNext({
            product: '',
            variants: '',
        });
        setNotification({
            delete: false,
            update: false,
            time: 2000,
        });
    };

    const handleShowNotification = (type, fn) => {
        setNotification((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, [type]: false }));
            fn();
        }, notification.time);
    };

    const handleUpdateProduct = () => {
        setNext({ product: true, variants: true });
    };

    const handleDeleteProduct = async () => {
        const isConfirmed = window.confirm('Bạn có chắc muốn xóa sản phẩm');
        if (isConfirmed) {
            try {
                await deleteProduct(product.id);
            } catch (error) {
                console.log('Lỗi xóa sản phẩm: ', error);
            } finally {
                handleShowNotification('delete', () => navigate(-1));
            }
        }
    };

    const handleDeleteVariant = (id) => {
        setDeleteVariantList((prev) => [...prev, id]);
    };

    return (
        <Content breadcrumb={BREADCRUMB}>
            {/* {notification.update && <Notification content="Cập nhật thành công" time={notification.time} />} */}
            {/* {notification.delete && <Notification content="Xóa thành công" time={notification.time} />} */}

            {!loading ? (
                <div className={cx('product-detail')}>
                    <div className={cx('product-title')}>
                        <h3>
                            <span>Thông tin sản phẩm</span>
                            <span>{product.sku && ` - ${product.sku}`}</span>
                        </h3>
                        <h3>Đã bán: {product.sold_quantity} sản phẩm</h3>
                    </div>

                    <div className={cx('product')}>
                        {!loading && (
                            <StepOne
                                initialProduct={product}
                                onSubmit={setProduct}
                                next={next.product}
                                setNext={(value) => setNext((prev) => ({ ...prev, product: value }))}
                            />
                        )}
                    </div>

                    <h3 className={cx('variant-title')}>Các mẫu mã</h3>

                    <div className={cx('variants')}>
                        <StepTwo
                            initialVariants={variants}
                            onSubmit={setVariants}
                            next={next.variants}
                            setNext={(value) => setNext((prev) => ({ ...prev, variants: value }))}
                            onDeleteVariant={handleDeleteVariant}
                            sold
                        />
                    </div>

                    <div className={cx('action-btns')}>
                        <Button primary onClick={handleUpdateProduct}>
                            Cập nhật
                        </Button>
                        <Button danger onClick={handleDeleteProduct}>
                            Xóa sản phẩm
                        </Button>
                    </div>
                </div>
            ) : (
                <LoadingPage />
            )}
        </Content>
    );
};

export default AdminProductDetail;
