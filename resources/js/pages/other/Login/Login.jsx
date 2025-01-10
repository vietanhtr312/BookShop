import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useState, useNavigate } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const cx = classNames.bind(styles);

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onButtonClick = async () => {
        axios.post('login', {
            email: email,
            password: password
        }).then((response) => {
            if (response.data.status === 200) {
                toast.success('Đăng nhập thành công');
                setTimeout(() => {
                    localStorage.setItem('token', response.data.token);
                }, 3000);
            } else {
                toast.error('Đăng nhập thất bại');
            }
        }).catch((error) => {
            toast.error('Đăng nhập thất bại');
        });
    }

    return (
        <div>
            <div className={cx('login_page')}>
                <div className={cx('smallContainer')} style={{ backgroundImage: 'url(https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745)' }}>
                    <div className={cx('mainContainer')}>
                        <div className={cx('titleContainer')}>
                            <div>Đăng nhập</div>
                        </div>
                        <br />
                        <div className={cx('inputContainer')}>
                            <label>Email</label>
                            <input
                                value={email}
                                placeholder="Nhập email của bạn"
                                onChange={(ev) => setEmail(ev.target.value)}
                                className={cx('inputBox')}
                            />
                            <label className={cx('errorLabel')}>{emailError}</label>
                        </div>
                        <br />
                        <div className={cx('inputContainer')}>
                            <label>Mật khẩu</label>
                            <input
                                value={password}
                                placeholder="Nhập mật khẩu của bạn"
                                onChange={(ev) => setPassword(ev.target.value)}
                                className={cx('inputBox')}
                                type='password'
                            />
                            <label className={cx('errorLabel')}>{passwordError}</label>
                        </div>
                        <br />
                        <div className={cx('inputContainer')}>
                            <input className={cx('btn btn--primary')} type="button" onClick={onButtonClick} value={'Đăng nhập'} />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Login;

