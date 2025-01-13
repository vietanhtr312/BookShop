import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content grid wide')}>
                <div className={cx("row")}>
                    <div className={cx("col l-2-4 m-4 c-7")}>
                        <h3 className={cx('heading')}>Chăm sóc khách hàng</h3>
                        <div className={cx('list')}>
                            <div className={cx("item")}>
                                <Link href="#" className={cx('item-link')}>Trung tâm trợ giúp</Link>
                                <Link href="#" className={cx("item-link")}>Mall</Link>
                                <Link href="#" className={cx("item-link")}>Hướng dẫn mua hàng</Link>
                                <Link href="#" className={cx("item-link")}>Thanh Toán</Link>
                                <Link href="#" className={cx("item-link")}>Shop Xu</Link>
                                <Link href="#" className={cx("item-link")}>Vận Chuyển</Link>
                                <Link href="#" className={cx("item-link")}>Trả Hàng & Hoàn Tiền</Link>
                                <Link href="#" className={cx("item-link")}>Chăm Sóc Khách Hàng</Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx("col l-2-4 m-4 c-5")}>
                        <h3 className={cx('heading')}>Giới thiệu</h3>
                        <ul className={cx("list")}>
                            <li className={cx("item")}>
                                <Link href="#" className={cx("item-link")}>Giới thiệu</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Tuyển dụng</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Điều khoản</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Chính Sách Bảo Mật</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Chính Hãng</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Kênh Người Bán</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx("col l-2-4 m-4 c-7")}>
                        <h3 className={cx('heading')}>Danh mục</h3>
                        <ul className={cx('list')}>
                            <li className={cx('list-item')}>
                                <Link href="#" className={cx("item-link")}>Sách Tiếng Việt</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Sách ngoại văn</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Dụng cụ học sinh</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>Sổ và Giấy Các Loại</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx("col l-2-4 m-4 c-5")}>
                        <h3 className={cx('heading')}>Theo dõi</h3>
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link href="#" className={cx("item-link")}>
                                    <i className={cx("item-icon fa-brands fa-instagram")}></i>
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>
                                    <i className={cx("item-icon fa-brands fa-facebook")}></i>
                                    Facebook</Link>
                            </li>
                            <li>
                                <Link href="#" className={cx("item-link")}>
                                    <i className={cx("item-icon fa-brands fa-linkedin")}></i>
                                    Linked
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={cx("col l-2-4 m-8 c-12")}>
                        <h3 className={cx("heading")}>Vào cửa hàng trên ứng dụng</h3>
                        <div className={cx("download")}>
                            <img src={images.qrCode} alt="Download QR" className={cx("download-qr")} />
                            <div className={cx("download-apps")}>
                                <Link href="#" className={cx('download-app-link')} >
                                    <img src={images.ggPlay} alt="GGPlay" className={cx('download-app-img')} />
                                </Link>
                                <Link href="#" className={cx('download-app-link')}>
                                    <img src={images.appStore} alt="AppStore" className={cx('download-app-img')} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('bottom')} >
                <div className={cx('grid wide')}>
                    <div className={cx('policy', 'row')}>
                        <Link href="" className={cx('policy-item', 'col l-o-2 l-2 m-3 c-6')}>CHÍNH SÁCH BẢO MẬT</Link>
                        <Link href="" className={cx('policy-item', 'col l-2 m-3 c-6')}>QUY CHẾ HOẠT ĐỘNG</Link>
                        <Link href="" className={cx('policy-item', 'col l-2 m-3 c-6')}>CHÍNH SÁCH VẬN CHUYỂN</Link>
                        <Link href="" className={cx('policy-item', 'col l-2 m-3 c-6')}>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</Link>
                        <div className='col l-2'></div>
                    </div>

                    <p className={cx('text')}>
                        Địa chỉ: 22 Đường Tôn Thất Tùng, phường Khương Thượng, Quận Đống Đa, Thành phố Hà Nội, Việt Nam. <br/>
                    </p>
                    <p className={cx('text')}> Chịu Trách Nhiệm Quản Lý Nội Dung: Trịnh Việt Anh - Điện thoại liên hệ: 0355820096 </p>
                    <p className={cx('text')}>
                        Copyright © 2024 Bản quyền thuộc về Book shop312</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;