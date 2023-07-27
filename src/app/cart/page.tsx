"use client"
import React, { useEffect, useState } from "react";
import CartItem from "../_components/CartItem";
import Link from "next/link";
import CartItemSmViewport from "../_components/CartItemSmViewport";
import { CheckCircleFill } from "react-bootstrap-icons";
import axios from 'axios';

export default function Page() {
  const [numOfItems, setNumOfItems] = useState(-1);
  const [cartArr, setCartArr] = useState([]);
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      const userId = sessionStorage.getItem("userId");
      try {
        const response = await axios.get('http://13.215.49.137:5000/api/cart/' + userId);
        setNumOfItems(response.data.length);
        setCartArr(response.data);
        console.log(response.data);

        //get product details
        for (const item of response.data) {
          const productId = item.productId

          try{
            const response = await axios.get('http://13.215.49.137:5000/api/product/' + productId);
            console.log(response)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromBackend();
  }, []);

  return (
    <div className="py-16 px-8">
      <div className="md:flex">
        <div className='text-2xl uppercase tracking-[2.4px] mb-10 mt-8 hidden md:flex'>Cart</div>

        {/* Progress bar */}
        <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base md:absolute md:left-1/2 md:transform md:-translate-x-1/2 pb-5">
          <div>Cart</div>

          <div className="flex items-center">
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
            <CheckCircleFill className="text-midgrey" />
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          </div>

          <div className="flex items-center text-midgrey">Shipping</div>

          <div className="flex items-center">
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
            <CheckCircleFill className="text-midgrey" />
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          </div>

          <div className="text-midgrey">Payment</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-9">
        <div className="col-span-2 mb-6">

          <div className={
            numOfItems>0 ? "grid" : "hidden"
          }>
            <div className="uppercase text-lg mb-8">Item Summary ({numOfItems})</div>
            <div className="grid grid-cols-6 gap-4 mb-6 hidden sm:grid">
              <div className="col-span-3">
                Item Details
              </div>
              <div className="text-center">
                Price
              </div>
              <div className="text-center">
                Quantity
              </div>
              <div className="text-center">
                Subtotal
              </div>
            </div>    
            {/* change to for loop */}
            <div className="hidden sm:grid">
              {cartArr.map((item, index) => (
                <CartItem key={index}/>
              ))}
            </div>

            <div className="flex sm:hidden">
              <CartItemSmViewport/>
            </div>
          </div>

          <div className={
            numOfItems == 0 ? "flex flex-col" : "hidden"
          }>
            Your rental cart is currently empty.

            <Link href="/rent" className='my-4'>
              <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                <div className="uppercase flex items-center justify-center">
                  Rent
                </div>
              </button>
            </Link>
          </div>

        </div>
        <div>
          <div className="border border-grey border-1 p-5">
            <div className="uppercase text-lg mb-8">Order Summary</div>
            <div className="text-sm">
              <div className="flex flex-cols justify-between mb-5">
                <div>Subtotal</div>
                <div>0.00 SGD</div>
              </div>
              <div className="flex flex-cols justify-between mb-5 ">
                <div>Discount</div>
                <div>-0.00 SGD</div>
              </div>
              <div className="flex flex-cols justify-between mb-5 ">
                <input type="text" name="voucher" placeholder="Enter Voucher Code" className="focus:border-grey focus:border focus:ring-0 text-sm w-full border-[1px] me-3"/>
                <div className=''>
                  <button className="box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                    <div className="uppercase flex items-center justify-center">
                      Add
                    </div>
                  </button>
                </div>
              </div>
              <hr className="my-7"/>
              <div className="flex flex-cols justify-between my-5 ">
                <div className="uppercase">Total</div>
                <div>0.00 SGD</div>
              </div>
            </div>
            <Link href="/order/shipping-details" className='flex justify-center mt-4 text-base'>
              <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                <div className="uppercase flex items-center justify-center">
                  Checkout
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}