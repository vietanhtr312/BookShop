import classNames from 'classnames/bind';

import styles from './Step4.module.scss';
import { Image } from '~/components/Image';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Step4 = ({ messages, loading }) => {
    return (
        <div className={cx('create-order')}>
            {loading ? (
                <div className={cx('loading')}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
            ) : (
                <div className={cx('done')}>
                    <Image src={images.done} alt="done" height="100%" />
                </div>
            )}

            {messages.length > 0 ? (
                messages.map((message, index) => <div key={`message-${index}`}>{message}</div>)
            ) : (
                <div>Vui lòng chờ</div>
            )}
        </div>
    );
};

export default Step4;
