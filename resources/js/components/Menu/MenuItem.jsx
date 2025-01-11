import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import styles from './Menu.module.scss';
import { Button } from '../Button';

const cx = classNames.bind(styles);

const formatContent = (content) => {
    return content.split('\n').map((text, index) => (
        <Fragment key={index}>
            {text}
            {index > 0 && <br />}
        </Fragment>
    ));
};

const MenuItem = ({ data, onClick }) => {
    return (
        <Button
            classname={cx('menu-item')}
            leftIcon={data.leftIcon}
            rightIcon={data.rightIcon}
            to={data.to}
            onClick={onClick}
            type="button"
            width="100%"
        >
            {formatContent(data.content)}
        </Button>
    );
};

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
