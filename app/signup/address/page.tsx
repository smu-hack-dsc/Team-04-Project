"use client"
import React from 'react';
import Link from 'next/link';
import { CheckCircleFill } from "react-bootstrap-icons";

const AddressPage = () => {

    return (
    <div className='pt-16'>
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">

        <div>Personal Particulars</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className='text-black'/>
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className='flex items-center text-black'>Address</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className='text-midgrey'/>
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className='text-midgrey'>Clothing Preference</div>
      </div>

      <div className='flex justify-center'>
        <div className='text-sm mx-10 w-full max-w-lg'>

          <div className='p-2'>
            <p>Address 1</p>
            <input type="text" name="address2" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>

          <div className='p-2'>
            <p>Address 2</p>
            <input type="text" name="address2" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
            <div className='p-2'>
              <p>City</p>
              <input type="text" name="city" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
            </div>

            <div className='p-2'>
              <p>State</p>
              <input type="text" name="state" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
            </div>
          </div>

          <div className='p-2'>
            <p>Postal Code</p>
            <input type="number" name="postalCode" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>

        </div>
      </div>

      <div className='flex flex-cols justify-center'>
        <Link href="/signup/personal-particulars" className='m-4'>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black bg-black text-white">
            <div className="uppercase flex items-center justify-center">
              Back
            </div>
          </button>
        </Link>

        <Link href="/signup/clothing-preference" className='m-4'>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">
              Continue
            </div>
          </button>
        </Link>

        <Link href="/signup/personal-particulars" className='m-4 flex items-center'>
          <p className='uppercase underline text-xs inline-block align-middle'>
            Skip
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AddressPage;