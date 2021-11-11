import React from 'react';
import { useForm } from "react-hook-form";
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import Navigation from '../../Shared/Navigation/Navigation';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useHistory, useLocation } from "react-router";
import './login.css';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(false);
    const { loginUser, loading, user, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();



    const onSubmit = data => {
        loginUser(data.email, data.password, location, history);
        setOpen(true);
        reset()
    };
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
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className='py-5 shadow rounded'>
                            <h3 className='text-center pb-4'>Login</h3>
                            {!loading && <form onSubmit={handleSubmit(onSubmit)}>
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

                                <Button style={{ width: '80%' }}
                                    className='my-4 d-flex mx-auto'
                                    variant='contained'
                                    type="submit"
                                >Login</Button>
                                <small style={{ width: '80%' }} className='d-flex mx-auto'>Are you new member? Please,  <NavLink className='ms-2 fw-bold' to='/register'> Register</NavLink></small>
                            </form>}
                            {/* spinner loading add here */}
                            {loading && <div style={{ width: "70px", height: '70px' }} class="spinner-border d-flex mx-auto text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>}
                            {/* confirm user login notification add here */}
                            {user?.email &&
                                <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} style={{ backgroundColor: "green", color: 'white' }} sx={{ width: '100%' }}>
                                        Login Successfully
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

export default Login;