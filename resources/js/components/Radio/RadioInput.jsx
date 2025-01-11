import classNames from 'classnames/bind';

import styles from './Radio.module.scss';

const cx = classNames.bind(styles);

const RadioInput = ({ name, title, id, checked, onChange }) => {
    return (
        <div className={cx('radio-input', { checked: checked })}>
            <label htmlFor={id}>
                <span className={cx('title')}>{title}</span>
                <input type="radio" name={name} id={id} checked={checked} onChange={onChange} />
                <span className={cx('circle')}></span>
            </label>
        </div>
    );
};

export default RadioInput;
