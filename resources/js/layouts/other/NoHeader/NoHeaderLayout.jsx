import classNames from 'classnames/bind';

import styles from './NoHeaderLayout.module.scss';

const cx = classNames.bind(styles);

import Footer from '~/layouts/common/Footer/Footer';
import NoHeader from './components/NoHeader';

const NoHeaderLayout = ({ children }) => {
    return <div className={cx('no-header-layout')}>
        <NoHeader/>
        {children}
        <Footer />
    </div>;
};

export default NoHeaderLayout;
