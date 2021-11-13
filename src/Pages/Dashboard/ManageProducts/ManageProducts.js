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

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [isDeleted, setIsDeleted] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [isDeleted]);

    const handleDelete = (id) => {
        console.log(id)
        const confirm = window.confirm("Are you Sure For Delete?")
        if (confirm) {
            fetch(`http://localhost:5000/products/${id}`, {
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
                                <StyledTableCell align="right">Product Remove</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((data) => (
                                <StyledTableRow key={data._id}>
                                    <StyledTableCell component="th" scope="row" >
                                        <img style={{ height: '80px' }} src={data.img} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {data.product_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">${data.sell_price}</StyledTableCell>
                                    <StyledTableCell align="right"><button onClick={() => handleDelete(data._id)} className='button-design'>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
};

export default ManageProducts;