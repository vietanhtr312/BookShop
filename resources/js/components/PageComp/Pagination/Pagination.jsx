import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Pagination = ({ current, total, setPage }) => {
    const arrayPages = Array.from({ length: total }, (_, index) => index + 1);
    const pages =
        total < 6
            ? arrayPages
            : current < 4
            ? arrayPages.slice(0, 5)
            : current > total - 3
            ? arrayPages.slice(total - 5, total)
            : arrayPages.slice(current - 3, current + 2);

    const handlePaginate = (page) => {
        setPage(page);
    };

    const handlePrev = (page) => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = (page) => {
        if (page < total) {
            setPage(page + 1);
        }
    };

    return (
        <div className={cx('pagination')}>
            <div className={cx('prev-btn')} onClick={() => handlePrev(current)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className={cx('body')}>
                {pages.map((page) => (
                    <div
                        key={`pagination-${page}`}
                        className={cx('page-item', { active: page === current })}
                        onClick={() => handlePaginate(page)}
                    >
                        {page}
                    </div>
                ))}
            </div>
            <div className={cx('next-btn')} onClick={() => handleNext(current)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default Pagination;
