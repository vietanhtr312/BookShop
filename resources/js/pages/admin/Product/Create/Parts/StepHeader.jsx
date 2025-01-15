import { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Parts.module.scss';

const cx = classNames.bind(styles);

const StepHeader = ({ step, setStep }) => {
    const handleStepClick = (current, to) => {
        if (current !== 3) {
            setStep(to);
        }
    };

    const classes = (s) => {
        return cx('step-item', { active: step >= s }, { current: step === s });
    };

    return (
        <div className={cx('step-header')}>
            <div className={classes(1)} onClick={() => handleStepClick(step, 1)}>
                <span className={cx('circle')}>1</span>
                <span className={cx('step-name')}>Thông tin sản phẩm</span>
            </div>
            <div className={classes(2)} onClick={() => handleStepClick(step, 2)}>
                <span className={cx('circle')}>2</span>
                <span className={cx('step-name')}>Bản sách và số lượng</span>
            </div>
            <div className={classes(3)}>
                <span className={cx('circle')}>3</span>
                <span className={cx('step-name')}>Kết quả</span>
            </div>
        </div>
    );
};

export default memo(StepHeader);
