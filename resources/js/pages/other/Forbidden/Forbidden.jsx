import classNames from 'classnames/bind';

import styles from './Forbidden.module.scss';

const cx = classNames.bind(styles);

const Forbidden = () => {
    return <div className={cx('forbidden-page')}>Forbidden</div>;
};

export default Forbidden;
