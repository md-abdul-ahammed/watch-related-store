import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Shared/Navigation/Navigation';
import ReactStars from "react-rating-stars-component";
import Footer from '../Shared/Footer/Footer';

const Explore = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-brushlands-89706.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    return (
        <>
            <Navigation></Navigation>
            <div className='my-5'>
                <h5 className='d-flex justify-content-center c-primary-color fw-bold'>Choose Your Watch</h5>
                <h1 className='d-flex justify-content-center fw-bold'>OUR AVAILABLE PRODUCTS HERE</h1>
            </div>
            <div className="container-fluid my-5">
                <div className="row row-cols-1 row-cols-md-4 g-4 px-2">
                    {
                        products.map(product =>
                            <div key={product._id} className="col ">
                                <div className="hv-shadow card border-0 h-100">
                                    <div className='zoom'>
                                        <Link to={`/checkout/${product._id}`}>
                                            <img src={product.img} className="card-img-top" alt="..." />
                                        </Link>
                                    </div>
                                    <div className="card-body text-center">
                                        <small> <small className='text-muted'>{product.brand_name}</small></small>
                                        <Link to={`/checkout/${product._id}`} className="card-title nav-link p-0 m-0 c-primary-color fw-bold fs-6">{product.product_name}</Link>
                                        <small className="card-text">{product.description.slice(0, 70)}</small>
                                        <div className='my-1'>
                                            <p className='text-muted fw-bold mb-0'> <del className='me-2'>${product.regular_price}</del> ${product.sell_price}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <ReactStars activeColor="red" size={16} value={5} edit={false} />
                                            <small className='ms-2'><small>({product.rating} review)</small></small>
                                        </div>
                                        <Link className="nav-link" to={`/checkout/${product._id}`}><Button className='button-design fw-bold' variant='contained'>Buy Now</Button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
            <Footer></Footer>
        </>
    );
};

export default Explore;