import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { Button, Alert, Snackbar } from '@mui/material';
import useAuth from '../../../hooks/useAuth';



const Review = () => {
    const [review, setReview] = useState('');
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(false);

    const onSubmit = data => {
        data.review = review;
        data.email = user.email;
        data.name = user.displayName;
        data.img = user.photoURL;

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        reset()
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const secondExample = {
        size: 50,
        count: 5,
        color: "black",
        activeColor: "#fd1d1d",
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
        <div className='text-center'>
            <h1>Please Give Us Your Valuable Feedback</h1>
            <div className='d-flex justify-content-center'>
                <ReactStars {...secondExample} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    style={{ width: '80%' }}
                    className='mt-4 p-3 d-flex mx-auto  rounded input-focus'
                    {...register("feedback", { required: true })}
                    variant="outlined"
                    label="Email"
                    rows="4"
                    placeholder='Write here your feedback about us'
                    type="email"
                />
                {errors.feedback && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This feedback field is required</span>}

                <Button
                    className='px-5 fw-bold button-design d-flex mx-auto my-2'
                    variant='contained'
                    type="submit"
                >Post</Button>
            </form>
            <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} style={{ backgroundColor: "green", color: 'white' }} sx={{ width: '100%' }}>
                    Successfully Added Your Feedback
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Review;