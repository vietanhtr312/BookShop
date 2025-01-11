import classNames from 'classnames/bind';

import styles from './InfomationBox.module.scss';
import { useState } from 'react';
import { OutInTransition } from '~/animations/Transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const InformationBox = ({ intro, detail, preserve }) => {
    const [current, setCurrent] = useState('intro');
    const [show, setShow] = useState(false);

    return (
        <div className={cx('information-box')}>
            <div className={cx('informations', { hidden: !show })}>
                <div className={cx('info-header')}>
                    <button
                        className={cx('info-option', { active: current === 'intro' })}
                        type="button"
                        onClick={() => setCurrent('intro')}
                    >
                        Giới thiệu
                    </button>
                    <button
                        className={cx('info-option', { active: current === 'detail' })}
                        type="button"
                        onClick={() => setCurrent('detail')}
                    >
                        Chi tiết
                    </button>
                </div>

                <div className={cx('info-content')}>
                    <OutInTransition state={current}>
                        <div className={cx('info-textarea')}>
                            {current === 'intro' ? (
                                <div className={cx('html-content')} dangerouslySetInnerHTML={{ __html: intro }} />
                            ) : current === 'detail' ? (
                                <div dangerouslySetInnerHTML={{ __html: detail }} />
                            ) : null}
                        </div>
                    </OutInTransition>
                </div>
            </div>
            <div className={cx('bottom')}>
                <button className={cx('show-btn')} type="button" onClick={() => setShow((prev) => !prev)}>
                    {show ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </button>
            </div>
        </div>
    );
};

export default InformationBox;
