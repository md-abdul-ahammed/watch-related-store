import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useAuth from '../../../hooks/useAuth';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const MyOrders = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    const [isDeleted, setIsDeleted] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user.email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products, isDeleted]);

    const handleDelete = (id) => {
        console.log(id)
        const confirm = window.confirm("Are you Sure For Delete?")
        if (confirm) {
            fetch(`http://localhost:5000/deleteOrder/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount) {
                        setIsDeleted(true)
                    } else {
                        setIsDeleted(false)
                    }
                })
        }

    }



    return (
        <div>
            <h1 className='text-center'>My Orders</h1>
            <Box>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Product Images</StyledTableCell>
                                <StyledTableCell align="right">Product Name</StyledTableCell>
                                <StyledTableCell align="right">Product Price</StyledTableCell>
                                <StyledTableCell align="right">Product Statues</StyledTableCell>
                                <StyledTableCell align="right">Order</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((data) => (
                                <StyledTableRow key={data.name}>
                                    <StyledTableCell component="th" scope="row" >
                                        <img style={{ height: '80px' }} src={data.product?.img} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {data.product?.product_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">${data.product?.sell_price}</StyledTableCell>
                                    <StyledTableCell className='text-danger fw-bold' align="right">{data?.status}</StyledTableCell>
                                    <StyledTableCell align="right"><button onClick={() => handleDelete(data._id)} className='button-design'>Cancel</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
};

export default MyOrders;