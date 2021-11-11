import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import Navigation from '../../Shared/Navigation/Navigation';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from "react-router";
import './Register.css';

const Register = () => {
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const { registerUser, loading, user, authError } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const onSubmit = data => {
        if (data.password !== data.password2) {
            setError("Your Password Did Not Matched");
            return;
        }
        registerUser(data.email, data.password, location, history);
        setOpen(true);
        reset()
        setError('')
    }
    // confirmation alert 
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <Navigation></Navigation>
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className='py-5 shadow rounded'>
                            <h3 className='text-center pb-4'>Register</h3>
                            {!loading && <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    style={{ width: '80%' }}
                                    className='mt-4 d-flex mx-auto'
                                    {...register("name", { required: true })}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Name"
                                />
                                {errors.name && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This name field is required</span>}
                                <TextField
                                    style={{ width: '80%' }}
                                    className='mt-4 d-flex mx-auto'
                                    {...register("email", { required: true })}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Email"
                                    type="email"
                                />
                                {errors.email && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This email field is required</span>}
                                <TextField
                                    style={{ width: '80%' }}
                                    className='mt-4 d-flex mx-auto'
                                    {...register("password", { required: true })}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                />
                                {errors.password && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This password field is required</span>}
                                <TextField
                                    style={{ width: '80%' }}
                                    className='mt-4 d-flex mx-auto'
                                    {...register("password2", { required: true })}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Re-enter password"
                                    type="password"
                                />
                                {errors.password2 && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This re-enter password field is required</span>}
                                {error && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>{error}</span>}

                                <Button style={{ width: '80%' }}
                                    className='my-4 d-flex mx-auto'
                                    variant='contained'
                                    type="submit"
                                >Register</Button>
                                <small style={{ width: '80%' }} className='d-flex mx-auto'>Already registered? Please,  <NavLink className='ms-2 fw-bold' to='/login'> Login</NavLink></small>
                            </form>}
                            {/* spinner loading add here */}
                            {loading && <div style={{ width: "70px", height: '70px' }} class="spinner-border d-flex mx-auto text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>}
                            {/* confirm user login notification add here */}
                            {user?.email &&
                                <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} style={{ backgroundColor: "green", color: 'white' }} sx={{ width: '100%' }}>
                                        User Created Successfully
                                    </Alert>
                                </Snackbar>
                            }
                            {authError &&
                                <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert style={{ backgroundColor: "red", color: 'white' }} severity="error">{authError}</Alert>
                                </Snackbar>
                            }

                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className='img-fluid' src="https://i.ibb.co/NFgd9jf/4957136.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;