import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './UploadImages.module.scss';
import Popup from '~/components/Popup';

const cx = classNames.bind(styles);

const UploadImage = ({ image = '', setImage, submit = false, id = 'image', title = 'Ảnh đại diện' }) => {
    const [message, setMessage] = useState('');
    const [zoom, setZoom] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('/api/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('failed');
        }
    };

    return (
        <div className={cx('upload-image')}>
            <div className={cx('actions')}>
                <label htmlFor={id}>
                    {title}: <FontAwesomeIcon icon={faUpload} />
                </label>
                <input type="file" onChange={handleImageChange} id={id} />
                {submit && (
                    <button className={cx('submit-btn')} onClick={uploadImage}>
                        Thêm ảnh
                    </button>
                )}
            </div>
            {image && (
                <>
                    <div className={cx('image')} onClick={() => setZoom(true)}>
                        <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="image" />
                    </div>

                    <Popup isOpen={zoom} onClose={() => setZoom(false)}>
                        <div className={cx('zoom-image')}>
                            <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="image" />
                        </div>
                    </Popup>
                </>
            )}
        </div>
    );
};

export default UploadImage;
