import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Categories.module.scss';
import Menu from '~/components/Menu';
import axios from 'axios';
import { getCategories, getCategory } from '~/services/categoryService';

const cx = classNames.bind(styles);

const transformCategoriesToMenu = (categories) => {
    if (!Array.isArray(categories) || categories.length === 0) {
        return [];
    }

    return categories.map((category) => ({
        id: category.id,
        content: category.name,
        rightIcon: category.children.length > 0 ? <FontAwesomeIcon icon={faChevronDown} /> : undefined,
        children:
            category.children && category.children.length > 0
                ? {
                      title: category.name,
                      data: transformCategoriesToMenu(category.children),
                  }
                : undefined,
    }));
};

const Categories = ({ id, setId, name, setName, error, clearError, title = 'Loại sản phẩm' }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();
            setCategories(transformCategoriesToMenu(response.categories));
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (item) => {
        setName(item.content);
        setId(item.id);
    };

    const handleResetError = () => {
        if (error !== '') {
            clearError();
        }
    };

    return (
        <div className={cx('categories', { 'cate-error': error })} onClick={handleResetError}>
            <Menu items={categories} onClick={handleCategoryClick} click offset={[2, 5]}>
                <div className={cx('category')}>{error === '' ? (name ? name : title) : error}</div>
            </Menu>
        </div>
    );
};

export default Categories;
