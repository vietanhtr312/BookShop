import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from "react";
import ProductCard from "~/components/ProductCard";
import Content from "~/components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { getProducts } from "~/services/productService";
import { getCategories } from "~/services/categoryService";
import Pagination from "~/components/Pagination";
import { Button } from "~/components/Button";

const getBreadcrumbs = (category = null) => [
    {
        title: "Trang chủ",
        link: '/',
    },
    {
        title: "Danh sách sản phẩm",
        link: '/products',
    },
    {
        title: category ? category.name : 'Danh mục sản phẩm'
    }
]

const sorts = [
    {
        name: "Mới nhất",
        value: "new",
    },
    {
        name: "Bán chạy",
        value: "hot",
    },
    {
        name: "Giảm giá nhiều nhất",
        value: "discount"
    },
    {
        name: "Giá: Thấp đến cao",
        value: "price_asc",
    },
    {
        name: "Giá: Cao đến thấp",
        value: "price_desc",
    }
]

const cx = classNames.bind(styles);

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState("new");
    const [lowerPrice, setLowerPrice] = useState('');
    const [upperPrice, setUpperPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [category, setCategory] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs());
    const [changePrice, setChangePrice] = useState(false);

    const category_id = useParams();
    category_id ? setCategory(category_id) : setCategory(null);

    const handleSortProduct = (sort) => {
        setSortType(sort.value);
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.categories);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts(sortType, currentPage, category, true, 9, lowerPrice, upperPrice);
            setProducts(res.products.data);
            setTotalPage(res.products.meta.last_page);
            setBreadcrumbs(getBreadcrumbs(categories.find(c => c.id === category)));
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [categories, category, sortType, changePrice, currentPage]);

    const handleChangeCategory = (id) => {
        setCategory(id);
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const onCancelFilter = () => {
        setSortType('new');
        setLowerPrice('');
        setUpperPrice('');
        setChangePrice(!changePrice);
        setCurrentPage(1);
        setCategory(null);
    }

    return (
        <Content breadcrumb={breadcrumbs}>
            <div className={cx('wrapper')}>
                <div className={cx('grid', 'wide')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-3', 'm-12', 'c-12')}>
                            <div className={cx('sidebar')}>
                                <div className={cx('sidebar-item')}>
                                    <h2 className={cx("title")}>
                                        <FontAwesomeIcon icon={faFilter} />
                                        Lọc sản phẩm
                                    </h2>
                                </div>
                                <div className={cx('sidebar-item')}>
                                    <h2>Mức giá</h2>
                                    <div className={cx('price')}>
                                        <div>
                                            <p>Từ: </p>
                                            <input placeholder="₫" type='number' min={0} value={lowerPrice} onChange={(e) => setLowerPrice(e.target.value)} />
                                        </div>
                                        <div>
                                            <p>Đến: </p>
                                            <input placeholder="₫" type='number' min={0} value={upperPrice} onChange={(e) => setUpperPrice(e.target.value)} />
                                        </div>
                                        <button className="btn btn--primary" onClick={() => {
                                            setChangePrice({ changePrice: !changePrice });
                                        }}>Áp dụng</button>
                                    </div>
                                </div>
                                <div className={cx('sidebar-item')}>
                                    <h2>Sắp xếp</h2>
                                    <div className={cx('tags')}>
                                        {sorts.map((sort, index) => (
                                            <div className={cx('tag', `${sort.value === sortType ? "active" : ""}`)} key={index} onClick={() => handleSortProduct(sort)}>
                                                {sort.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('sidebar-item')}>
                                    <h2>Thể loại</h2>
                                    <ul>
                                        {categories.map((category, index) => (
                                            <li key={index} onClick={() => handleChangeCategory(category?.id)}>
                                                <Link to={``}>{category?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button primary onClick={onCancelFilter}>Bỏ lọc</Button>
                            </div>
                        </div>
                        <div className={cx('col', 'l-9', 'm-12', 'c-12')}>
                            <div className="row">
                                {products.map((product, index) => (
                                    <div className="col l-4 m-4 c-12" key={index}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className={cx('pagination')}><Pagination current={currentPage} total={totalPage} setPage={handlePageChange} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}

export default Products;