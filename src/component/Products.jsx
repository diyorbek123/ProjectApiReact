import { Pagination } from 'antd';
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { getData } from '../server/common';

const { Search } = Input;

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [category, setCategory] = useState([])
    const [total, setTotal] = useState(10)
    const [nameCategory, setNameCategory] = useState([])
    const [current, setCurrent] = useState(1)
    const [error, setError] = useState()


    useEffect(() => {
        getProducts();
        getCategory();
    }, [])

    const getProducts = () => {
        getData('product/?limit=4&offset=0')
            .then((res) => {
                setData(res.data.products)
                setFilter(res.data.products)
                setTotal(10)
            })
    }

    const getCategory = () => {
        getData('category')
            .then((res) => {
                setCategory(res.data)
            })
    }


    const filterProduct = (category) => {
        setError()
        setNameCategory(category)
        getData(`product?name=e&category=${category}`)
            .then((res) => {
                setTotal(res.data.products.length)
            })
        getData(`product?name=e&category=${category}`)
        getData(`product?name=e&category=${category}&limit=4&offset=0`)
            .then((res) => {
                setFilter(res.data.products)
            })
    }

    const Active = () => {
        setCurrent(1)
        let classNames = document.querySelectorAll('.ant-pagination-item');
        for (let i = 0; i < classNames.length; i++) {
            if (i === 0) {
                classNames[0].className = `ant-pagination-item ant-pagination-item-${i + 1} ant-pagination-item-active`
            }
            else {
                classNames[i].className = `ant-pagination-item ant-pagination-item-${i + 1}`
            }
        }
    }

    const onSearch = (value) => {
        getData(`product?name=${value}`)
            .then((res) => {
                setTotal(res.data.products.length)
                if (res.data.products.length > 0) {
                    setFilter(res.data.products)
                    setError()
                }
                else {
                    setFilter([]);
                    setError(<h1 id='error'>Not Found</h1>)
                }
            })
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="pt-5">
                    <Search
                        placeholder="Search Product"
                        allowClear
                        enterButton="Search"
                        size="middle"
                        onSearch={onSearch}
                    />
                </div>
                <div className="buttons d-flex justify-content-center flex-wrap my-3">
                    <button className="btn btn-outline-dark m-2"
                        onClick={() => {
                            Active();
                            setNameCategory([]);
                            getProducts();
                            getCategory()
                            setError()
                        }}>All</button>
                    {category.map((i, index) => (
                        <button key={index} className="btn btn-outline-dark m-2" onClick={() => { filterProduct(i); Active() }}>{i}</button>
                    ))}
                </div>
                <div className="error-back"><span>{error}</span></div>
                {filter.map((product, index) => {
                    return (
                        <div key={index} className="col-10 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                            <div className="card card-shadow h-100 text-center p-4">
                                <img src={product.thumbnail} className="card-img-top" alt={product.title} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title m-0">Title: <span>{product.title.substring(0, 12)}</span></h5>
                                    <p className="card-text">Descreption: <span>${product.description.substring(0, 12)}...</span></p>
                                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-danger">See More</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const pagChange = (e) => {
        if (nameCategory.length > 0) {
            switch (e) {
                case 2:
                    setCurrent(2)
                    getData(`product?name=e&category=${nameCategory}&limit=4&offset=4`)
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
                case 3:
                    setCurrent(3)
                    getData(`product?name=e&category=${nameCategory}&limit=2&offset=8`)
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
                default:
                    setCurrent(1)
                    getData(`product?name=e&category=${nameCategory}&limit=4&offset=0`)
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
            }
        }
        else {
            switch (e) {
                case 2:
                    setCurrent(2)
                    getData('product/?limit=4&offset=4')
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
                case 3:
                    setCurrent(3)
                    getData('product/?limit=2&offset=8')
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
                default:
                    setCurrent(1)
                    getData('product/?limit=4&offset=0')
                        .then((res) => {
                            setFilter(res.data.products)
                            setData(res.data.products)
                        });
                    break;
            }
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <ShowProducts />
                </div>
            </div>
            <div className="container pagination-bar">
                <Pagination
                    defaultCurrent={1}
                    current={current}
                    total={total}
                    defaultPageSize="4"
                    onChange={pagChange}
                    id="pagination-btn"
                />
            </div>
        </div>
    )
}

export default Products