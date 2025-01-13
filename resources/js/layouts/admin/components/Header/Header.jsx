import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { formatPrice } from '~/utils/formarter';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { useSearch } from '~/hooks/useSearch';

function Header() {
    const { search, handleSearch } = useSearch();

    const categories = [];
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const [isShowHamburger, setIsShowHamburger] = useState(false);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('hamburger-menu-overlay', `${isShowHamburger ? 'active' : ''}`)}
                onClick={() => setIsShowHamburger(false)}>
            </div>

            <div className={cx('hamburger-menu-wrapper', `${isShowHamburger ? 'show' : ''}`)}>
                <div className={cx('hamberger-logo')}>
                    <h2>SHOPPY</h2>
                </div>
                <div className={cx("hamburger-menu-widget")}>
                    <div className={cx("auth")}>
                        <Link to="">
                            <FontAwesomeIcon icon={faUser} />
                            <i className="fa-regular fa-user"></i> Đăng nhập</Link>
                    </div>
                </div>
                <div className={cx("hamburger-menu-nav")}>
                    <ul>
                        {categories && categories?.map((category, index) => (
                            <li key={index}>
                                <Link to={`/products/category/${category?.title}`}>Sách {category?.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx("hamburger-menu-social")}>
                    <Link to="">
                        <i className={cx("fa-brands fa-facebook")}></i>
                    </Link>
                    <Link to="">
                        <i className={cx("fa-brands fa-instagram")}></i>
                    </Link>
                    <Link to="">
                        <i className={cx("fa-brands fa-twitter")}></i>
                    </Link>
                </div>
                <div className={cx('hamburger-menu-contact')}>
                    <ul>
                        <li><i className={cx('fa-solid fa-envelope')}></i> vietanhtr923@gmail.com</li>
                        <li>Miễn phí đơn hàng từ 200.000<sup>đ</sup></li>
                    </ul>
                </div>
            </div>

            <div className={cx("grid wide")}>
                <div className={cx("search_wrap")}>
                    <div className='row' style={{ alignItems: 'center' }}>
                        <div className={cx("logo", "col l-2 m-4")}>
                            <Link to={config.routes.user.home}><img src={images.logo} alt="Logo" /></Link>
                        </div>

                        <div className='col l-8 m-6 c-0'>
                            <div className={cx("search")}>
                                <div className={cx("search-input-wrap")}>
                                    <input type="search" placeholder="Tìm kiếm sản phẩm" spellCheck={false} onChange={(e) => handleSearchTerm(e)} />
                                </div>
                                <Link to={`/admin/products`} ><button onClick={() => handleSearch(searchTerm)}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></button></Link>
                            </div>
                        </div>

                        <div className={cx("col l-2 m-0 c-0")}>

                        </div>

                        <div className={cx('categories')}>
                            <ul>
                                {categories && categories?.map((category, index) => (
                                    <li key={index}>
                                        <Link to={`/products/category/${category?.title}`}>Sách {category?.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={cx('hamburger-open', 'col l-0 m-o-1 m-1 c-o-5 c-1')}>
                            <i className={cx('fa-solid fa-bars')} onClick={() => {
                                setIsShowHamburger(true);
                            }}></i>
                        </div>

                        <div style={{ marginTop: 10 }} className={cx("search", "col l-0 m-0 c-12")}>
                            <div className={cx("search-input-wrap")}>
                                <input type="search" placeholder="Tìm kiếm sản phẩm" spellCheck={false} onChange={(e) => handleSearchTerm(e)} />
                            </div>
                            <Link to='/admin/products'><button><i className={cx("fa-solid fa-magnifying-glass")}></i></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>);
}

export default Header;