import classNames from 'classnames/bind';

import styles from './Part.module.scss';

const cx = classNames.bind(styles);
const ListHeader = ({ type, setType }) => {
    return (
        <div className={cx('header')}>
            <div className={cx('header-btns')}>
                <div className={cx('header-btn', { active: type === 'old' })} onClick={() => setType('old')}>
                    Cũ nhất
                </div>
                <div className={cx('header-btn', { active: type === 'new' })} onClick={() => setType('new')}>
                    Mới nhất
                </div>
                <div className={cx('header-btn', { active: type === 'hot' })} onClick={() => setType('hot')}>
                    Bán chạy nhất
                </div>
            </div>
        </div>
    );
};

export default ListHeader;
