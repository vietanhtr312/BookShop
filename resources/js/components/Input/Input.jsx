import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';
import { forwardRef, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        return '';
    } else if (!emailRegex.test(value)) {
        return 'Invalid email format';
    }
    return '';
};

const fn = () => {};

const Input = forwardRef(
    (
        {
            type = 'text',
            name,
            value,
            onChange,
            label,
            required,
            spellCheck = false,
            readOnly = false,
            disabled = false,
            note,
            error = '',
            clearError = fn,
            validate,
            // time = 3000,
        },
        ref,
    ) => {
        const [errorValue, setError] = useState(error);

        useEffect(() => {
            setError(error);
        }, [error]);

        const handleChange = (e) => {
            const inputValue = e.target.value;
            if (!inputValue.startsWith(' ')) {
                if (validate) {
                    const errorMessage = validate(e.target.value);
                    if (errorMessage) {
                        setError(errorMessage);
                    } else {
                        setError('');
                    }
                }
                onChange(e);
            }
        };

        const handleFocus = () => {
            clearError();
        };

        return (
            <div className={cx('input')}>
                <div className={cx('content', { error: errorValue })}>
                    <input
                        ref={ref}
                        type={type}
                        name={name}
                        id={name}
                        required={required}
                        placeholder=" "
                        spellCheck={spellCheck}
                        readOnly={readOnly}
                        disabled={disabled}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    {label && (
                        <label htmlFor={name}>
                            {label}
                            {required && <span className={cx('required-note')}>*</span>}
                        </label>
                    )}
                </div>
                <div className={cx('message')}>
                    {note && !value && !error && <div className={cx('note-message')}>{note}</div>}
                    {errorValue && <div className={cx('error-message')}>{errorValue}</div>}
                </div>
            </div>
        );
    },
);

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
    spellCheck: PropTypes.bool,
    note: PropTypes.string,
    error: PropTypes.string,
    clearError: PropTypes.func,
    validate: PropTypes.func,
};

export default Input;
