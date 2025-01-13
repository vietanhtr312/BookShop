import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import Form from './RegisterForm/Form';
import Profile from './Profile';
import { OutInTransition } from '~/animations/Transition';
import background from '~/assets/background';

const cx = classNames.bind(styles);

const Register = () => {
    const [step, setStep] = useState(1);
    const [account, setCurrentAccount] = useState({ email: '', password: '' });
    const [userId, setUserId] = useState('');

    return (
        <div>
            <div className={cx('register_page')}>
                <div className={cx('smallContainer')} style={{ backgroundImage: `url(${background.background1})` }}>
                    <OutInTransition state={step}>
                        <div className={cx('mainContainer')}>
                            {step === 1 ? (
                                <Form setUerId={setUserId} setCurrentAccount={setCurrentAccount} setStep={setStep} />
                            ) : (
                                <Profile account={account} userId={userId} />
                            )}
                        </div>
                    </OutInTransition>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
