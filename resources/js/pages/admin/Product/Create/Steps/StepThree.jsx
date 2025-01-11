import classNames from 'classnames/bind';

import styles from './Steps.module.scss';
import { Image } from '~/components/Image';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const StepThree = ({ messages, loading }) => {
    return (
        <div className={cx('step-three')}>
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

export default StepThree;
