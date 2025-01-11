import { useCallback, useEffect, useMemo, memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Price.module.scss';
import { Input } from '~/components/Input';
import { RadioInput } from '~/components/Radio';

const cx = classNames.bind(styles);

const Price = ({ sale, original_price, price, saleType, setOriginalPrice, setPrice, setSale, setSaleType, error }) => {
    const handleOriginalPriceChange = useCallback(
        (e) => {
            const value = e.target.value;
            if ((!isNaN(value) && value > 0) || value === '') {
                setOriginalPrice(value);
            }
        },
        [setOriginalPrice],
    );

    const handleRadioInputChange = useCallback(
        (value) => {
            setSale('');
            setSaleType(value);
        },
        [setSale],
    );

    const handlePercentChange = useCallback(
        (e) => {
            const value = e.target.value;
            if ((!isNaN(value) && value > 0 && value < 100) || value === '') {
                setSale(value);
            }
        },
        [setSale],
    );

    const handleValueChange = useCallback(
        (e) => {
            const value = e.target.value;
            if ((!isNaN(value) && value > 0 && value < Number(original_price)) || value === '') {
                setSale(value);
            }
        },
        [setSale, original_price],
    );

    const finalPrice = useMemo(() => {
        if (saleType === 'percent' && sale) {
            return original_price - (original_price * sale) / 100;
        } else if (saleType === 'value' && sale) {
            return original_price - sale;
        } else {
            return original_price;
        }
    }, [original_price, sale, saleType]);

    useEffect(() => {
        setPrice(finalPrice);
    }, [finalPrice]);

    return (
        <div className={cx('price')}>
            <Input
                name="original_price"
                label="Giá sản phẩm (đ)"
                required
                type="number"
                value={original_price}
                onChange={handleOriginalPriceChange}
                error={error}
            />

            {original_price !== '' && (
                <div className={cx('price-discount')}>
                    <div className={cx('price-header')}>
                        <span className={cx('price-title')}>Phương thức giảm giá</span>
                        <div className={cx('price-options')}>
                            <RadioInput
                                name="sale-radio"
                                id="not-sale"
                                title="Không giảm giá"
                                checked={saleType === 'not'}
                                onChange={() => handleRadioInputChange('not')}
                            />
                            <RadioInput
                                name="sale-radio"
                                id="percent-sale"
                                title="Giảm theo phần trăm"
                                checked={saleType === 'percent'}
                                onChange={() => handleRadioInputChange('percent')}
                            />
                            <RadioInput
                                name="sale-radio"
                                id="value-sale"
                                title="Giảm theo giá trị"
                                checked={saleType === 'value'}
                                onChange={() => handleRadioInputChange('value')}
                            />
                        </div>
                    </div>

                    {saleType !== 'not' && (
                        <div className={cx('price-body')}>
                            {saleType == 'percent' && (
                                <Input
                                    name="sale-percent"
                                    label="Phần trăm giảm (%)"
                                    type="number"
                                    value={sale}
                                    onChange={handlePercentChange}
                                    note="Chọn phần trăm giảm giá từ 1 - 99"
                                />
                            )}
                            {saleType == 'value' && (
                                <Input
                                    name="sale-value"
                                    label="Giá trị giảm (đ)"
                                    type="number"
                                    value={sale}
                                    onChange={handleValueChange}
                                    note="Chọn giá trị được giảm ( < giá gốc )"
                                />
                            )}
                        </div>
                    )}

                    <div className={cx('price-last')}>
                        <Input name="price" label="Giá cuối cùng (đ)" type="number" value={price} disabled />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Price);
