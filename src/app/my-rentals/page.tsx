"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import RentalCard from "../_components/RentalCard";
import axios from "axios";
import { renderToHTML } from "next/dist/server/render";

export default function Page() {
  const [pastRentalOpen, setPastRentalOpen] = useState(false);
  const handlePastRental = () => {
    setPastRentalOpen(!pastRentalOpen);
  };
  const [ongoingProductArr, setOngoingProductArr] = useState([]);
  const [ongoingRentalArr, setOngoingRentalArr] = useState([]);
  const [ongoingDeliveryArr, setOngoingDeliveryArr] = useState([]);

  const [pastProductArr, setPastProductArr] = useState([]);
  const [pastRentalArr, setPastRentalArr] = useState([]);
  const [pastDeliveryArr, setPastDeliveryArr] = useState([]);

  useEffect(() => {
    fetchOngoingDataFromBackend();
    fetchPastDataFromBackend();
  }, []);

  const fetchOngoingDataFromBackend = async () => {
    // const userId = sessionStorage.getItem("userId");
    const userId = sessionStorage.getItem("userId");
    console.log("userId:",userId);
    try {
      const response = await axios.get(
        "http://13.212.68.5:5000/api/rental/ongoing/" + userId
      );
      console.log(response.data);
      setOngoingRentalArr(response.data);

      //get product details
      for (const item of response.data) {
        const deliveryId = item["delivery_id"];
        const productId = item["product_id"];
        try {
          const response1 = await axios.get(
            "http://13.212.68.5:5000/api/delivery/deliveryid/" + deliveryId
          );http://13.212.68.5:5000/
          setOngoingDeliveryArr((prevDeliveryArr) => [
            ...prevDeliveryArr,
            response1.data,
          ]);

          const response2 = await axios.get(
            "http://13.212.68.5:5000/api/product/" + productId
          );
          console.log(response1.data);
          setOngoingProductArr((prevProductArr) => [
            ...prevProductArr,
            response2.data,
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPastDataFromBackend = async () => {
    // const userId = sessionStorage.getItem("userId");
    const userId = 2;
    console.log(userId);
    try {
      const response = await axios.get(
        "http://13.212.68.5:5000/api/rental/past/" + userId
      );
      console.log(response.data);
      setPastRentalArr(response.data);

      //get product details
      for (const item of response.data) {
        const deliveryId = item["delivery_id"];
        const productId = item["product_id"];

        try {
          const response1 = await axios.get(
            "http://13.212.68.5:5000/api/delivery/deliveryid/" + deliveryId
          );
          setPastDeliveryArr((prevDeliveryArr) => [
            ...prevDeliveryArr,
            response1.data,
          ]);

          const response2 = await axios.get(
            "http://13.212.68.5:5000/api/product/" + productId
          );
          console.log(response1.data);
          setPastProductArr((prevProductArr) => [
            ...prevProductArr,
            response2.data,
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCurrentDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const current = new Date();
    const date = `${current.getUTCDate()} ${
      months[current.getUTCMonth()]
    } ${current.getUTCFullYear()}`;

    return date;
  };

  return (
    <div className="py-16 px-8">
      <div className="text-2xl uppercase tracking-[2.4px] mb-10 mt-8">
        My Rentals
      </div>

      <div className="mb-8">
        <span className="me-3" onClick={handlePastRental}>
          Ongoing Rentals
        </span>
        <span className="mx-3" onClick={handlePastRental}>
          Past Rentals
        </span>
        <hr className="w-[255px] mt-2 text-midgrey" />
        {!pastRentalOpen && <hr className="w-[120px] text-black" />}
        {pastRentalOpen && <hr className="w-[110px] ms-[130px] text-black" />}
      </div>

      {/* ongoing rental */}
      <div
        className={
          !pastRentalOpen
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            : "hidden"
        }
      >
        {ongoingProductArr.map((item, index) => (
          <RentalCard
            key={index}
            productJson={item}
            rentalJson={ongoingRentalArr[index]}
            deliveryStatus={ongoingDeliveryArr[index]["delivery_status"]}
            deliveryDate={getCurrentDate()}
          />
        ))}
      </div>

      {/* past rental */}
      <div
        className={
          pastRentalOpen
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            : "hidden"
        }
      >
        {pastProductArr.map((item, index) => (
          <RentalCard
            key={index}
            productJson={item}
            rentalJson={pastRentalArr[index]}
            deliveryStatus={pastDeliveryArr[index]["delivery_status"]}
            deliveryDate={getCurrentDate()}
          />
        ))}
      </div>
    </div>
  );
}
