import React from 'react';

const FeaturedProducts = () => {
    return (
        <div className='container-fluid my-5'>
            <div className="container-fluid">
                <div className="row g-4">
                    <div className="col-md-4 position-relative ">
                        <div className='zoom'>
                            <img className='img-fluid rounded' src="https://i.ibb.co/SRFK0TW/banner-1.png" alt="" />
                        </div>
                        <h2 className='text-center bottom-5 right-25 text-white fw-bold shadow-sm px-3 position-absolute'>Smart Watched</h2>
                    </div>
                    <div className="col-md-4 position-relative">
                        <div className='zoom'>
                            <img className='img-fluid rounded' src="https://i.ibb.co/BgTdMjS/banner-3.png" alt="" />
                        </div>
                        <h2 className='text-center bottom-5 right-25 text-white fw-bold shadow-sm px-3 position-absolute'>Smart Watched</h2>
                    </div>
                    <div className="col-md-4 position-relative">
                        <div className='zoom'>
                            <img className='img-fluid rounded' src="https://i.ibb.co/k6tn0Rh/banner-2.png" alt="" />
                        </div>
                        <h2 className='text-center bottom-5 right-25 text-white fw-bold shadow-sm px-3 position-absolute'>Smart Watched</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;