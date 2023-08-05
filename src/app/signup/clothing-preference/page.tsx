"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddressPage = () => {
  const heightArr = ["CM", "FT"];
  const weightArr = ["KG", "LB"];
  const threeArr = ["CM", "IN"];

  const [topsSliderValue, setTopsSliderValue] = useState(2);
  const handleTopsSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const topsValue = parseInt(event.target.value);
    setTopsSliderValue(topsValue);
  };

  const [bottomsSliderValue, setBottomsSliderValue] = useState(2);
  const handleBottomsSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const bottomsValue = parseInt(event.target.value);
    setBottomsSliderValue(bottomsValue);
  };

  var [heightValidation, setHeightValidation] = useState("");
  var [weightValidation, setWeightValidation] = useState("");
  var [shoulderValidation, setShoulderValidation] = useState("");
  var [hipValidation, setHipValidation] = useState("");
  var [waistValidation, setWaistValidation] = useState("");

  const validation = () => {
    var emptyFieldError = "ⓘ Field cannot be empty.";
    var errors = 0;
    // height
    const heightElement = document.getElementById("height") as HTMLInputElement;
    if (heightElement.value === "") {
      setHeightValidation(emptyFieldError);
      errors += 1;
    }
    // weight
    const weightElement = document.getElementById("weight") as HTMLInputElement;
    if (weightElement.value === "") {
      setWeightValidation(emptyFieldError);
      errors += 1;
    }
    const shoulderElement = document.getElementById(
      "shoulder"
    ) as HTMLInputElement;
    if (shoulderElement.value === "") {
      setShoulderValidation(emptyFieldError);
      errors += 1;
    }
    const hipElement = document.getElementById("hip") as HTMLInputElement;
    if (hipElement.value === "") {
      setHipValidation(emptyFieldError);
      errors += 1;
    }
    const waistElement = document.getElementById("waist") as HTMLInputElement;
    if (waistElement.value === "") {
      setWaistValidation(emptyFieldError);
      errors += 1;
    }

    let top_fit = "";
    let bottoms_fit = "";

    topsSliderValue == 1
      ? (top_fit = "Tight")
      : topsSliderValue == 2
      ? (top_fit = "Normal")
      : (top_fit = "Loose");
    bottomsSliderValue == 1
      ? (bottoms_fit = "Tight")
      : bottomsSliderValue == 2
      ? (bottoms_fit = "Normal")
      : (bottoms_fit = "Loose");

    // if have error
    if (errors > 0) {
    } else {
      handleSubmit(
        heightElement.value,
        weightElement.value,
        top_fit,
        bottoms_fit,
        shoulderElement.value,
        hipElement.value,
        waistElement.value
      );
    }
  };

  const handleSubmit = async (
    height,
    weight,
    top,
    bottom,
    shoulder,
    hip,
    waist
  ) => {
    try {
      const particularsurl =
        "http://localhost:5000/api/user?first_name=" +
        sessionStorage.getItem("firstName") +
        "&last_name=" +
        sessionStorage.getItem("lastName") +
        "&email=" +
        sessionStorage.getItem("email") +
        "&phone_num=" +
        sessionStorage.getItem("phoneNum") +
        "&password=" +
        sessionStorage.getItem("password");

      const particulars = await axios.post(particularsurl);
      console.log("Particulars " + particulars);
      const userid = particulars.data.user_id;

      const addressurl =
        "http://localhost:5000/api/address?user_id=" +
        userid +
        "&address_num=1" +
        "&address_1=" +
        sessionStorage.getItem("add1") +
        "&address_2=" +
        sessionStorage.getItem("add2") +
        "&city=" +
        sessionStorage.getItem("city") +
        "&state=" +
        sessionStorage.getItem("state") +
        "&postal_code=" +
        sessionStorage.getItem("postal") +
        "&is_billing_address=" +
        true;

      const address = await axios.post(addressurl);
      console.log("Address " + address);

      const clothingurl =
        "http://localhost:5000/api/clothing_preference?user_id=" +
        userid +
        "&height=" +
        height +
        "&weight=" +
        weight +
        "&top_fit=" +
        top +
        "&bottoms_fit=" +
        bottom +
        "&shoulder_width=" +
        shoulder +
        "&hip=" +
        hip +
        "&waist=" +
        waist;

      const clothing = await axios.post(clothingurl);
      console.log("Clothing " + clothing);
      const token = clothing.data.token;
      
      // Store the token in sessionStorage
      sessionStorage.setItem("userId", userid)
      sessionStorage.setItem("token", token);

      toast.success("You have successfully registered!");

      window.location.href = "/";
    } 
      catch (error) {
        console.error(error);
        toast.error;
    }
  };

  return (
    <div className="py-16 ">
      <div className="flex justify-center mb-10 mt-8">
        <span className="text-2xl uppercase tracking-[2.4px]">Sign Up</span>
      </div>
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Personal Particulars</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="flex items-center text-black">Address</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="text-black">Clothing Preference</div>
      </div>

      <div className="flex justify-center">
        <div className="text-sm mx-10 w-full max-w-sm">
          <div className="text-center pb-5">
            Give us your details and we'll give you an estimated size when you
            are shopping
          </div>

          <div className="p-2">
            <div className="flex flex-cols items-center">
              <p className="me-2 inline-block align-middle w-40">Height</p>
              <input
                type="number"
                name="height"
                id="height"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <select
                name="height"
                className="focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              >
                {heightArr.map((heightMeasurement, index) => (
                  <option
                    key={index}
                    value={heightMeasurement}
                    className="text-sm"
                  >
                    {heightMeasurement}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-500">{heightValidation}</p>
          </div>

          <div className="p-2">
            <div className="flex flex-cols items-center">
              <p className="me-2 inline-block align-middle w-40">Weight</p>
              <input
                type="number"
                name="weight"
                id="weight"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <select
                name="weight"
                className="focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              >
                {weightArr.map((weightMeasurement, index) => (
                  <option
                    key={index}
                    value={weightMeasurement}
                    className="text-sm"
                  >
                    {weightMeasurement}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-500">{weightValidation}</p>
          </div>

          <div className="p-2">
            <div className="flex flex-cols items-center">
              <p className="me-2 inline-block align-middle w-40">Shoulder</p>
              <input
                type="number"
                name="shoulder"
                id="shoulder"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <select
                name="shoulder"
                className="focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              >
                {threeArr.map((shoulderMeasurement, index) => (
                  <option
                    key={index}
                    value={shoulderMeasurement}
                    className="text-sm"
                  >
                    {shoulderMeasurement}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-500">{shoulderValidation}</p>
          </div>

          <div className="p-2">
            <div className="flex flex-cols items-center">
              <p className="me-2 inline-block align-middle w-40">Waist</p>
              <input
                type="number"
                name="waist"
                id="waist"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <select
                name="waist"
                className="focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              >
                {threeArr.map((waistMeasurement, index) => (
                  <option
                    key={index}
                    value={waistMeasurement}
                    className="text-sm"
                  >
                    {waistMeasurement}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-500">{waistValidation}</p>
          </div>

          <div className="p-2">
            <div className="flex flex-cols items-center">
              <p className="me-2 inline-block align-middle w-40">Hip</p>
              <input
                type="number"
                name="hip"
                id="hip"
                className="outline-none border border-midgrey border-1 w-full h-7 p-2 me-2 focus:ring-0 focus:border-grey focus:border-1"
              />
              <select
                name="hip"
                className="focus:outline-none border border-midgrey border-1 w-24 p-0 text-xs px-2 h-7 ms-2 focus:ring-0 focus:border-grey focus:border-1"
              >
                {threeArr.map((hipMeasurement, index) => (
                  <option
                    key={index}
                    value={hipMeasurement}
                    className="text-sm"
                  >
                    {hipMeasurement}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-500">{hipValidation}</p>
          </div>

          <div className="text-center py-5">
            How would you like your clothes to fit you?
          </div>

          <div className="p-2">
            <div className="flex flex-cols">
              <p className="me-2 inline-block w-28">Tops</p>
              <div className="w-full">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={topsSliderValue}
                  step="1"
                  onChange={handleTopsSliderChange}
                  className="slider w-full h-1 accent-black bg-grey rounded-md"
                />
                {topsSliderValue == 1 && (
                  <p className="text-start py-2">Tight</p>
                )}
                {topsSliderValue == 2 && (
                  <p className="text-center py-2">Normal</p>
                )}
                {topsSliderValue == 3 && <p className="text-end py-2">Loose</p>}
              </div>
            </div>
          </div>

          <div className="p-2">
            <div className="flex flex-cols">
              <p className="me-2 inline-block w-28">Bottoms</p>
              <div className="w-full">
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={bottomsSliderValue}
                  step="1"
                  onChange={handleBottomsSliderChange}
                  className="slider w-full h-1 accent-black bg-grey rounded-md"
                />
                {bottomsSliderValue == 1 && (
                  <p className="text-start py-2">Tight</p>
                )}
                {bottomsSliderValue == 2 && (
                  <p className="text-center py-2">Normal</p>
                )}
                {bottomsSliderValue == 3 && (
                  <p className="text-end py-2">Loose</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-cols justify-center">
        <Link href="/signup/address" className="m-4">
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black bg-black text-white">
            <div className="uppercase flex items-center justify-center">
              Back
            </div>
          </button>
        </Link>

        <div
          // href="/"
          className="m-4"
          onClick={validation}
        >
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">
              Sign Up
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
