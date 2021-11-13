import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    console.log(feedbacks.img, 'fetch startd')
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setFeedbacks(data)
                console.log(feedbacks.review, 'fetch end')
            }
            )
    }, [])

    return (
        <div>
            {
                feedbacks.map(feedback => <h1>{feedback.feedback}  <ReactStars size={30} value={feedback.review} edit={false} /></h1>)
            }
        </div>
    );
};

export default Feedback;