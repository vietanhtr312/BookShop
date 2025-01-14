import styles from './Step2.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Address from '~/components/PageComp/Address';
import { getProfile } from '~/services/userService';
import useProfile from '~/hooks/useProfile';

const cx = classNames.bind(styles);


function Step2( {onSubmit, next, setNext} ) {
    const [payment, setPayment] = useState("Onepay");
    const handlePayment = (payment) => {
        setPayment(payment);
    }
    const [profile, setProfile] = useState({});
    const useId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile(useId);
                setProfile(res.profile)
            } catch (error) {
                console.log(error);
            }
        }

        fetchProfile()
    }, [])

    const setProfileField = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (next) {
            onSubmit({payment, name: `${profile.first_name} ${profile.last_name}`, phone: profile.phone, deliveryAddress: `${profile.address}, ${profile.ward}, ${profile.district}, ${profile.province}`});
            setNext(false);
        }
    }, [next]);


    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('grid wide')}>
                    <div className={cx('container')}>
                        <div className={cx('content', 'row')}>
                            <div className="col l-7 m-12 c-12">
                                <div className={cx('content-left')}>
                                    <div className={cx('method_delivery')}>
                                        <h3>Phương thức giao hàng</h3>
                                        <input checked type="radio" />
                                        <label>Giao hàng chuyển phát nhanh</label>
                                        <span>Chuyển hàng tới địa chỉ khách hàng</span>
                                    </div>
                                    <form className={cx('method_payment')}>
                                        <h3>Phương thức thanh toán</h3>
                                        <span>Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại.</span>
                                        <div className={cx('method_payment-item')}>
                                            <input name="method_payment" type="radio" id="method_payment_1" value="Onepay"
                                                onChange={() => handlePayment("Onepay")} checked={payment === "Onepay"} />
                                            <label for="method_payment_1">Thanh toán bằng thẻ tín dụng (OnePay)</label>
                                            <img src={images.onepay} alt="payment-img" />
                                        </div>
                                        <div className={cx('method_payment-item')}>
                                            <input name="method_payment" type="radio" id="method_payment_2" value="ATM"
                                                onChange={() => handlePayment("ATM")} checked={payment === "ATM"} />
                                            <label for="method_payment_2">Thanh toán bằng thẻ ATM(OnePay)</label>
                                            <img src={images.atm} alt="payment-img" />
                                            <span>Hỗ trợ thanh toán online hơn 38 ngân hàng phổ biến Việt Nam</span>
                                        </div>
                                        <div className={cx('method_payment-item')}>
                                            <input name="method_payment" type="radio" id="method_payment_3" value="Momo"
                                                onChange={() => handlePayment("Momo")} checked={payment === "Momo"} />
                                            <label for="method_payment_3">Thanh toán Momo</label>
                                            <img src={images.momo} alt="payment-img" />
                                        </div>
                                        <div className={cx('method_payment-item')}>
                                            <input name="method_payment" type="radio" id="method_payment_4" value="Tiền mặt"
                                                onChange={() => handlePayment("Tiền mặt")} checked={payment === "Tiền mặt"} />
                                            <label for="method_payment_4">Thu tiền tận nơi</label>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col l-5 m-12 c-12">
                                <div className={cx('content-right')}>
                                    <div className={cx("delivery")}>
                                        <h4>Vui lòng xác nhận địa chỉ giao hàng</h4>
                                        <div className={cx("delivery-input", "row")}>
                                            <Address
                                                address={profile?.address || ''}
                                                ward={profile?.ward || ''}
                                                district={profile?.district || ''}
                                                province={profile?.province || ''}
                                                setField={setProfileField}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Step2;