"use client"
import React, { FC } from "react"

interface CreditCardDropDownProps {

}

const CreditCardDropDown: FC<CreditCardDropDownProps> = ({ 
}) => {

    return (
        <div className="mx-8 mb-8">
            <div className='py-4'>
                <p>Card Number</p>
                <input type="text" name="cardNum" placeholder="1234 1234 1234 1234" className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm'/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
                <div className='pe-2'>
                    <p>Expiry</p>
                    <input type="text" name="expiry" placeholder="MM/YY" className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm'/>
                </div>
                <div className='ps-2'>
                    <p>CVC</p>
                    <input type="text" name="cvc" placeholder="CVC" className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm'/>
                </div>
            </div>
        </div>
    );
};

export default CreditCardDropDown;

