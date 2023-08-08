"use client";
import React, { useEffect, useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import Link from "next/link";
import Image from "next/image";
import PaymentLogo from "@/app/_components/PaymentLogo";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
declare global {
  interface Window {
    paypal: any;
  }
}

const Page = () => {
  // console.log("SECRET_KEY:", process.env.SECRET_KEY);
  // console.log(process.env);
  const SECRET_KEY =
    "q9grv7k_5P07NZ7pz2k2r3wonSbNF2tJgTNf5zVaj9mHvrD_3H4aKGeOZq0yKpgv";
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    // Check if the user token exists in session storage
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    // Update the state with the user token
    setUserToken(token);
    console.log("user token:", userToken);
  }, []);

  const decodeToken = (token) => {
    try {
      if (!token) {
        console.error("Token is undefined or null.");
        return null;
      }

      // Access the secret key from the environment variables or hardcoded value
      const secretKey =
        SECRET_KEY ||
        "q9grv7k_5P07NZ7pz2k2r3wonSbNF2tJgTNf5zVaj9mHvrD_3H4aKGeOZq0yKpgv";
      console.log("secret_key", secretKey);

      // Decode the token using the provided secret key
      const decodedToken = jwt.verify(token, secretKey);
      console.log("userinfo:", decodedToken.user_id);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const [cardholderName, setCardholderName] = useState("");
  const [paymentType, setPaymentType] = useState("creditCard"); // Default to credit card payment
  const [cardholderNameValidation, setcardholderNameValidation] = useState("");
  const [creditCardValidation, setCreditCardValidation] = useState("");
  const [expiryValidation, setExpiryValidation] = useState("");
  const [cvcValidation, setCvcValidation] = useState("");
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const handlePaymentTypeChange = (event) => {
    const newPaymentType = event.target.value;
    setPaymentType(newPaymentType);
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(parseFloat(sessionStorage.getItem("totalAmount")));
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent form submission
    const cardNumberElement = document.getElementsByName(
      "cardNumber"
    )[0] as HTMLInputElement;
    const expiryElement = document.getElementsByName(
      "expiry"
    )[0] as HTMLInputElement;
    const cvcElement = document.getElementsByName("cvc")[0] as HTMLInputElement;
    const cardholderNameElement = document.getElementsByName(
      "cardholderName"
    )[0] as HTMLInputElement;

    var errors = 0;
    // Decode the user token to get the user ID
    const decodedToken = decodeToken(userToken);
    const userId = decodedToken ? decodedToken.user_id : null;

    if (cardholderNameElement.value.trim() === "") {
      setcardholderNameValidation("ⓘ Cardholdername  cannot be empty.");
      errors += 1;
    } else {
      setcardholderNameValidation("");
    }

    if (paymentType === "creditCard") {
      if (cardNumberElement.value.trim() === "") {
        setCreditCardValidation("ⓘ Credit Card Number cannot be empty.");
        errors += 1;
      } else {
        setCreditCardValidation("");
      }

      if (expiryElement.value.trim() === "") {
        setExpiryValidation("ⓘ Expiry cannot be empty.");
        errors += 1;
      } else {
        setExpiryValidation("");
      }

      if (cvcElement.value.trim() === "") {
        setCvcValidation("ⓘ CVC cannot be empty.");
        errors += 1;
      } else if (cvcElement.value.trim().length !== 3) {
        setCvcValidation("ⓘ CVC should be 3 digits.");
        errors += 1;
      } else {
        setCvcValidation("");
      }
    }

    // If there are no errors, proceed to the next step
    if (errors === 0) {
      if (paymentType === "creditCard") {
        const paymentData = {
          user_id: decodedToken.user_id,
          cardholder_name: cardholderName,
          card_number: cardNumberElement.value.trim(),
          cvc: cvcElement.value.trim(),
          expiry_year: expiryElement.value.trim().split("/")[1], // Extract the year from the expiry date
          expiry_month: expiryElement.value.trim().split("/")[0], // Extract the month from the expiry date
          is_default: true, // Replace with the actual value for is_default
        };
        console.log("paymentdata:", paymentData);

        try {
          const response = await fetch("http://localhost:5000/api/payment", {
            // ... (your existing fetch configuration)
          });
    
          if (response.ok) {
            // Payment was successful
            const responseData = await response.json();
            console.log("payment response:", responseData);

            // Create transaction data
            const transactionData = {
              user_id: decodedToken.user_id,
              transaction_date: new Date().toISOString(),
              payment_method: "Credit Card",
              payment_amount: total,
              payment_id: responseData.payment_id, // Replace with the actual field name in the response
            };

            try {
              const transactionResponse = await axios.post(
                "http://localhost:5000/api/transaction",
                transactionData
              );

              if (transactionResponse.status === 201) {
                const transactionId = transactionResponse['transactonId']
                console.log("Transaction created:", transactionResponse.data);

                const createDelivery = async (userId) => {
                  const deliveryData = {
                    address_id: 35, // Replace with the actual address ID
                    delivery_date: new Date().toISOString(),
                    delivery_status: 'pending', // Replace with the desired status
                    user_id: userId,
                  };
                
                  try {
                    const response = await axios.post('http://localhost:5000/api/delivery', deliveryData);
                    if (response.status === 201) {
                      const { message, delivery_id } = response.data;
                      console.log(message);
                      console.log('New delivery ID:', delivery_id);
                      // Create rental data
                  const rentalData = {
                    user_id: decodedToken.user_id,
                    product_id: sessionStorage.getItem("productId"),
                    rental_start: sessionStorage.getItem("rental_start"),
                    rental_period: sessionStorage.getItem("rental_period"),
                    rental_end: sessionStorage.getItem("rental_end"),
                    delivery_id: delivery_id,
                    transaction_id: transactionId,
                  };

                  try {
                    const rentalResponse = await axios.post(
                      "http://localhost:5000/api/rental",
                      rentalData
                    );

                    if (rentalResponse.status === 201) {
                      console.log("Rental created:", rentalResponse.data);
                      // Redirect to the confirmation page
                      if (typeof window !== "undefined") {
                        toast.success("Payment, Transaction, and Rental successful!");
                        window.location.href = "/order/confirmation";
                      }
                    } else {
                      console.error("Failed to create rental:", rentalResponse.data);
                      toast.error("Payment and Transaction successful, but rental creation failed.");
                    }
                  } catch (error) {
                    console.error("Error creating rental:", error);
                    toast.error("Payment and Transaction successful, but rental creation failed.");
                  }
                      } else {
                        console.error('Failed to create delivery:', response.data);
                      }
                    } catch (error) {
                      console.error('Error creating delivery:', error);
                    }
                  };
              } else {
                console.error("Failed to create transaction:", transactionResponse.data);
                toast.error("Payment successful, but transaction creation failed.");
              }
            } catch (error) {
              console.error("Error creating transaction:", error);
              toast.error("Payment successful, but transaction creation failed.");
            }
          } else {
            // Handle error response from the server
            const errorData = await response.json();
            console.error("Error:", errorData);
            toast.error("Payment unsuccessful!");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred while processing your payment.");
        }
      }
    };
  };


  return (
    <div className="py-16 px-8">
      <Toaster />
      {/* Progress bar */}
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Cart</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="flex items-center text-black">Shipping</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="text-black">Payment</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-9">
        <div className="col-span-2 mb-6">
          <div>
            <div className="flex items-center">
              <Image
                src="/images/4-circle.svg"
                width={25}
                height={25}
                alt="Icon 4"
                className="mr-2"
              />
              <p className="uppercase">Payment Method</p>
            </div>

            <div className="m-9 text-sm">
              <div className="flex flex-row justify-between">
                <div>
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentType"
                    value="creditCard"
                    className="me-3 focus:ring-0 text-black"
                    checked={paymentType === "creditCard"}
                    onChange={handlePaymentTypeChange}
                  />
                  <label htmlFor="creditCard px-2">Credit Card</label>
                </div>
                <div className="flex">
                  <PaymentLogo
                    imageUrl="/images/MastercardLogo.svg"
                    bgColour="#202A44"
                  />
                  <PaymentLogo
                    imageUrl="/images/VisaLogo.png"
                    bgColour="#e0e0e0"
                  />
                  <PaymentLogo
                    imageUrl="/images/AmericanExpressLogo.jpg"
                    bgColour="#016fd0"
                  />
                </div>
              </div>
              {/* Render credit card input fields directly */}
              {paymentType === "creditCard" && (
                <div className="mx-8 mb-8">
                  <div className="">
                    <p>Cardholder Name</p>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
                    />
                    <p className="text-red-500">{cardholderNameValidation}</p>
                  </div>
                  <div className="py-4">
                    <p>Card Number</p>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 1234 1234 1234"
                      className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
                    />
                    <p className="text-red-500">{creditCardValidation}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <div className="pe-2">
                      <p>Expiry</p>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
                      />
                      <p className="text-red-500">{expiryValidation}</p>
                    </div>
                    <div className="ps-2">
                      <p>CVC</p>
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
                      />
                      <p className="text-red-500">{cvcValidation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
              <hr className="my-7" />
              <div className="flex flex-cols justify-between my-5 ">
                <div className="uppercase">Total</div>
                <div>{total} SGD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-cols justify-center">
        <Link href="/cart" className="m-4">
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black bg-black text-white">
            <div className="uppercase flex items-center justify-center">
              Back
            </div>
          </button>
        </Link>

        <Link href="/order/payment-details" className="m-4">
          <button
            className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black"
            onClick={handlePayment}
          >
            <div className="uppercase flex items-center justify-center">
              Pay Now
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
