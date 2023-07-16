"use client"
import React, { FC, useState } from 'react';
import { Plus, Dash } from "react-bootstrap-icons"

interface CartItemProps {
}

const CartItem: FC<CartItemProps> = ({ }) => {

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div className='grid grid-cols-6 gap-4 my-5'>
            <div className='flex col-span-3'>
                <p className='h-30 w-20 bg-grey text-grey'>wjkf</p>
                <div className='ps-5 flex items-center'>
                    <div>
                        <p className='uppercase text-sm'>Brand over here</p>
                        <p className='text-xs text-midgrey mt-2'>Item name over here</p>
                        <p className='text-xs text-midgrey mt-2'>Colour: Black</p>
                        <p className='text-xs text-midgrey mt-2'>Size: L</p>
                        <p className='text-xs text-midgrey mt-2'>Rental Period: 23 - 27 May</p>
                    </div>
                </div>
            </div>
            <div className='text-sm flex items-center justify-center'>
                0.00 SGD
            </div>
            <div className='flex flex-cols justify-center items-center'>
                <Dash onClick={decrement}/>
                <span className='mx-2'>{count}</span>
                <Plus onClick={increment}/>
            </div>
            <div className='text-sm flex items-center justify-center'>
                0.00 SGD
            </div>
        </div>
    );
};

export default CartItem;
