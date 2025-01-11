import classNames from 'classnames/bind';
import styles from './ImageSlider.module.scss';
import { Image, ImageZoom } from '~/components/Image';
import images from '~/assets/images';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ImageSlider = ({ images = [] }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [current, setCurrent] = useState(0);
    const [currentExtra, setCurrentExtra] = useState(0);
    const [height, setHeight] = useState(0);
    const imageRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (imageRef.current) {
            setHeight(imageRef.current.offsetHeight + 10);
        }
    }, [images, windowWidth]);

    useEffect(() => {
        if (current < 3) {
            setCurrentExtra(0);
        } else if (current > images.length - 2) {
            setCurrentExtra(images.length - 4);
        } else {
            setCurrentExtra(current - 2);
        }
    }, [current]);

    const handlePrevMain = () => {
        if (current > 0) setCurrent((prev) => prev - 1);
    };

    const handleNextMain = () => {
        if (current < images.length - 1) setCurrent((prev) => prev + 1);
    };

    const handleUpExtra = () => {
        if (currentExtra > 0) setCurrentExtra((prev) => prev - 1);
    };

    const handleDownExtra = () => {
        if (currentExtra < images.length - 4) setCurrentExtra((prev) => prev + 1);
    };

    const hanldeClickImage = (index) => {
        setCurrent(index);
    };
    return (
        <div className={cx('image-slider')}>
            <div className={cx('main')}>
                <div className={cx('main-list')}>
                    {images.length > 0 &&
                        images.map((image, index) => {
                            const left = `${(index - current) * 105}%`;
                            return (
                                <div className={cx('main-image')} key={`main-image-${index}`} style={{ left: left }}>
                                    <ImageZoom src={image || images.prod1} />
                                </div>
                            );
                        })}

                    <button className={cx('action-btn', 'prev-main')} onClick={handlePrevMain}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <button className={cx('action-btn', 'next-main')} onClick={handleNextMain}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            <div className={cx('extra')}>
                <div className={cx('extra-list')}>
                    <div className={cx('extra-container')} style={{ height: `${height * 4 - 10}px` }}>
                        {images.length > 0 &&
                            images.map((image, index) => {
                                const top = `${(index - currentExtra) * height}px`;
                                return (
                                    <div
                                        className={cx('extra-image', { active: index === current })}
                                        key={`extra-image-${index}`}
                                        style={{ top: top }}
                                        ref={index === 0 ? imageRef : null}
                                        onClick={() => hanldeClickImage(index)}
                                    >
                                        <Image src={image} />
                                    </div>
                                );
                            })}
                    </div>

                    <button className={cx('action-btn', 'up-extra')} onClick={handleUpExtra}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>

                    <button className={cx('action-btn', 'down-extra')} onClick={handleDownExtra}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
