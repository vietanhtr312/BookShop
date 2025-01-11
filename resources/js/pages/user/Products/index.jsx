import { memo } from "react";
import { Link } from "react-router-dom";
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from "react";
import ProductCard from "~/components/ProductCard";

const cx = classNames.bind(styles);

const Products = () => {
    const [lowerPrice, setLowerPrice] = useState('');
    const [upperPrice, setUpperPrice] = useState('');

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
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [sortType, setSortType] = useState("new");
    const handleSortProduct = (sort) => {
        setSortType(sort.value);
    }

    useEffect(() => {
        axios.get('/api/categories')
            .then(res => {
                console.log(res);
                setCategories(res.data.categories);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products', {
                params: {
                    start: lowerPrice,
                    end: upperPrice,
                    type: sortType,
                }
            });
            setProducts(res.data.products.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [categories, sortType])


    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('grid', 'wide')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-3', 'm-12', 'c-12')}>
                            <div className={cx('sidebar')}>
                                <div className={cx('sidebar-item')}>
                                    <h2 className={cx("title")}>Lọc sản phẩm</h2>
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
                                            fetchProducts();
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
                                            <li key={index}>
                                                <Link to={`/products/category/${category?.name}`}>{category?.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;