"use client";
import React, { FC, useState, useEffect } from "react";
import { Plus, Dash, Trash3 } from "react-bootstrap-icons";
import axios from "axios";

interface CartItemSmViewportProps {
  productJson: Object;
  rentalJson: Object;
  total: number;
  setTotal: (value: number) => void;
}

const CartItemSmViewport: FC<CartItemSmViewportProps> = ({
  productJson,
  rentalJson,
  total,
  setTotal,
}) => {
  console.log(productJson["image_url"]);

  function formatDate(dateString: string): string {
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
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  }

  const updateDbQty = async () => {
    try {
      const productId = productJson["product_id"];
      const response = await axios.put(
        "http://13.212.68.5:5000/api/cart/quantity/" +
          userId +
          "/" +
          productId +
          "/" +
          count
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const userId = sessionStorage.getItem("userId");

  const [count, setCount] = useState(rentalJson["quantity"]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    updateDbQty();
    const prevSubtotal = subtotal;
    const newSubtotal = productJson["price"] * count;
    setSubtotal(newSubtotal);
    setTotal(total + (newSubtotal - prevSubtotal));
  }, [count]);

  const [subtotal, setSubtotal] = useState(productJson["price"] * count);

  const [showTrash, setShowTrash] = useState(false);

  const handleMouseEnter = () => {
    setShowTrash(true);
  };

  const handleMouseLeave = () => {
    setShowTrash(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://13.212.68.5:5000/api/cart/" +
          userId +
          "/" +
          productJson["product_id"]
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="my-5 w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between flex-row">
        <div className="flex flex-row">
          <img
            src={productJson["image_url"][0]}
            alt="product image"
            className="w-24 object-cover"
          />
          <div className="ps-5 flex items-center">
            <div>
              <p className="uppercase text-sm">{productJson["brand"]}</p>
              <p className="text-xs text-midgrey mt-2">
                {productJson["product_name"]}
              </p>
              <p className="text-xs text-midgrey mt-2">
                Colour: {productJson["colour"]}
              </p>
              <p className="text-xs text-midgrey mt-2">
                Size: {productJson["size"]}
              </p>
              <p className="text-xs text-midgrey mt-2">
                Rental Period: {formatDate(rentalJson["rental_start"])} -{" "}
                {formatDate(rentalJson["rental_end"])}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center ms-3">
          <div className="text-sm flex justify-center mb-5">
            {productJson["price"]} SGD
          </div>
          <div className="flex mb-5 items-center">
            <Dash onClick={decrement} />
            <span className="mx-2">{count}</span>
            <Plus onClick={increment} />
          </div>
          {/* <div className='text-sm flex items-center justify-center'>
                        {subtotal} SGD
                    </div> */}
        </div>
        <div
          onClick={handleDelete}
          className={
            showTrash ? "flex justify-center items-center visible" : "invisible"
          }
        >
          <Trash3 />
        </div>
      </div>
    </div>
  );
};

export default CartItemSmViewport;
