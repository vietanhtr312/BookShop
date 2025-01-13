import { memo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from "react";
import ProductCard from "~/components/Product/ProductCard";
import Content from "~/components/ContentWrap/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { getProducts } from "~/services/productService";
import { getCategories } from "~/services/categoryService";
import Pagination from "~/components/PageComp/Pagination";
import { Button } from "~/components/Button";
import LoadingPage from "~/pages/other/Loading";
import { useSearch } from "~/hooks/useSearch";

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
    const [done, setDone] = useState(false);
    const navigate = useNavigate();
    const { category_id } = useParams();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState("new");
    const [lowerPrice, setLowerPrice] = useState('');
    const [upperPrice, setUpperPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [categoryId, setCategoryId] = useState(category_id || null);
    const [breadcrumbs, setBreadcrumbs] = useState(getBreadcrumbs());
    const [changePrice, setChangePrice] = useState(false);
    const { search } = useSearch();
    useEffect(() => {
        navigate(`/products?search=${search}`);
    }, [search]);

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
        const tempProducts = []
        setLoading(true);
        try {
            const res = await getProducts(sortType, currentPage, categoryId, true, 9, lowerPrice, upperPrice, search);
            // console.log(res);
            tempProducts.push(...res.products.data);
            setTotalPage(res.products.meta.last_page);
            setBreadcrumbs(getBreadcrumbs(categories.find(c => c.id === categoryId)));
        } catch (err) {
            console.log(err);
        }
        setProducts(tempProducts);
        setTimeout(() => {
            setLoading(false);
            setDone(true);
        }, !done ? 1500 : 0);
    }

    useEffect(() => {
        fetchProducts();
    }, [ categories, categoryId, sortType, changePrice, currentPage, search]);

    const handleChangeCategory = (id) => {
        setCategoryId(id);
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
        setCategoryId(null);
        navigate('/products');
    }

    return (
        <>
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
                                                <li key={index} onClick={() => handleChangeCategory(category?.id)} >
                                                    <Link to={`/products/${category.id}`} className={cx(`${category?.id === categoryId ? "active" : ""}`, 'fsdalf')}>{category?.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Button primary onClick={onCancelFilter}>Bỏ lọc</Button>
                                </div>
                            </div>
                            <div className={cx('col', 'l-9', 'm-12', 'c-12')}>
                                <>
                                    {loading && <LoadingPage />}
                                    {!loading && products.length === 0 && <div className={cx('no-products')}>Không có sản phẩm nào</div>}
                                    {!loading && products.length > 0 &&
                                        <>
                                            <div className={cx('product-list', "row")}>
                                                {products.length > 0 && products.map((product, index) => (
                                                    <div className={cx("col l-4 m-4 c-12")} key={index}>
                                                        <ProductCard product={product} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cx('pagination')}><Pagination current={currentPage} total={totalPage} setPage={handlePageChange} /></div>
                                        </>
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default Products;