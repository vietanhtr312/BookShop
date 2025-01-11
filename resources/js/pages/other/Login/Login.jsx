import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useState, useNavigate } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { CustomInput, PasswordInput } from '~/components/Input';
import {Button} from '~/components/Button';

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
                        </div>
                        <br />
                        <div className={cx('buttonContainer')}>
                            <Button onClick={onButtonClick} primary width='100%' large>ĐĂNG NHẬP </Button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Login;

