import React from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import { useState, useNavigate } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { CustomInput, PasswordInput } from '~/components/Input';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onButtonClick = async () => {
        console.log(username, email, password, confirmPassword);
        try {
            const res = await axios.post('/api/register',
                {
                    name: username,
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log(res);
            if (res.status === 422) {
                setEmailError(res.message);
                setPasswordError(res.data.password);
                return;
            } else if (res.status === 201) {
                toast.success('Đăng ký thành công');
                setTimeout(() => {
                    // localStorage.setItem('token', response.data.token);
                }, 3000);
            }
            else toast.error('Đăng ký thất bại. Hãy sử dụng email khác');

        } catch (error) {
            toast.error('Đăng ký thất bại. Hãy sử dụng email khác');
        };
    }
    return (
        <div>
            <div className={cx('register_page')}>
                <div className={cx('smallContainer')} style={{ backgroundImage: 'url(https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745)' }}>
                    <div className={cx('mainContainer')}>
                        <div className={cx('titleContainer')}>
                            <div>Đăng ký</div>
                        </div>
                        <br />
                        <div className={cx('inputContainer')}>
                            <CustomInput
                                id="username"
                                required
                                label="Tên đăng nhập"
                                width="100%"
                                value={username}
                                setValue={setUsername}
                            ></CustomInput>
                            <CustomInput
                                id="email"
                                required
                                label="Email"
                                width="100%"
                                value={email}
                                setValue={setEmail}
                            ></CustomInput>
                            <PasswordInput
                                id="password"
                                required
                                label="Mật khẩu"
                                width="100%"
                                password={password}
                                setPassword={setPassword}
                            ></PasswordInput>
                            <PasswordInput
                                id="confirmPassword"
                                required
                                label="Xác nhận mật khẩu"
                                width="100%"
                                value={confirmPassword}
                                setPassword={setConfirmPassword}
                            ></PasswordInput>
                        </div>
                        <br />
                        <div className={cx('buttonContainer')}>
                            <Button onClick={onButtonClick} primary width='100%' large>ĐĂNG KÝ </Button>
                        </div>

                        <div className={cx('login')}>
                            <span>Đã có tài khoản?</span>
                            <Link className={cx('login-btn')} to={'/login'}>
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
