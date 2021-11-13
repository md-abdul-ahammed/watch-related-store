import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setFeedbacks(data))
    }, [])

    return (
        <div className="my-5">
            <div className={feedbacks.length > 2 ? "row row-cols-1 row-cols-md-3 container-md container-lg mx-auto g-4 px-2" : "row row-cols-1 row-cols-md-2 container-md container-lg mx-auto g-4 px-2"}>
                {
                    feedbacks.map(feedback =>
                        <div key={feedback._id} className="col ">
                            <div className='text-center hv-shadow py-5 card custom-rounded h-100'>
                                <div className='d-flex justify-content-center '>
                                    <img src={feedback.img} className='img-rounded card-img-top' alt="..." />
                                </div>
                                <div className="card-body text-center">
                                    <h3 className='fw-bold'>{feedback.name}</h3>
                                    <div className='d-flex justify-content-center'>
                                        <ReactStars activeColor="red" size={16} value={feedback.review} edit={false} />
                                    </div>
                                    <p>"{feedback.feedback}"</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Feedback;