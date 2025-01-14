import { memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Steps.module.scss';
import useVariants from '~/hooks/useVariants';
import { UploadImages } from '~/components/Image/UploadImage';
import { Copies, Quantity } from '~/components/AdminProduct';
import { Input } from '~/components/Input';

const cx = classNames.bind(styles);

const fn = () => {};

const StepTwo = ({
    initialVariants,
    onSubmit = fn,
    next = false,
    setNext = fn,
    onDeleteVariant = fn,
    sold = false,
}) => {
    const { variants, setVariants, deleteVariant, addVariant, updateVariantField } = useVariants(initialVariants);

    useEffect(() => {
        setVariants(initialVariants);
    }, [initialVariants]);

    useEffect(() => {
        if (next) {
            for (let i = 0; i < variants.length; i++) {
                if (variants[i].copy_id === '') {
                    setVariants((prevVar) =>
                        prevVar.map((variant, index) =>
                            index === i ? { ...variant, error: 'Vui lòng chọn bản' } : variant,
                        ),
                    );
                    setNext(false);
                    return;
                }
            }

            setNext(false);
            onSubmit(variants);
        }
    }, [next]);

    const handleDeleteVariant = (index) => {
        if (variants.length > 1) {
            const confirmed = window.confirm('Bạn có chắc muốn xóa mẫu sản phẩm này không');

            if (confirmed) {
                onDeleteVariant(variants[index].id);
                deleteVariant(index);
            }
        } else {
            window.alert('Phải có ít nhất một biến thể');
        }
    };

    return (
        <div className={cx('step-two')}>
            {variants && variants.map((variant, index) => (
                <div className={cx('variant')} key={`variant${index}`}>
                    <div className={cx('color-and-images')}>
                        <div className={cx('color')}>
                            <Copies
                                id={variant.copy_id}
                                setId={(value) => updateVariantField('copy_id', value, index)}
                                name={variant.copy_name}
                                setName={(value) => updateVariantField('copy_name', value, index)}
                                error={variant.error}
                                clearError={() => updateVariantField('error', '', index)}
                            />
                        </div>
                        <div className={cx('images')}>
                            <UploadImages
                                id={`variant-${index}`}
                                images={
                                    variant.images && Array.isArray(variant.images) && !variant.image_files
                                        ? variant.images
                                        : variant.image_files
                                }
                                setImages={(value) => updateVariantField('image_files', value, index)}
                            />
                        </div>
                        {sold && (
                            <div className={cx('sold-quantity')}>
                                <Input
                                    name={`sold-quantity-${index}`}
                                    label="Số lượng đã bán"
                                    type="number"
                                    value={variant.sold_quantity}
                                    onChange={(value) => updateVariantField('sold_quantity', value, index)}
                                    disabled
                                />
                            </div>
                        )}
                    </div>
                    <Quantity
                        quantity={variant.quantity}
                        setQuantity={(e) => updateVariantField('quantity', e.target.value, index)}
                        index={index}
                    />
                    <div className={cx('delete-btn')} onClick={() => handleDeleteVariant(index)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            ))}
            <div className={cx('more-btn')} onClick={addVariant}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </div>
        </div>
    );
};

export default memo(StepTwo);
