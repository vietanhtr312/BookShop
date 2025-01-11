import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './LoadingPage.module.scss';

const cx = classNames.bind(styles);

const LoadingPage = ({ className, height = '75vh' }) => {
    return (
        <div className={cx('loading', { [className]: className })} style={{ height: height }}>
            <div className={cx('loading-icon')}>
                <FontAwesomeIcon icon={faSpinner} />
            </div>
            <h4>Vui lòng chờ</h4>
        </div>
    );
};

LoadingPage.propTypes = {
    className: PropTypes.string,
};

export default LoadingPage;
