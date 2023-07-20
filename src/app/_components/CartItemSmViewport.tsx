"use client"
import React, { FC, useState } from 'react';
import { Plus, Dash } from "react-bootstrap-icons"

interface CartItemSmViewportProps {
}

const CartItemSmViewport: FC<CartItemSmViewportProps> = ({ }) => {

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div className='my-5 w-full'>
            <div className='flex justify-between flex-row'>
                <div className='flex flex-row'>
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
                <div className='flex flex-col justify-center items-center ms-3'>
                    <div className='flex mb-5 items-center'>
                        <Dash onClick={decrement}/>
                        <span className='mx-2'>{count}</span>
                        <Plus onClick={increment}/>
                    </div>
                    <div className='text-sm flex items-center justify-center'>
                        0.00 SGD
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemSmViewport;
