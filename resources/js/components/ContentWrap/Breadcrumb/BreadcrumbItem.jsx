import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const BreadcrumbItem = ({ title, link, active }) => {
    return (
        <Link className={cx('breadcrumb-item', { active })} to={link}>
            {title}
        </Link>
    );
};

BreadcrumbItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
};

export default BreadcrumbItem;
