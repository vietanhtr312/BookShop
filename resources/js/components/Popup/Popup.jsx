import classNames from 'classnames/bind';

import styles from './Popup.module.scss';
import { IconButton } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const fn = () => {};

const Popup = ({ isOpen, onClose, children, title, onClickOverlay = fn }) => {
    const popupRef = useRef(null);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const popupHeight = popupRef.current.offsetHeight;
            const viewHeight = window.innerHeight;

            document.body.style.overflowY = 'hidden';
            if (popupHeight > viewHeight) {
                document.body.style.marginRight = '8px';
                setScroll(true);
            }
        } else {
            setScroll(false);
            document.body.style.overflowY = 'overlay';
            document.body.style.marginRight = 'unset';
        }

        return () => {
            setScroll(false);
            document.body.style.overflowY = 'overlay';
            document.body.style.marginRight = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={cx('popup')} style={{ overflowY: scroll ? 'scroll' : 'unset' }}>
            {title && (
                <div className={cx('header')}>
                    <div className={cx('title')}>{title}</div>
                    <IconButton
                        className={cx('close-btn')}
                        icon={<FontAwesomeIcon icon={faXmark} />}
                        circle
                        onClick={onClose}
                    />
                </div>
            )}
            <div className={cx('content', { header: title })} ref={popupRef}>
                {children}
            </div>
        </div>
    );
};

export default Popup;
