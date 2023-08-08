"use client";
import React, { useEffect, useState } from "react";
import CartItem from "../_components/CartItem";
import Link from "next/link";
import CartItemSmViewport from "../_components/CartItemSmViewport";
import { CheckCircleFill } from "react-bootstrap-icons";
import axios from "axios";

export default function Page() {
  const [numOfItems, setNumOfItems] = useState(-1);
  const [cartArr, setCartArr] = useState([]);
  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      const userId = sessionStorage.getItem("userId");
      console.log(userId);

      if (userId == "0") {
        setNumOfItems(0);
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart/" + userId
        );
        setNumOfItems(response.data.length);
        setCartArr(response.data);

        //get product details
        for (const item of response.data) {
          const productId = item["product_id"];
          console.log(productId);
          try {
            const response = await axios.get(
              "http://localhost:5000/api/product/" + productId
            );
            setProductArr((prevProductArr) => [
              ...prevProductArr,
              response.data,
            ]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromBackend();
  }, []);

  const getTotal = () => {
    var tempTotal = 0;
    if (productArr.length != 0) {
      for (var i = 0; i < productArr.length; i++) {
        const price = productArr[i]["price"];
        console.log(cartArr[i]["quantity"] + "---");
        const quantity = cartArr[i]["quantity"];
        console.log(quantity);
        tempTotal += price * quantity;
      }
    }
    return tempTotal;
  };

  const [total, setTotal] = useState(getTotal());

  useEffect(() => {
    const currTotal = getTotal();
    setTotal(currTotal);
    sessionStorage.setItem("totalAmount", currTotal.toString());
  }, [productArr]);

  return (
    <div className="py-16 px-8">
      <div className="md:flex">
        <div className="text-2xl uppercase tracking-[2.4px] mb-10 mt-8 hidden md:flex">
          Cart
        </div>

        {/* Progress bar */}
        <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base md:absolute md:left-1/2 md:transform md:-translate-x-1/2 pb-5">
          <div>Cart</div>

          <div className="flex items-center">
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
            <CheckCircleFill className="text-midgrey" />
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          </div>

          <div className="flex items-center text-midgrey">Shipping</div>

          <div className="flex items-center">
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
            <CheckCircleFill className="text-midgrey" />
            <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          </div>

          <div className="text-midgrey">Payment</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-9">
        <div className="col-span-2 mb-6">
          <div className={numOfItems > 0 ? "grid" : "hidden"}>
            <div className="uppercase text-lg mb-8">
              Item Summary ({numOfItems})
            </div>
            <div className="grid grid-cols-7 gap-4 mb-6 hidden sm:grid">
              <div className="col-span-3">Item Details</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Subtotal</div>
              <div></div>
            </div>
            {/* change to for loop */}
            <div className="hidden sm:grid">
              {productArr.map((item, index) => (
                <CartItem
                  key={index}
                  productArr={productArr}
                  rentalArr={cartArr}
                  productJson={item}
                  rentalJson={cartArr[index]}
                  total={total}
                  setTotal={setTotal}
                />
              ))}
            </div>

            <div className="sm:hidden">
              {productArr.map((item, index) => (
                <CartItemSmViewport
                  key={index}
                  productJson={item}
                  rentalJson={cartArr[index]}
                  total={total}
                  setTotal={setTotal}
                />
              ))}
            </div>
          </div>

          <div className={numOfItems == 0 ? "flex flex-col mt-5" : "hidden"}>
            Your rental cart is currently empty.
            <Link href="/rent" className="my-4">
              <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                <div className="uppercase flex items-center justify-center">
                  Rent
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="border border-grey border-1 p-5">
            <div className="uppercase text-lg mb-8">Order Summary</div>
            <div className="text-sm">
              <div className="flex flex-cols justify-between mb-5">
                <div>Subtotal</div>
                <div>{total} SGD</div>
              </div>
              <div className="flex flex-cols justify-between mb-5 ">
                <div>Discount</div>
                <div>-0.00 SGD</div>
              </div>
              <div className="flex flex-cols justify-between mb-5 ">
                <input
                  type="text"
                  name="voucher"
                  placeholder="Enter Voucher Code"
                  className="focus:border-grey focus:border focus:ring-0 text-sm w-full border-[1px] me-3"
                />
                <div className="">
                  <button className="box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                    <div className="uppercase flex items-center justify-center">
                      Add
                    </div>
                  </button>
                </div>
              </div>
              <hr className="my-7" />
              <div className="flex flex-cols justify-between my-5 ">
                <div className="uppercase">Total</div>
                <div>{total} SGD</div>
              </div>
            </div>
            <Link
              href="/order/shipping-details"
              className="flex justify-center mt-4 text-base"
            >
              <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                <div className="uppercase flex items-center justify-center">
                  Checkout
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
