import classNames from 'classnames/bind';

import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

import Navbar from '~/components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const UserLayout = ({ children }) => {
    return (
        <div className={cx('user-layout')}>
            <Navbar />
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default UserLayout;
