import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faDashboard } from '@fortawesome/free-solid-svg-icons';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const ITEM = {
    id: 1,
    title: 'Trang chủ',
    to: '/',
};

const SidebarItem = ({ icon, title, to, children, onclick, active }) => {
    const [showDropdown, setShowDropdown] = useState(active);

    useEffect(() => {
        if (!active) {
            setShowDropdown(false);
        }
    }, [active]);

    const classes = cx('item', {
        active,
    });

    const classesDropdown = cx('item', { 'dd-active': showDropdown });

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
        onclick();
    };

    return (
        <div className={cx('item-wrapper')}>
            {to ? (
                <Link className={classes} to={to} onClick={onclick}>
                    <div className={cx('item-icon')}>
                        {icon}
                        <div className={cx('tooltip')}>{title}</div>
                    </div>
                    <div className={cx('item-title')}>{title}</div>
                </Link>
            ) : (
                children && (
                    <div className={cx('item-btn')}>
                        <div className={classesDropdown} onClick={handleDropdown}>
                            <div className={cx('item-icon')}>
                                {icon}
                                <div className={cx('tooltip')}>{title}</div>
                            </div>
                            <div className={cx('item-title')}>{title}</div>
                            <div className={cx('dropdown-icon')}>
                                {showDropdown ? (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </div>
                        </div>
                        {children && showDropdown && (
                            <div className={cx('dropdown-body', { active: showDropdown })}>{children}</div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node,
    onclick: PropTypes.func,
    active: PropTypes.bool,
};

export default SidebarItem;
