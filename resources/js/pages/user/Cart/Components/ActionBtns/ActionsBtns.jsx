import { useCallback, memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Parts.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const ActionsBtns = ({ step, loading, setStep, setNext }) => {
    return (
        <div className={cx('action-btns')}>
            {step === 1 ? (
                <div className={cx('step-one-btn')}>
                    <Button
                        width='378px'
                        primary
                        type="button"
                        onClick={() => setNext(true)}
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                        Thanh toán
                    </Button>
                </div>
            ) : step === 2 ? (
                <div className={cx('step-two-btn')}>
                    <Button secondary type="button" onClick={() => setStep(1)} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}>
                        Quay lại
                    </Button>
                    <Button
                        primary
                        type="button"
                        onClick={() => setNext(true)}
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                        Xác nhận đơn hàng
                    </Button>
                </div>
            ) :  step === 3 ? (
                <div className={cx('step-three-btn')}>
                    <Button secondary type="button" onClick={() => setStep(2)} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}>
                        Quay lại
                    </Button>
                    <Button
                        primary
                        type="button"
                        onClick={() => setNext(true)}
                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    >
                        Đặt hàng
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default memo(ActionsBtns);
