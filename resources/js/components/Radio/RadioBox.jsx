import classNames from 'classnames/bind';

import styles from './Radio.module.scss';
import { useState } from 'react';
import RadioInput from './RadioInput';

const cx = classNames.bind(styles);

const RADIOS = [
    {
        id: 1,
        title: 'Loại 1',
        content: <div>Loại 1 nè</div>,
    },
    {
        id: 2,
        title: 'Loại 2',
        content: <div>Loại 2 nè</div>,
    },
    {
        id: 3,
        title: 'Loại 3',
        content: <div>Loại 3 nè</div>,
    },
];

const RadioBox = ({ radios = RADIOS, name = 'price', title = 'Phương thức giảm' }) => {
    const [radio, setRadio] = useState(radios[0]);

    const handleRadioChange = (rad) => {
        if (rad !== radio) {
            setRadio(rad);
        }
    };

    return (
        <div className={cx('radio-box')}>
            <div className={cx('header')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('options')}>
                    {radios.map((rad) => (
                        <div key={rad.id} className={cx('option')}>
                            <RadioInput
                                name={name}
                                id={`radio-${rad.id}`}
                                title={rad.title}
                                checked={rad === radio}
                                onChange={() => handleRadioChange(rad)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('content')}>{radio.content}</div>
        </div>
    );
};

export default RadioBox;
