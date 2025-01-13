import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Steps.module.scss';
import useProduct from '~/hooks/useProduct';
import { Input } from '~/components/Input';
import { UploadImage } from '~/components/Image/UploadImage';
import { Categories, Informations, Price } from '~/components/AdminProduct';

const cx = classNames.bind(styles);

const fn = () => {};

const StepOne = ({ initialProduct, onSubmit = fn, next = false, setNext = fn }) => {
    const { product, setProductField, setProduct } = useProduct(initialProduct);
    const [errors, setErrors] = useState({
        productName: '',
        productCategory: '',
        productPrice: '',
    });

    // console.log(product);

    useEffect(() => {
        setProduct(initialProduct);
    }, [initialProduct]);

    useEffect(() => {
        if (next) {
            if (product.name === '') {
                setErrors((prev) => ({ ...prev, productName: 'Vui lòng nhập tên sản phẩm' }));
            } else if (product.category_id === '') {
                setErrors((prev) => ({ ...prev, productCategory: 'Vui lòng chọn' }));
            } else if (product.original_price === '') {
                setErrors((prev) => ({ ...prev, productPrice: 'Vui lòng nhập giá sản phẩm' }));
            } else {
                onSubmit(product);
            }
            setNext(false);
        }
    }, [next]);

    return (
        <div className={cx('step-one')}>
            <div className={cx('left')}>
                <div className={cx('name-and-category')}>
                    <Input
                        name="name"
                        label="Tên sản phẩm"
                        required
                        value={product.name}
                        onChange={(e) => setProductField('name', e.target.value)}
                        error={errors.productName}
                        clearError={() => setErrors((prev) => ({ ...prev, productName: '' }))}
                    />
                    <Categories
                        id={product.category_id}
                        setId={(value) => setProductField('category_id', value)}
                        name={product.category_name}
                        setName={(value) => setProductField('category_name', value)}
                        error={errors.productCategory}
                        clearError={() => setErrors((prev) => ({ ...prev, productCategory: '' }))}
                    />
                </div>

                <Price
                    original_price={product.original_price}
                    price={product.price}
                    sale={product.sale}
                    saleType={product.sale_type}
                    setOriginalPrice={(value) => setProductField('original_price', value)}
                    setPrice={(value) => setProductField('price', value)}
                    setSale={(value) => setProductField('sale', value)}
                    setSaleType={(value) => setProductField('sale_type', value)}
                    error={errors.productPrice}
                    clearError={() => setErrors((prev) => ({ ...prev, productPrice: '' }))}
                />

                <UploadImage
                    id="product-image"
                    image={product.avatar && !product.image_file ? product.avatar : product.image_file}
                    setImage={(value) => setProductField('image_file', value)}
                />
            </div>
            <div className={cx('right')}>
                <Informations
                    intro={product.intro}
                    detail={product.detail}
                    setIntro={(value) => setProductField('intro', value)}
                    setDetail={(value) => setProductField('detail', value)}
                />
            </div>
        </div>
    );
};

export default StepOne;
