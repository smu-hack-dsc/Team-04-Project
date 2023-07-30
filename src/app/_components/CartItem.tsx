"use client"
import React, { FC, useEffect, useState } from 'react';
import { Plus, Dash, Trash3 } from "react-bootstrap-icons"
import axios from 'axios';

interface CartItemProps {
    key: number;
    productArr: Array<Object>;
    rentalArr: Array<Object>;
    productJson: Object,
    rentalJson: Object,
    total: number
    setTotal: (value: number) => void,
}

const CartItem: FC<CartItemProps> = ({
    key,
    productArr,
    rentalArr,
    productJson,
    rentalJson,
    total,
    setTotal
}) => {

    function formatDate(dateString: string): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        return `${day} ${month} ${year}`;
    }

    const updateDbQty = async () => {
        try {
            const productId = productJson["product_id"];
            const response = await axios.put('http://localhost:5000/api/cart/quantity/' + userId + '/' + productId + '/' + count);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const userId = sessionStorage.getItem("userId");

    const [count, setCount] = useState(rentalJson["quantity"]);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    useEffect(() => {
        updateDbQty();
        const prevSubtotal= subtotal
        const newSubtotal= productJson["price"] * count
        setSubtotal(newSubtotal)
        setTotal(total + (newSubtotal - prevSubtotal))
    }, [count])

    const [subtotal, setSubtotal] = useState(productJson["price"] * count);

    const [showTrash, setShowTrash] = useState(false);

    const handleMouseEnter = () => {
        setShowTrash(true)
    }
    
    const handleMouseLeave = () => {
        setShowTrash(false)
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:5000/api/cart/" + userId + "/" + productJson["product_id"])
            console.log(response)
            productArr.splice(key,1)
            rentalArr.splice(key,1)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className='grid grid-cols-7 gap-4 my-5' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='flex col-span-3'>
                <img src={productJson["image_url"][0]} alt="product image" className='w-24 object-cover'/>
                <div className='ps-5 flex items-center'>
                    <div>
                        <p className='uppercase text-sm'>{productJson["brand"]}</p>
                        <p className='text-xs text-black mt-2'>{productJson["product_name"]}</p>
                        <p className='text-xs text-midgrey mt-2'>Colour: {productJson["colour"]}</p>
                        <p className='text-xs text-midgrey mt-2'>Size: {productJson["size"]}</p>
                        <p className='text-xs text-midgrey mt-2'>Rental Period: {formatDate(rentalJson["rental_start"])} - {formatDate(rentalJson["rental_end"])}</p>
                    </div>
                </div>
            </div>
            <div className='text-sm flex items-center justify-center'>
                {productJson["price"]} SGD
            </div>
            <div className='flex flex-cols justify-center items-center'>
                <Dash onClick={decrement}/>
                <span className='mx-2'>{count}</span>
                <Plus onClick={increment}/>
            </div>
            <div className='text-sm flex items-center justify-center'>
                {subtotal} SGD
            </div>
            <div onClick={handleDelete} className={
                showTrash
                ? 'flex justify-center items-center visible'
                : "invisible"
            }>
                <Trash3/>
            </div>
        </div>
    );
};

export default CartItem;
