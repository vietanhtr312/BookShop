import { Link } from 'react-router-dom';
import styles from './NoHeader.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NoHeader({ name }) {
    return (
        <div className={cx('wrapper')}>
            <div className='grid wide'>
                <div className={cx('logo')}>
                    <Link to="/" className={cx("logo-link")}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="logo" />
                    </Link>
                    <div className={cx("name")}>{
                        name
                    }</div>
                </div>
            </div>
        </div>
    );
}

export default NoHeader;