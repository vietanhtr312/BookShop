import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles)

function Navbar({ ...props }) {
    const { handleLogout } = props
    const userId = localStorage.getItem('userId');
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className={cx('wrapper')}>
            <div className='grid wide'>
                <nav className={cx("navbar")}>
                    <ul className={cx("nav__list")}>
                        <li className={cx("nav__item", "nav__item--has-qr", "nav__item--separate")}>
                            Vào cửa hàng trên điện thoại
                            <div className={cx("qr")}>
                                <img src={images.qrCode} alt="QR code" />
                                <div>
                                    <Link to="" ><img src={images.ggPlay} alt="GG Play" /></Link>
                                    <Link to=""><img src={images.appStore} alt="App Store" /></Link>
                                </div>
                            </div>
                        </li>
                        <li className={cx("nav__item")}>
                            <span className={cx("nav__item--no-pointer")}>Kết nối</span>
                            <Link to="" className={cx("nav__icon-link")}>
                                <i className={cx("fa-brands fa-facebook")}></i>
                            </Link>
                            <Link to="" className={cx("nav__icon-link")}>
                                <i className={cx("fa-brands fa-instagram")}></i>
                            </Link>
                        </li>
                    </ul>

                    <ul className={cx("nav__list")}>
                        <li className={cx("nav__item", "nav__item--has-notify")}>
                            <Link to="" className={cx("nav__item-link")}>
                                <i className={cx("fa-regular fa-bell")}></i>
                                Thông báo
                            </Link>
                            <div className={cx("noti")}>
                                <header><h3>Thông báo mới nhận</h3></header>
                                <ul className={cx('noti-list')}>
                                </ul>
                                <footer><Link href="">Chưa có thông báo</Link></footer>
                            </div>
                        </li>
                        <li className={cx("nav__item")}>
                            <Link to="" className={cx("nav__item-link")}>
                                <i className={cx("fa-regular fa-circle-question")}></i>
                                Trợ giúp
                            </Link>
                        </li>

                        {userId ? (<li className={cx("nav__item", "nav-user")}>
                            <i className={cx("fa-regular fa-user")}></i>
                            <span>{user.name}</span>
                            <ul >
                                <li><Link to={'/'}>Tài khoản của tôi</Link></li>
                                {user.role === 'admin' ? <li><Link to="/admin/products">Admin</Link></li> :
                                    <>
                                        <li><Link to="">Địa chỉ</Link></li>
                                        <li><Link to="">Đơn mua</Link></li>
                                    </>
                                }
                                <li onClick={() => {
                                    handleLogout()
                                    window.location.reload()
                                }}><Link to="">Đăng xuất</Link></li>
                            </ul>
                        </li>) :
                            <>
                                <li className={cx("nav__item")}>
                                    <Link to="/login" className={cx("nav__item--strong", "nav__item-link")}>Đăng nhập</Link>
                                </li>
                                <li className={cx("nav__item")}>
                                    <Link to="/register" className={cx("nav__item--strong", "nav__item-link")}>Đăng ký</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar