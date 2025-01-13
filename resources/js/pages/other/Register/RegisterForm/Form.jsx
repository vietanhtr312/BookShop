import { useState, useNavigate } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { CustomInput, PasswordInput, Input } from '~/components/Input';
import { Button } from '~/components/Button';

import React from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';
import { register } from '~/services/userService';

const cx = classNames.bind(styles);
const Form = ({ setStep, setUerId, setCurrentAccount }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [error, setError] = useState({ name: '', email: '', password: '' });

    const setEmailError = (error) => {
        setError((prev) => ({ ...prev, email: error }));
    };

    const handleNextStep = async () => {
        if (!name) {
            setError((prev) => ({ ...prev, name: 'Vui lòng nhập tên tài khoản' }));
        } else if (!email) {
            setEmailError('Vui lòng nhập email');
        } else {
            if (password !== passwordAgain) {
                setError((prev) => ({ ...prev, password: 'Mật khẩu không khớp' }));
            } else if (!error.email && !error.password) {
                const response = await register({ name: name, email: email, password: password });
                if (response.error) {
                    setEmailError(response.message);
                } else {
                    setUerId(response.user.id);
                    setCurrentAccount({ email: email, password: password });
                    setStep(2);
                }
            }
        }
    };

    return (
        <div className={cx('mainContainer')}>
            <div className={cx('titleContainer')}>
                <div>Đăng ký</div>
            </div>
            <br />
            <div className={cx('inputContainer')}>
                <CustomInput
                    id='register-name'
                    value={name}
                    setValue={setName}
                    type="text"
                    label="Tên tài khoản"
                    required
                    width='100%'
                    error={error.name}
                />
                <CustomInput
                    value={email}
                    id='register-email'
                    name="email"
                    type="email"
                    setValue={setEmail}
                    label="Email đăng nhập"
                    required
                    width='100%'
                    error={error.email}
                />


                <PasswordInput
                    id='password'
                    password={password}
                    setPassword={setPassword}
                    name="password"
                    label="Mật khẩu"
                    width='100%'
                    required
                />

                <PasswordInput
                    password={passwordAgain}
                    setPassword={setPasswordAgain}
                    id='password-again'
                    name="password-again"
                    label="Nhập lại mật khẩu"
                    width='100%'
                    required
                    error={error.password}
                />

            </div>
            <br />
            <div className={cx('buttonContainer')}>
                <Button onClick={handleNextStep} primary width='100%' large>ĐĂNG KÝ </Button>
            </div>

            <div className={cx('login')}>
                <span>Đã có tài khoản?</span>
                <Link className={cx('login-btn')} to={'/login'}>
                    Đăng nhập
                </Link>
            </div>
        </div>
    )
}

export default Form;