import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Input } from '~/components/Input';
import useProfile from '~/hooks/useProfile';
import Address from '~/components/PageComp/Address';
import Dropdown from '~/components/Dropdown';
import { Button } from '~/components/Button';
import { createProfile } from '~/services/userService';
import { AuthContext } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const Profile = ({ account, userId }) => {
    const { profile, setProfileField } = useProfile();
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setProfileField('user_id', userId);
    }, [userId]);

    const handleNext = async () => {
        const res = await createProfile(profile);
        if (res) {
            const response = await axios.post('/api/login', { email: account.email, password: account.password });
            if (response.status === 200) {
                handleLogin(response.data.token, response.data.role, response.data.user_id, response.data.user);
                const nextUrl = localStorage.getItem('nextUrl');
                if (nextUrl) {
                    navigate(nextUrl);
                } else {
                    if (response.data.role === 'user') {
                        navigate(config.routes.user.home);
                    } else if (response.data.role === 'admin') {
                        navigate(config.routes.admin.dashboard);
                    }
                }
            }
        }
    };

    return (
        <div className={cx('register-profile')}>
            <div className={cx('title')}>Thông tin cá nhân</div>

            <div className={cx('body')}>
                <div className={cx('two-items')}>
                    <Input
                        value={profile.first_name}
                        name="first-name"
                        type="text"
                        onChange={(e) => setProfileField('first_name', e.target.value)}
                        label="Họ"
                        required
                    />
                    <Input
                        value={profile.last_name}
                        name="last-name"
                        type="text"
                        onChange={(e) => setProfileField('last_name', e.target.value)}
                        label="Tên"
                        required
                    />
                </div>

                <div className={cx('two-items')}>
                    <Input
                        value={profile.birthday}
                        name="first-name"
                        type="date"
                        onChange={(e) => setProfileField('birthday', e.target.value)}
                        label="Ngày sinh"
                        required
                    />

                    <Dropdown title="Chọn giới tính" label="Giới tính" selected={profile.gender} required>
                        <Button normal width="100%" noRadius onClick={() => setProfileField('gender', 'Nam')}>
                            Nam
                        </Button>
                        <Button normal width="100%" noRadius onClick={() => setProfileField('gender', 'Nữ')}>
                            Nữ
                        </Button>
                        <Button normal width="100%" noRadius onClick={() => setProfileField('gender', 'Khác')}>
                            Khác
                        </Button>
                    </Dropdown>
                </div>

                <Input
                    value={profile.phone}
                    name="phone"
                    onChange={(e) => setProfileField('phone', e.target.value)}
                    label="Số điện thoại"
                    required
                />

                <Address
                    address={profile.address}
                    ward={profile.ward}
                    district={profile.district}
                    province={profile.province}
                    setField={setProfileField}
                />
            </div>

            <div className={cx('next-btn')}>
                <Button secondary primaryBorder large contentCenter width="100%" onClick={handleNext}>
                    Hoàn thành
                </Button>
            </div>
        </div>
    );
};

export default Profile;
