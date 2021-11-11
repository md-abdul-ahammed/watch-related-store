import React from 'react';

const Footer = () => {
    return (
        <div className='container-fluid mt-5'>
            <div className='row px-3'>
                <div className='col-md-3'>
                    <h5>INFORMATION</h5>
                    <p>Shipping</p>
                    <p>Warranty & Authenticity</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
                <div className='col-md-3'>
                    <h5>HELP</h5>
                    <p>Contact Us</p>
                    <p>About Us</p>
                    <p>Reviews</p>
                    <p>Term of Service</p>
                    <p>Refund Policy Contact</p>
                </div>
                <div className='col-md-3'>
                    <h5>SERVICE</h5>
                    <p>Sale</p>
                    <p>Quick Ship</p>
                    <p>New Designs</p>
                    <p>Protection Plan</p>
                    <p>Gift Cards</p>
                </div>
                <div className='col-md-3'>
                    <h5>Categories</h5>
                    <p>Watches</p>
                </div>
            </div>
            <hr />
            <div className='px-2 d-flex flex-column flex-column-reverse flex-md-row justify-content-md-between justify-content-sm-center '>
                <small className='my-2'>© 2020-2021
                    Abdul Ahammed
                    All Rights Reserved</small>
                <div className='my-2'>
                    <img src="https://i.ibb.co/YW0wjD6/paymet.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Footer;