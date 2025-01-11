import { useEffect, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Copies.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { getCopy, getCopies } from '~/services/copyService';

const cx = classNames.bind(styles);

const fn = () => {};

const Copies = ({ id, setId, name, setName, error, clearError = fn }) => {
    const [copies, setCopies] = useState([]);
    const [show, setShow] = useState(false);
    const copiesRef = useRef(null);

    useEffect(() => {
        const fetchCopies = async () => {
            const response = await getCopies();
            setCopies(response.copies);
        };

        fetchCopies();
    }, []);

    const handleClickMenu = () => {
        if (error !== '') {
            clearError();
        }
        setShow(!show);
    };

    const handleCopyClick = (copy) => {
        setName(copy.name);
        setId(copy.id);
    };

    const handleClickOutSide = (e) => {
        if (copiesRef.current && !copiesRef.current.contains(e.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide);
        };
    }, []);

    return (
        <>
            <div className={cx('copies', { error: error })}>
                <div className={cx('copy-btn')} ref={copiesRef} onClick={handleClickMenu}>
                    <span>
                        Màu sắc<span className={cx('required')}>*</span>:
                    </span>
                    <FontAwesomeIcon icon={faPalette} />
                    {show && (
                        <div className={cx('copies-table')}>
                            {copies &&
                                copies.map((copy) => (
                                    <span
                                        key={copy.id}
                                        className={cx('copy-option')}
                                        style={{ backgroundCopy: copy.code }}
                                        onClick={() => handleCopyClick(copy)}
                                    >
                                        {/* {copy.name} */}
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
                {/* style={{ copy: currentCopy.code }} */}
                {name && <span className={cx('copy-name')}>{name}</span>}
            </div>
            {error && <div className={cx('copy-error')}>{error}</div>}
        </>
    );
};

export default memo(Copies);
