import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Breadcrumb.module.scss';
import BreadcrumbItem from './BreadcrumbItem';

const cx = classNames.bind(styles);

const Breadcrumb = ({ items }) => {
    return (
        <div className={cx('breadcrumb')}>
            {items.length > 0 &&
                items.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbItem title={item.title} link={item.link} active={index === items.length - 1} />
                        {index < items.length - 1 && <FontAwesomeIcon icon={faChevronRight} />}
                    </Fragment>
                ))}
        </div>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Breadcrumb;
