"use client"
import React, { FC } from 'react';
import Link from 'next/link';
import { BoxSeam } from 'react-bootstrap-icons'; //packing
import { Truck } from 'react-bootstrap-icons'; //delivering
import { Check2Circle } from 'react-bootstrap-icons'; //delivered
import { ChevronRight } from 'react-bootstrap-icons';

interface RentalCardProps {
    deliveryStatus: String; //packing OR delivering OR delivered
    deliveryDate: String;
}

const RentalCard: FC<RentalCardProps> = ({ deliveryStatus, deliveryDate}) => {

    return (
        <div className='border border-grey border-1'>
            <div className='border-b border-grey border-1 flex flex-cols justify-between'>
                <div className='items-center flex justify-center p-3'>
                    {deliveryStatus == 'packing' && <BoxSeam size={30}/>}
                    {deliveryStatus == 'delivering' && <Truck size={30}/>}
                    {deliveryStatus == 'delivered' && <Check2Circle size={30}/>}
                </div>
                <div className='p-3'>
                    {deliveryStatus == 'packing' && <p>Packing</p>}
                    {deliveryStatus == 'delivering' && <p>On the way</p>}
                    {deliveryStatus == 'delivered' && <p>Delivered</p>}
                    <p className='text-sm text-midgrey'>on {deliveryDate} </p>
                </div>
                <div className='flex justify-center p-3'>
                    <Link href="" className=''>
                        <button className="box-border text-sm py-2 px-5 border-[1px] tracking-[1px] flex border-solid border-black hover:bg-black hover:text-white">
                            <div className="uppercase text-xs flex items-center justify-center">
                                {deliveryStatus == 'packing' && <span>Track<br/>order</span>}
                                {deliveryStatus == 'delivering' && <span>Track<br/>order</span>}
                                {deliveryStatus == 'delivered' && <span>Request<br/>Return</span>}
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='flex flex-cols justify-between'>
                <div className='p-3'>
                    <p className='h-28 w-20 bg-grey text-grey'>wjkf</p>
                </div>
                <div className='p-3 flex items-center'>
                    <div>
                        <p className='uppercase text-sm'>Brand over here</p>
                        <p className='text-xs text-midgrey mt-2'>Item name over here</p>
                        <p className='text-xs text-midgrey mt-2'>Size: L</p>
                    </div>
                </div>
                <div className='flex items-center justify-center p-3'>
                    <ChevronRight size={20}/>
                </div>
            </div>
            <div className='border-t border-grey border-1 p-3 flex items-center justify-center'>
                <div className='text-xs'>
                    Rental Period: 7 Days ・Return by 29 May 2023
                </div>
            </div>
        </div>
    );
};

export default RentalCard;
