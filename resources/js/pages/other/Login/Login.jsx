import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { CustomInput, PasswordInput } from '~/components/Input';
import { Button } from '~/components/Button';
import { useAuth } from '~/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const { handleLogin, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onButtonClick = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });
            console.log('response: ', response);
            if (response.status === 200) {
                toast.success('Đăng nhập thành công');
                setTimeout(() => {
                    handleLogin(response.data.token, response.data.role, response.data.user_id);
                    const nextUrl = localStorage.getItem('nextUrl');
                    if (nextUrl) {
                        navigate('/');
                    } else {
                        if (response.data.role === 'user') {
                            navigate('/');
                        } else if (response.data.role === 'admin') {
                            navigate('/admin/products');
                        }
                    }
                }, 3000);
            } else {
                toast.error('Đăng nhập thất bại');
            }
        } catch (error) {
            console.log('Lỗi đăng nhập: ', error);
        }
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

