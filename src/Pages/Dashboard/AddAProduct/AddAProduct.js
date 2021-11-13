import React from 'react';
import { useForm } from "react-hook-form";

const AddAProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch("https://sheltered-brushlands-89706.herokuapp.com/products", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert("SuccessFully Added Service");
                    reset()
                }
            })
    };
    return (
        <div className="container fw-bold text-center">
            <h1>Add A Product </h1>
            <form className='d-flex flex-column align-content-center container-fluid justify-content-center  w-75' onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Product Name' className='mb-3 outline-a py-2 border-1 rounded px-2' {...register("product_name", { required: true })} />
                {errors.name && <span className='text-danger error-customize mb-2'>This name field is required</span>}

                <input placeholder='Brand Name' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("brand_name", { required: true })} />
                {errors.brand_name && <span className='text-danger error-customize mb-2'>This name field is required</span>}

                <input placeholder='Image Url' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("img", { required: true })} />
                {errors.img && <span className='text-danger error-customize mb-2'>This image field is required</span>}

                <input placeholder='Regular Price' type='number' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("regular_price", { required: true })} />
                {errors.regular_price && <span className='text-danger error-customize mb-2'>This price field is required</span>}

                <input type='Sell Price' type='number' placeholder='Price' className='mb-3 outline-a py-2 border-1 rounded px-2' {...register("sell_price", { required: true })} />
                {errors.sell_price && <span className='text-danger error-customize mb-2'>This price field is required</span>}

                <input placeholder='SKU' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("sku", { required: true })} />
                {errors.sku && <span className='text-danger error-customize mb-2'>This sku field is required</span>}

                <input placeholder='Description' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("description", { required: true })} />
                {errors.description && <span className='text-danger error-customize mb-2'>This description field is required</span>}

                <input placeholder='Categories' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("categories", { required: true })} />
                {errors.categories && <span className='text-danger error-customize mb-2'>This categories field is required</span>}

                <input placeholder='Rating' type='number' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("rating", { required: true })} />
                {errors.rating && <span className='text-danger error-customize mb-2'>This rating field is required</span>}

                <input placeholder='Stock' type='number' className='mb-3 py-2 outline-a border-1 rounded px-2' {...register("stock", { required: true })} />
                {errors.stock && <span className='text-danger error-customize mb-2'>This stock field is required</span>}

                <input className='mb-3 button-design py-2 border-1 rounded px-2' type="submit" />
            </form>
        </div>
    );
};

export default AddAProduct;