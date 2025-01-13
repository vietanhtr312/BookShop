import classNames from 'classnames/bind';

import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);

import Navbar from '~/components/PageComp/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../../common/Footer/Footer';
import { useAuth } from '~/hooks/useAuth';

const UserLayout = ({ children }) => {
    const { user, fetchUser, handleLogout } = useAuth();
    return (
        <div className={cx('user-layout')}>
            <Navbar user={user} fetchUser={fetchUser} handleLogout={handleLogout}/>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default UserLayout;
