import React from 'react';

const Banner = () => {
    return (

        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://i.ibb.co/m52Vq1G/slider-1-2.jpg" className="d-block w-100" alt="..." />
                    <div className="carousel-caption  ">
                        <h5>NEW ARRIVALS</h5>
                        <p>Extra 20% Off</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://i.ibb.co/MVX19cw/slider-2-1.jpg" className="d-block w-100" alt="..." />
                    <div className="carousel-caption  ">
                        <h5>EXCLUSIVE COLLECTION</h5>
                        <p>Extra 20% Off</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://i.ibb.co/4R35WJW/slider-3-1.jpg" className="d-block w-100" alt="..." />
                    <div className="carousel-caption  ">
                        <h5>SPRING COLLECTION</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Banner;