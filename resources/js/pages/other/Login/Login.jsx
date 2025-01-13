import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { CustomInput, PasswordInput } from '~/components/Input';
import { Button } from '~/components/Button';
import { useAuth } from '~/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import images from '~/assets/images';
import { Image } from '~/components/Image';
import background from '~/assets/background';

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
            if (response.status === 200) {
                // console.log('response: ', response);
                toast.success('Đăng nhập thành công');
                setTimeout(() => {
                    handleLogin(response.data.token, response.data.role, response.data.user_id, response.data.user);
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
                <div className={cx('smallContainer')} style={{ backgroundImage: `url(${background.background1})` }}>
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

                        <div className={cx('bottomContainer')}>
                            <div className={cx('other')}>
                                <div className={cx('line')}>
                                    <span>Hoặc</span>
                                </div>
    
                                <Button className={cx('logo-btn')} width="50%" outline contentCenter>
                                    <Image className={cx('logo-icon')} src={images.ggLogo} />
                                    <span className="mobile-hidden">Facebook</span>
                                </Button>
                                <Button className={cx('logo-btn')} width="50%" outline contentCenter>
                                    <Image className={cx('logo-icon')} src={images.fbLogo} />
                                    <span className="mobile-hidden">Google</span>
                                </Button>
                            </div>
    
                            <div className={cx('register')}>
                                <span>Đây là lần đầu của bạn?</span>
                                <Link className={cx('register-btn')} to={'/register'}>
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Login;

