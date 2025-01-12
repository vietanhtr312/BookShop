import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { Button } from '../Button';

const cx = classNames.bind(styles);

const defaultFunction = () => {};

const Menu = ({
    children,
    items = [],
    hideOnClick = false,
    onClick = defaultFunction,
    click,
    header: h,
    placement = 'bottom-end',
    offset = [10, 5],
    delay = [0, 700],
}) => {
    const [visible, setVisible] = useState(false);
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleBackToFirst = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const close = () => {
        setHistory((prev) => prev.slice(0, 1));
        setVisible(false);
    };

    const onClickItem = (item) => {
        onClick(item);
        close();
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onClickItem(item);
                        }
                    }}
                />
            );
        });
    };

    const renderResults = (attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
            {h && !current.title && (
                <header className={cx('first-header')}>
                    <Button primary width="100%" type="button" noRadius>
                        {h}
                    </Button>
                </header>
            )}
            {current.title && <Header title={current.title} icon={current.icon} onClick={handleBack} />}
            <div className={cx('menu-body')}>{renderItems()}</div>
        </div>
    );

    return (
        <Tippy
            interactive
            placement={placement}
            delay={delay}
            offset={offset}
            {...(click ? { visible: visible, onClickOutside: close } : { hideOnClick: hideOnClick })}
            render={renderResults}
            onHide={handleBackToFirst}
        >
            <div className={cx('children')} onClick={() => setVisible(!visible)}>
                {children}
            </div>
        </Tippy>
    );
};

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onClick: PropTypes.func,
    click: PropTypes.bool,
    header: PropTypes.node,
    placement: PropTypes.string,
    delay: PropTypes.array,
    offset: PropTypes.array,
};

export default Menu;
