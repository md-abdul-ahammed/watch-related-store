import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import CheckoutModal from '../CheckoutModal/CheckoutModal';

const Checkout = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();


    const [openCheckout, setOpenCheckout] = React.useState(false);
    const handleCheckoutOpen = () => setOpenCheckout(true);
    const handleCheckoutClose = () => setOpenCheckout(false);


    useEffect(() => {
        fetch(`http://localhost:5000/checkout/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    return (
        <>
            <Navigation></Navigation>
            <div className="container my-5">
                <div className='row justify-content-between align-items-center'>
                    <div className='col-md-7'>
                        <img className='img-fluid' src={product.img} alt="" />
                    </div>
                    <div className='col-md-5'>
                        <div >
                            <div className='d-flex align-items-center'>
                                <ReactStars activeColor="red" size={16} value={5} edit={false} />
                                <small className='ms-2'><small>({product.rating} customer review)</small></small>
                            </div>
                            <h1 className='fw-bold c-primary-color my-3'>{product.product_name}</h1>
                            <div className='my-1'>
                                <h3 className='fw-bold mb-0'> <del className='me-2 text-muted'>${product.regular_price}</del> ${product.sell_price}</h3>
                            </div>
                            <hr className='my-4' />
                            <small className="text-muted">{product.description}</small>
                            <small className="text-muted d-block mt-3 fw-bold">{product.stock} in stock</small>
                            <div className='my-3'>
                                <button onClick={handleCheckoutOpen} className='button-design'>Buy Now</button>
                                {/* <button className='button-design' onClick={handleBuyNow}>Buy Now</button> */}
                            </div>
                            <hr className='my-4' />
                            <small className='d-block my-2'><span className='text-muted'>SKU:</span> {product.sku}</small>
                            <small className='d-block my-2'><span className='text-muted'>Categories:</span> {product.categories}</small>
                        </div>
                    </div>
                </div>
                <CheckoutModal
                    product={product}
                    handleCheckoutClose={handleCheckoutClose}
                    openCheckout={openCheckout}
                >
                </CheckoutModal>
            </div>
            <hr />
            <Footer></Footer>
        </>
    );
};

export default Checkout;