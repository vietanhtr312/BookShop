import classNames from 'classnames/bind';

import styles from './CustomInput.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const CustomInput = ({
    value,
    setValue,
    type = 'text',
    width = 'fit-content',
    id = 'id',
    label = '',
    small = false,
    medium = false,
    large = false,
    required = false,
    error = '',

}) => {
    const [errorValue, setError] = useState(error);

    useEffect(() => {
        setError(error);
    }, [error]);

    const handleChangeValue = (e) => {
        setError('');
        setValue(e.target.value);
    };

    return (
        <div style={{ width: width }}>
            <div className={cx('custom-input', { small, medium, large })} style={{ width: width }}>
                <input id={`custom-input-${id}`} type={type} value={value} onChange={handleChangeValue} placeholder=" " autoComplete='none' />
                <label htmlFor={`custom-input-${id}`}>
                    {label}
                    {required && <span className={cx('required-note')}>*</span>}
                </label>
            </div>
            <div className={cx('message')}>
                {errorValue && <div className={cx('error-message')}>{errorValue}</div>}
            </div>
        </div>
    );
};

export default CustomInput;
