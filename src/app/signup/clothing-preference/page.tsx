"use client"
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircleFill } from "react-bootstrap-icons";

const AddressPage = () => {
    const heightArr = ["CM", "FT"]
    const weightArr = ["KG", "LB"]

    const [topsSliderValue, setTopsSliderValue] = useState(2);
    const handleTopsSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const topsValue = parseInt(event.target.value);
      setTopsSliderValue(topsValue);
    };

    const [bottomsSliderValue, setBottomsSliderValue] = useState(2);
    const handleBottomsSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const bottomsValue = parseInt(event.target.value);
      setBottomsSliderValue(bottomsValue);
    };

    var [heightValidation, setHeightValidation] = useState("");
    var [weightValidation, setWeightValidation] = useState("");

    const validation = () => {
      var emptyFieldError = "ⓘ Field cannot be empty."
      var errors = 0;
      // height
      const heightElement = document.getElementById("height") as HTMLInputElement;
      if (heightElement.value === "") {
        setHeightValidation(emptyFieldError);
        errors += 1
      } 
      // weight
      const weightElement = document.getElementById("weight") as HTMLInputElement;
      if (weightElement.value === "") {
        setWeightValidation(emptyFieldError);
        errors += 1
      }
      
      // if have error
      if (errors > 0){
      } else {
        window.location.href = "/"
      }
    }

    return (
    <div className='py-16 '>

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
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className='text-black'/>
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className='text-black'>Clothing Preference</div>
      </div>

      <div className='flex justify-center'>
        <div className='text-sm mx-10 w-full max-w-sm'>

          <div className='text-center pb-5'>
            Give us your details and we'll give you an estimated size when you are shopping
          </div>

          <div className='p-2'>
            <div className='flex flex-cols items-center'>
              <p className='me-2 inline-block align-middle w-40'>Height</p>
              <input type="number" name="height" id="height" className='outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1'/>
              <select name="height" className='focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1'>
                {heightArr.map((heightMeasurement, index) =>(
                  <option key={index} value={heightMeasurement} className='text-sm'>{heightMeasurement}</option>
                ))}
              </select>
            </div>
            <p className='text-red-500'>{heightValidation}</p>
          </div>

          <div className='p-2'>
            <div className='flex flex-cols items-center'>
              <p className='me-2 inline-block align-middle w-40'>Weight</p>
              <input type="number" name="weight" id="weight" className='outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1'/>
              <select name="weight" className='focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1'>
                {weightArr.map((weightMeasurement, index) =>(
                  <option key={index} value={weightMeasurement} className='text-sm'>{weightMeasurement}</option>
                ))}
              </select>
            </div>
            <p className='text-red-500'>{weightValidation}</p>
          </div>

          <div className='text-center py-5'>
            How would you like your clothes to fit you?
          </div>

          <div className='p-2'>
            <div className='flex flex-cols'>
              <p className='me-2 inline-block w-28'>Tops</p>
              <div className='w-full'>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={topsSliderValue}
                    step="1"
                    onChange={handleTopsSliderChange}
                    className='slider w-full h-1 accent-black bg-grey rounded-md'
                  />
                  {topsSliderValue==1 && <p className='text-start py-2'>Tight</p>}
                  {topsSliderValue==2 && <p className='text-center py-2'>Normal</p>}
                  {topsSliderValue==3 && <p className='text-end py-2'>Loose</p>}
                </div>
              </div>
          </div>

          <div className='p-2'>
            <div className='flex flex-cols'>
              <p className='me-2 inline-block w-28'>Bottoms</p>
              <div className='w-full'>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={bottomsSliderValue}
                    step="1"
                    onChange={handleBottomsSliderChange}
                    className='slider w-full h-1 accent-black bg-grey rounded-md'
                  />
                  {bottomsSliderValue==1 && <p className='text-start py-2'>Tight</p>}
                  {bottomsSliderValue==2 && <p className='text-center py-2'>Normal</p>}
                  {bottomsSliderValue==3 && <p className='text-end py-2'>Loose</p>}
                </div>
              </div>
          </div>

        </div>
      </div>

      <div className='flex flex-cols justify-center'>
        <Link href="/signup/address" className='m-4'>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black bg-black text-white">
            <div className="uppercase flex items-center justify-center">
              Back
            </div>
          </button>
        </Link>

        <div
          // href="/" 
          className='m-4'
          onClick={validation}
        >
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">
              Sign Up
            </div>
          </button>
        </div>

        <Link href="/" className='m-4 flex items-center'>
          <p className='uppercase underline text-xs inline-block align-middle'>
            Skip
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AddressPage;