import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { Alert, Snackbar, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CheckoutModal = ({ openCheckout, handleCheckoutClose, product }) => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = React.useState(false);
    const onSubmit = data => {
        data.email = user.email;
        data.product = product;
        data.status = "pending";
        fetch('http://localhost:5000/order', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
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
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openCheckout}
                onClose={handleCheckoutClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openCheckout}>
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <TextField
                                label="Email"
                                className='d-flex mt-2 justify-content-center'
                                size="small"
                                defaultValue={user.email}
                                {...register("email", { required: true })} />
                            {errors.email && <small className="text-danger">This email field is required</small>}
                            <TextField
                                label="Name"
                                className='d-flex justify-content-center mt-2'
                                size="small"
                                {...register("name", { required: true })} />
                            {errors.name && <small className="text-danger">This name field is required</small>}
                            <TextField
                                label="Phone"
                                className='d-flex justify-content-center mt-2'
                                size="small"
                                {...register("phone", { required: true })} />
                            {errors.phone && <small className="text-danger">This phone field is required</small>}
                            <textarea
                                className='w-100 p-2 mt-2 rounded input-focus'
                                size="small"
                                placeholder="Street Address"
                                {...register("address", { required: true })} />
                            {errors.address && <p className='m-0 p-0'><small className="text-danger">This address is required</small></p>}

                            <input className='button-design mt-1' type="submit" />
                        </form>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar style={{ color: 'white' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} style={{ backgroundColor: "green", color: 'white' }} sx={{ width: '100%' }}>
                    Successfully Added Product
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CheckoutModal;