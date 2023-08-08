"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircleFill } from "react-bootstrap-icons";
import axios from "axios";

const PersonalParticularsPage = () => {
  const countryCodeArr = [
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
    "+670", // East Timor
    "+971", // United Arab Emirates
  ];

  var [firstNameValidation, setFirstNameValidation] = useState("");
  var [lastNameValidation, setLastNameValidation] = useState("");
  var [emailValidation, setEmailValidation] = useState("");
  var [phoneNumValidation, setPhoneNumValidation] = useState("");
  var [passwordValidation, setPasswordValidation] = useState("");
  var [cfmPasswordValidation, setCfmPasswordValidation] = useState("");

  const validation = () => {
    var emptyFieldError = "ⓘ Field cannot be empty.";
    var errors = 0;
    // first name
    const firstNameElement = document.getElementById(
      "firstName"
    ) as HTMLInputElement;
    if (firstNameElement.value === "") {
      setFirstNameValidation(emptyFieldError);
      errors += 1;
    }
    // last name
    const lastNameElement = document.getElementById(
      "lastName"
    ) as HTMLInputElement;
    if (lastNameElement.value === "") {
      setLastNameValidation(emptyFieldError);
      errors += 1;
    }
    // email
    const emailElement = document.getElementById("email") as HTMLInputElement;
    if (emailElement.value === "") {
      setEmailValidation(emptyFieldError);
      errors += 1;
    } else if (!emailElement.value.includes("@")) {
      setEmailValidation("ⓘ Invalid Email.");
      errors += 1;
    }
    // phoneNum
    const phoneNumElement = document.getElementById(
      "phoneNum"
    ) as HTMLInputElement;
    if (phoneNumElement.value === "") {
      setPhoneNumValidation(emptyFieldError);
      errors += 1;
    }
    // password
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordElement.value === "") {
      setPasswordValidation(emptyFieldError);
      errors += 1;
    }
    // confirm password
    const cfmPasswordElement = document.getElementById(
      "cfmPassword"
    ) as HTMLInputElement;
    if (cfmPasswordElement.value === "") {
      setCfmPasswordValidation(emptyFieldError);
      errors += 1;
    }
    if (cfmPasswordElement.value !== passwordElement.value) {
      setCfmPasswordValidation("ⓘ Passwords don't match");
      errors += 1;
    }

    // If there are no errors, proceed to the next step
    if (errors === 0) {
      // Store data in sessionStorage
      sessionStorage.setItem("firstName", firstNameElement.value);
      sessionStorage.setItem("lastName", lastNameElement.value);
      sessionStorage.setItem("email", emailElement.value);
      sessionStorage.setItem("phoneNum", phoneNumElement.value);
      sessionStorage.setItem("password", passwordElement.value);

      // Redirect to the next step (/signup/address) on the client side
      if (typeof window !== "undefined") {
        window.location.href = "/signup/address";
      }
    }
  };

  return (
    <div className="py-16">
      <div className="flex justify-center mb-10 mt-8">
        <span className="text-2xl uppercase tracking-[2.4px]">Sign Up</span>
      </div>
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Personal Particulars</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className="text-midgrey" />
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className="flex items-center text-midgrey">Address</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className="text-midgrey" />
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className="text-midgrey">Clothing Preference</div>
      </div>

      <div className="flex justify-center">
        <div className="text-sm mx-10 w-full max-w-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="p-2">
              <p>First Name</p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <p className="text-red-500">{firstNameValidation}</p>
            </div>

            <div className="p-2">
              <p>Last Name</p>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <p className="text-red-500">{lastNameValidation}</p>
            </div>
          </div>

          <div className="p-2">
            <p>Email</p>
            <input
              type="email"
              name="email"
              id="email"
              className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
            />
            <p className="text-red-500">{emailValidation}</p>
          </div>

          <div className="p-2">
            <p>Phone Number</p>
            <div className="flex flex-cols">
              <select
                name="countryCode"
                className="text-sm focus:outline-none border border-midgrey border-1 w-16 inline-block align-top h-7 me-2 focus:ring-0 focus:border-grey focus:border-1 p-0 ps-1"
              >
                {countryCodeArr.map((countryCode, index) => (
                  <option key={index} value={countryCode} className="text-sm">
                    {countryCode}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="phoneNum"
                id="phoneNum"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              />
            </div>
            <p className="text-red-500">{phoneNumValidation}</p>
          </div>

          <div className="p-2">
            <p>Password</p>
            <input
              type="password"
              name="password"
              id="password"
              className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
            />
            <p className="text-red-500">{passwordValidation}</p>
          </div>

          <div className="p-2">
            <p>Re-enter Password</p>
            <input
              type="password"
              name="reEnteredPassword"
              id="cfmPassword"
              className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
            />
            <p className="text-red-500">{cfmPasswordValidation}</p>
          </div>
        </div>
      </div>

      <div
        // href={haveError === true ? "." : "/signup/address"}
        className="m-4 flex justify-center items-center"
      >
        <button
          className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black"
          onClick={validation}
        >
          <div className="uppercase flex items-center justify-center">
            Continue
          </div>
        </button>
      </div>
    </div>
  );
};

export default PersonalParticularsPage;
