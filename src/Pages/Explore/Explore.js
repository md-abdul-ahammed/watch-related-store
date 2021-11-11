import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Shared/Navigation/Navigation';

const Explore = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    return (
        <>
            <Navigation></Navigation>
            <div className="container-fluid my-5">
                <div className="row row-cols-1 row-cols-md-4 g-4 px-2">
                    {
                        products.map(product =>
                            <div key={product._id} className="col ">
                                <div className="card h-100">
                                    <img src={product.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.product_name}</h5>
                                        <p className="card-text">{product.description.slice(0, 70)}</p>
                                    </div>
                                    <div className="card-footer p-0">
                                        <Link className="nav-link" to={`/productBuy/${product._id}`}><Button variant='contained'>Buy Now</Button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Explore;