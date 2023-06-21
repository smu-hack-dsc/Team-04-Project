"use client"
import React from 'react';
import Link from 'next/link';
import { CheckCircleFill } from "react-bootstrap-icons";

const PersonalParticularsPage = () => {
    const countryCodeArr=[
      "+65", // Singapore
      "+60", // Malaysia
      "+62", // Indonesia
      "+66", // Thailand
      "+84", // Vietnam
      "+95", // Myanmar
      "+855", // Cambodia
      "+856", // Laos
      "+673", // Brunei
      "+63", // Philippines
      "+91", // India
      "+92", // Pakistan
      "+880", // Bangladesh
      "+94", // Sri Lanka
      "+86", // China
      "+82", // South Korea
      "+81", // Japan
      "+855", // Cambodia
      "+670", // East Timor
      "+971", // United Arab Emirates
    ];

    return (
    <div className='pt-16'>
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">

        <div>Personal Particulars</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className='text-midgrey'/>
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className='flex items-center text-midgrey'>Address</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className='text-midgrey'/>
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className='text-midgrey'>Clothing Preference</div>
      </div>

      <div className='flex justify-center'>
        <div className='text-sm mx-6 w-full max-w-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
            <div className='p-2'>
              <p>First Name</p>
              <input type="text" name="firstName" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
            </div>
            <div className='p-2'>
              <p>Last Name</p>
              <input type="text" name="lastName" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
            </div>
          </div>

          <div className='p-2'>
            <p>Email</p>
            <input type="email" name="email" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>

          <div className='p-2'>
            <p>Phone Number</p>
            <div className='flex flex-cols'>
              <select name="countryCode" className='focus:outline-none border border-midgrey border-1 w-16 px-2 h-7 me-2'>
                {countryCodeArr.map((countryCode, index) =>(
                  <option key={index} value={countryCode} className='text-sm'>{countryCode}</option>
                ))}
              </select>
              <input type="number" name="password" className='outline-none border border-midgrey border-1 w-full h-7 p-2 ms-2'/>
            </div>
          </div>

          <div className='p-2'>
            <p>Password</p>
            <input type="password" name="password" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>

          <div className='p-2'>
            <p>Re-enter Password</p>
            <input type="password" name="reEnteredPassword" className='outline-none border border-midgrey border-1 w-full h-7 p-2'/>
          </div>
        </div>
      </div>

      <Link href="/signup/address" className='flex justify-center m-6'>
        <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black  hover:bg-black hover:text-white">
          <div className="uppercase flex items-center justify-center">
            Continue
          </div>
        </button>
      </Link>
    </div>
  )
}

export default PersonalParticularsPage;