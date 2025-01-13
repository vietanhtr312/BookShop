import classNames from 'classnames/bind';

import styles from './UploadImages.module.scss';
import { Image } from '~/components/Image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const UploadImages = ({ images = [], setImages, submit = false, id = 'image' }) => {
    const [message, setMessage] = useState('');

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const uploadImages = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        images.forEach((image) => {
            formData.append('images[]', image);
        });

        try {
            const response = await axios.post('/api/upload/images', formData, {
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
        <div className={cx('upload-images')}>
            <div className={cx('actions')}>
                <label htmlFor={id}>
                    Hình ảnh: <FontAwesomeIcon icon={faUpload} />
                </label>
                <input type="file" multiple onChange={handleImagesChange} id={id} />
                {submit && (
                    <button className={cx('submit-btn')} onClick={uploadImages}>
                        Thêm ảnh
                    </button>
                )}
            </div>
            <div className={cx('images')}>
                {images &&
                    images.length > 0 &&
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={image instanceof File ? URL.createObjectURL(image) : image}
                            alt={`image${index}`}
                        />
                    ))}
            </div>
            {message && <div className={cx('message')}>{message}</div>}
        </div>
    );
};

export default UploadImages;
