"use client";
import React from "react";
import { Facebook, Instagram, Pinterest, Youtube } from "react-bootstrap-icons"
import { BsCCircle } from "react-icons/bs";

const Footer = () => {
    
    return (
        <div className="bg-white p-8 z-50 border-t border-grey border-1">
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
                <div className="pb-5">
                    <div className='text-darkgrey py-2 uppercase'>About</div>
                    <div className='py-2'>About Us</div>
                    <div className='py-2'>Contact Us</div>
                </div>
                <div className="pb-5">
                    <div className='text-darkgrey py-2 uppercase'>Customer Care</div>
                    <div className='py-2'>Terms & Conditions</div>
                    <div className='py-2'>Return & Delivery Information</div>
                    <div className='py-2'>Track your Orders</div>
                    <div className='py-2'>Privacy Policy</div>
                </div>
                <div className="pb-5">
                    <div className='text-darkgrey py-2 uppercase'>Find Us</div>
                    <div className='flex py-2'>
                        <Facebook className="me-6"/>
                        <Instagram className="me-6"/>
                        <Pinterest className="me-6"/>
                        <Youtube/>
                    </div>
                </div>
                <div className="pb-5">
                    <div className='text-darkgrey py-2 uppercase'>Newsletter</div>
                    <div className='py-2'>Sign up for 10% on your next order *</div>
                    <input type="text" placeholder="Enter your email address" className="p-2 focus:border-grey focus:border focus:ring-0 my-2 text-sm w-full border-grey border"/>
                    <button className="box-border text-sm my-2 py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                        <div className="uppercase flex items-center justify-center">
                            Subscribe
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex mt-10">
                <span className="flex items-center pe-3"><BsCCircle/> </span>
                <span className="text-xs uppercase text-center"> 2023 to the closet</span>
            </div>
        </div>
    );

}

export default Footer