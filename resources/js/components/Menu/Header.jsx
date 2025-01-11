import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Header = ({ title = '', icon = <FontAwesomeIcon icon={faArrowLeft} />, onClick }) => {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onClick} type="button">
                {icon}
            </button>
            <div className={cx('title')}>{title}</div>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Header;
