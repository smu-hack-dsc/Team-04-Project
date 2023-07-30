"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import { CheckCircleFill } from "react-bootstrap-icons";

const AddressPage = () => {

    var [address1Validation, setAddress1Validation] = useState("");
    var [address2Validation, setAddress2Validation] = useState("");
    var [cityValidation, setCityValidation] = useState("");
    var [stateValidation, setStateValidation] = useState("");
    var [postalCodeValidation, setPostalCodeValidation] = useState("");

    const validation = () => {
      var emptyFieldError = "ⓘ Field cannot be empty."
      var errors = 0;
      // address 1
      const address1Element = document.getElementById("address1") as HTMLInputElement;
      if (address1Element.value === "") {
        setAddress1Validation(emptyFieldError);
        errors += 1
      } 
      // last name
      const address2Element = document.getElementById("address2") as HTMLInputElement;
      if (address2Element.value === "") {
        setAddress2Validation(emptyFieldError);
        errors += 1
      }
      // city
      const cityElement = document.getElementById("city") as HTMLInputElement;
      if (cityElement.value === "") {
        setCityValidation(emptyFieldError);
        errors += 1
      }
      // state
      const stateElement = document.getElementById("state") as HTMLInputElement;
      if (stateElement.value === "") {
        setStateValidation(emptyFieldError);
        errors += 1
      }
      // postalCode
      const postalCodeElement = document.getElementById("postalCode") as HTMLInputElement;
      if (postalCodeElement.value === "") {
        setPostalCodeValidation(emptyFieldError);
        errors += 1
      }
      
      // if have error
      if (errors > 0){
      } else {
        window.location.href = "/signup/clothing-preference"
      }
    }

    return (
    <div className='py-16'>

      <div className='flex justify-center mb-10 mt-8'>
        <span className="text-2xl uppercase tracking-[2.4px]">Sign Up</span>
      </div>
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
            <input 
              type="text" 
              name="address1" 
              id="address1"
              className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'
            />
            <p className='text-red-500'>{address1Validation}</p>
          </div>

          <div className='p-2'>
            <p>Address 2</p>
            <input 
              type="text" 
              name="address2" 
              id="address2"
              className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'
            />
            <p className='text-red-500'>{address2Validation}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
            <div className='p-2'>
              <p>City</p>
              <input 
                type="text" 
                name="city" 
                id="city"
                className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'
              />
              <p className='text-red-500'>{cityValidation}</p>
            </div>

            <div className='p-2'>
              <p>State</p>
              <input 
                type="text" 
                name="state" 
                id="state"
                className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'
              />
              <p className='text-red-500'>{stateValidation}</p>
            </div>
          </div>

          <div className='p-2'>
            <p>Postal Code</p>
            <input 
              type="number" 
              name="postalCode" 
              id="postalCode"
              className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'
            />
            <p className='text-red-500'>{postalCodeValidation}</p>
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

        <div 
          // href="/signup/clothing-preference" 
          className='m-4'
        >
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center" onClick={validation}>
              Continue
            </div>
          </button>
        </div>

        <div
          href="/signup/personal-particulars" 
          className='m-4 flex items-center'
        >
          <p className='uppercase underline text-xs inline-block align-middle'>
            Skip
          </p>
        </div>
      </div>
    </div>
  )
}

export default AddressPage;