import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { Button, Alert, Snackbar } from '@mui/material';
import useAuth from '../../../hooks/useAuth';



const Review = () => {
    const [review, setReview] = useState('');
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.review = review;
        data.email = user.email;
        data.name = user.displayName;
        data.img = user.photoURL;

        const all = data

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(all)
    };


    const secondExample = {
        size: 50,
        count: 5,
        color: "black",
        activeColor: "yellow",
        value: 7.5,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: (newValue) => {
            console.log(`Example 2: new value is ${newValue}`);
            setReview(newValue)
        }


    };
    return (
        <div>
            <h1>Hey</h1>
            <ReactStars {...secondExample} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    style={{ width: '80%' }}
                    className='mt-4 d-flex mx-auto'
                    {...register("feedback", { required: true })}
                    variant="outlined"
                    label="Email"
                    type="email"
                />
                {errors.email && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This email field is required</span>}

                <Button style={{ width: '30%' }}
                    className='mt-4 mb-2 d-flex mx-auto'
                    variant='contained'
                    type="submit"
                >Post</Button>
            </form>
        </div>
    );
};

export default Review;