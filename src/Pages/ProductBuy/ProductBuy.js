import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Navigation from '../Shared/Navigation/Navigation';

const ProductBuy = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { user } = useAuth()
    useEffect(() => {
        fetch(`http://localhost:5000/productBuy/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    const handleBuyNow = () => {
        product.login_user = user.email;
        product.status = "pending";

        fetch('http://localhost:5000/order', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <>
            <Navigation></Navigation>
            <div className="container">
                <div className='row justify-content-between'>
                    <div className='col-md-7'>
                        <img className='img-fluid' src={product.img} alt="" />
                    </div>
                    <div className='col-md-5'>
                        <div>
                            <h1>{product.product_name}</h1>
                            <p>{product.sell_price}</p>
                            <button onClick={handleBuyNow}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProductBuy;