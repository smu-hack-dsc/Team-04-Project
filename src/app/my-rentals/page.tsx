"use client"
import React from "react"
import { useEffect, useState } from "react"
import RentalCard from "../_components/RentalCard"
import axios from 'axios';
import { renderToHTML } from "next/dist/server/render";

export default function Page() {

  const [pastRentalOpen, setPastRentalOpen] = useState(false)
  const handlePastRental = () => {
    setPastRentalOpen(!pastRentalOpen)
  }
  const [productArr, setProductArr] = useState([]);
  const [rentalArr, setRentalArr] = useState([]);
  const [deliveryArr, setDeliveryArr] = useState([]);
  
  useEffect(() => {
    const fetchDataFromBackend = async () => {
      const userId = sessionStorage.getItem("userId");
      console.log(userId);
      try {
        const response = await axios.get('http://localhost:5000/api/rental/' + userId);
        setRentalArr(response.data);

        //get product details
        for (const item of response.data) {
          const deliveryId = item["delivery_id"]
          const deliveryStatus = item["delivery_id"]["delivery_status"]
          console.log(deliveryId);
          const productId = item["product_id"]
          console.log(productId);
          
          try {
            const response = await axios.get('http://localhost:5000/api/delivery/' + deliveryId);
            setDeliveryArr(prevDeliveryArr => [...prevDeliveryArr, response.data]);
            const response1 = await axios.get('http://localhost:5000/api/product/' + productId);
            setProductArr(prevProductArr => [...prevProductArr, response1.data]);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDataFromBackend();
  }, []);

  const getDeliveryStatus = (index) => {
    return "delivered";
    return deliveryArr[index]["delivery_id"];
  }

  const getCurrentDate = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const current = new Date();
    const date = `${current.getUTCDate()} ${months[current.getUTCMonth()]} ${current.getUTCFullYear()}`;

    return date;
  }

  const isOngoing = (index) => {
    return rentalArr[index]["is_ongoing"]
  }

  return (
    <div className="py-16 px-8">
      <div className='text-2xl uppercase tracking-[2.4px] mb-10 mt-8'>My Rentals</div>

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

      {/* ongoing rental tab */}
      <div className={
        pastRentalOpen
          ? "hidden"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      }>
        {/* <p>Json{deliveryArr.length}</p> */}
        {productArr.map((item, index) => (
          <RentalCard key={index} productArr={productArr} rentalArr={rentalArr} productJson={item} rentalJson={rentalArr[index]} deliveryJson={deliveryArr[index]} deliveryStatus={getDeliveryStatus(index)} deliveryDate={getCurrentDate()} isOngoing = {isOngoing(index)} />
        ))}
      </div>

      {/* past rental tab */}
      <div className={
        pastRentalOpen 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          : "hidden"
      }>
       {productArr.map((item, index) => (
          <RentalCard key={index} productArr={productArr} rentalArr={rentalArr} productJson={item} rentalJson={rentalArr[index]} deliveryJson={deliveryArr[index]} deliveryStatus={getDeliveryStatus(index)} deliveryDate={getCurrentDate()} isOngoing = {!isOngoing(index)} />
        ))}
      </div>
    </div>
  )
}