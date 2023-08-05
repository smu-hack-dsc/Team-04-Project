"use client"
import FirstComponent from '../images/Group 4.png';
import SecondComponent from '../images/Group 5.png';
import Image from 'next/image';
import { CheckCircleFill } from "react-bootstrap-icons";
import Link from 'next/link';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const ShippingDetailsPage = () => {
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

  var [firstNameValidation, setFirstNameValidation] = useState("");
  var [lastNameValidation, setLastNameValidation] = useState("");
  var [emailValidation, setEmailValidation] = useState("");
  var [phoneNumValidation, setPhoneNumValidation] = useState("");
  var [address1Validation, setAddress1Validation] = useState("");
  var [cityValidation, setCityValidation] = useState("");
  var [stateValidation, setStateValidation] = useState("");
  var [postalCodeValidation, setPostalCodeValidation] = useState("");

  const validation = () => {
    var emptyFieldError = "ⓘ Field cannot be empty."
    var errors = 0;
    // first name
    const firstNameElement = document.getElementById("firstName") as HTMLInputElement;
    if (firstNameElement.value === "") {
      setFirstNameValidation(emptyFieldError);
      errors += 1
    } 
    // last name
    const lastNameElement = document.getElementById("lastName") as HTMLInputElement;
    if (lastNameElement.value === "") {
      setLastNameValidation(emptyFieldError);
      errors += 1
    }
    // email
    const emailElement = document.getElementById("email") as HTMLInputElement;
    if (emailElement.value === "") {
      setEmailValidation(emptyFieldError);
      errors += 1
    }
    else if (!emailElement.value.includes("@")){
      setEmailValidation("ⓘ Invalid Email.");
      errors += 1
    }
    // phoneNum
    const phoneNumElement = document.getElementById("phoneNum") as HTMLInputElement;
    if (phoneNumElement.value === "") {
      setPhoneNumValidation(emptyFieldError);
      errors += 1
    }

    const address1Element = document.getElementById("address1") as HTMLInputElement;
    if (address1Element.value === "") {
      setAddress1Validation(emptyFieldError);
      errors += 1
    }

    const cityElement = document.getElementById("city") as HTMLInputElement;
    if (cityElement.value === "") {
      setCityValidation(emptyFieldError);
      errors += 1
    }

    const stateElement = document.getElementById("state") as HTMLInputElement;
    if (stateElement.value === "") {
      setStateValidation(emptyFieldError);
      errors += 1
    }

    const postalCodeElement = document.getElementById("postalCode") as HTMLInputElement;
    if (postalCodeElement.value === "") {
      setPostalCodeValidation(emptyFieldError);
      errors += 1
    }


    // if have error
    if (errors == 0){
      handleSubmit(firstNameElement.value, lastNameElement.value, emailElement.value, phoneNumElement.value, address1Element.value, cityElement.value, stateElement.value, postalCodeElement.value);
      // window.location.href = "/signup/address"
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (firstName, lastName, email, phoneNum, address1, city, state, postalCode) => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_num", phoneNum);
    formData.append("address1", address1);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("postalCode", postalCode);


    try {
      const response = await axios.post("http://localhost:5000/api/user");
      console.log(response)
    } catch (error){
      console.error(error)
    }
  }

  return (
    <div className="py-16">
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Cart</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="flex items-center text-black">Shipping</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className="text-midgrey" />
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className="text-midgrey">Payment</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact Information */}
        <div className="px-20 py-5">
          <div className="flex items-center">
            <Image src="/images/1-circle.svg" width ={25} height={25} alt="Icon 1" className="mr-2" />
            <p className="text">CONTACT INFORMATION</p>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <p className="text-sm text-gray-500">First Name</p>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
                <p className='text-red-500'>{firstNameValidation}</p>
              </div>

              <div className="w-1/2 pl-2">
                <p className="text-sm text-gray-500">Last Name</p>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
                <p className='text-red-500'>{lastNameValidation}</p>
              </div>
              
            </div>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Email</p>
            <input
              type="text"
              id="email"
              name="email"
              className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent focus:outline-none"
            />
            <p className='text-red-500'>{emailValidation}</p>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Phone Number</p>
            <div className='flex flex-cols'>
            <select
              name="countryCode"
              className="focus:outline-none focus:border-grey focus:border focus:ring-0 border-1 w-24 px-2 h-8 me-2 text-sm"
              style={{ paddingTop: '0.15rem', paddingBottom: '0.15rem', marginTop: '-0.15rem', verticalAlign: 'middle'}}
            >
                {countryCodeArr.map((countryCode, index) =>(
                  <option key={index} value={countryCode} className='text-sm'>{countryCode}</option>
                ))}
              </select>
              <input type="number" id="phoneNum" name="phoneNum" className='outline-none focus:border-grey focus:border focus:ring-0 border-1 w-full h-8 p-2 ms-2'/>
            </div>
            <p className='text-red-500'>{phoneNumValidation}</p>
          </div>
        </div>


        {/* Shipping Address */}
        <div className="px-20 py-5">
          <div className="flex items-center">
            <Image src="/images/2-circle.svg" alt="Icon 2" className="mr-2" height={25} width={25}/>
            <p className="text">SHIPPING ADDRESS</p>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Address 1</p>
            <input
              type="text"
              id="address1"
                  name="address1"
              className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent"
            />
            <p className='text-red-500'>{address1Validation}</p>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Address 2</p>
            <input
              type="text"
              className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent"
            />
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-sm text-gray-500">City</p>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent"
                />
                <p className='text-red-500'>{cityValidation}</p>
              </div>

              <div className="w-1/2">
                <p className="text-sm text-gray-500">State</p>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent"
                />
                <p className='text-red-500'>{stateValidation}</p>
              </div>
              
            </div>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-sm text-gray-500">Postal Code</p>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="focus:border-grey focus:border focus:ring-0 p-2 w-full h-8 bg-transparent "
                />
                <p className='text-red-500'>{postalCodeValidation}</p>
              </div>
              
            </div>
          </div>


          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 transform scale-75 appearance-none border border-black checked:bg-black checked:border-black focus:ring-0"
              id="sameAddressCheckbox"
            />
            <label htmlFor="sameAddressCheckbox" className="text-sm text-black focus:text-black focus: ring-0">
              My shipping and billing address are the same
            </label>
          </div>
        </div>
      </div>

      <div className='flex flex-cols justify-center'>
        <Link href="/cart" className='m-4'>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black bg-black text-white">
            <div className="uppercase flex items-center justify-center">
              Back
            </div>
          </button>
        </Link>

        <div
        // href={haveError === true ? "." : "/signup/address"} 
        className='m-4 flex justify-center items-center'
      >
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black" onClick={validation}>
            
            <div className="uppercase flex items-center justify-center">
              Continue
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsPage;
