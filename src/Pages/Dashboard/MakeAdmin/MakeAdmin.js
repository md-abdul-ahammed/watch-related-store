import React, { useState } from 'react';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = React.useState(false);

    const onSubmit = data => {
        const email = data.email;
        const user = { email }
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setNotification(true);
                    setOpen(true);
                }
                else {
                    setNotification(false);
                    setOpen(true);
                }
            })
        reset()
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    style={{ width: '80%' }}
                    className='mt-4 d-flex mx-auto'
                    {...register("email", { required: true })}
                    variant="outlined"
                    label="Email"
                    type="email"
                />
                {errors.email && <span style={{ width: '80%' }} className='text-danger d-flex mx-auto'>This email field is required</span>}

                <Button
                    className='mt-4 mb-2 px-5 fw-bold d-flex mx-auto button-design'
                    variant='contained'
                    type="submit"
                >Make Admin</Button>
            </form>
            {notification &&
                <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} style={{ backgroundColor: "green", color: 'white' }} sx={{ width: '100%' }}>
                        Congratulation! Successfully Added Admin
                    </Alert>
                </Snackbar>
            }
            {!notification &&
                <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert style={{ backgroundColor: "red", color: 'white' }} severity="error">Please Provide Valid Email</Alert>
                </Snackbar>
            }
        </div>
    );
};

export default MakeAdmin;