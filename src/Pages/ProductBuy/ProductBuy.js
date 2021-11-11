import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Navigation from '../Shared/Navigation/Navigation';

const ProductBuy = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/productBuy/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    return (
        <div>
            <Navigation></Navigation>
            <h1>{product.description}</h1>
        </div>
    );
};

export default ProductBuy;