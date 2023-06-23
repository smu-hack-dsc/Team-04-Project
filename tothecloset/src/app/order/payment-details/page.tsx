"use client"; // This is a client component 👈🏽
import Black from '../images/black.png';
import Icon4 from '../images/4-circle.svg';
import { useState } from 'react';
import Mastercard from '../images/mc_symbol.svg';
import Visa from '../images/Visa_Inc._logo.svg.png';
import Paypal from '../images/paypal.svg';
import Apple from '../images/apple-pay-logo-svgrepo-com.svg';
import Stripe from '../images/1024px-Stripe_Logo,_revised_2016.svg.png';
import Amex from '../images/American_Express-Logo.wine.svg';

const Page = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
    setIsInvalidCode(false);
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim() === '') {
      setIsInvalidCode(true);
    } else {
      // Apply the discount code logic here
      console.log('Discount code applied:', discountCode);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}

      {/* Progress bar */}
      <div className="flex items-center justify-center mt-8 mb-12"> {/* Padding adjustment */}
        <div className="flex items-center">
          <div className="w-24 flex-shrink-0 relative flex items-center">
            <p className="text-center text-2xl text-black mt-1">Shipping</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={Black.src} alt="Delivery" className="h-full object-cover absolute" />
              </div>
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
            </div>
            <p className="text-center text-2xl text-black mt-1">Review</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={Black.src} alt="Payment" className="h-full object-cover absolute" />
              </div>
            </div>
            <p className="text-center text-2xl text-black mt-1">Payment</p>
          </div>
        </div>
      </div>

      <section className="mx-40 mt- flex">

        {/* Delivery & Return */}
        <div className="w-1/2 pr-2 pt-4">
          <div className="flex items-center">
            <img src={Icon4.src} alt="Icon 1" className="h-6 w-6 mr-2" />
            <p className="text-2xl">PAYMENT METHOD</p>
          </div>
          
          <div className="flex gap-4">

            {/* Mastercard Payment */}
            <label htmlFor="payment1" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment1" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image"
                  src={Mastercard.src}
                  alt="mastercard"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-small">Pay with Mastercard
                </p>
              </div>
            </label>
          
            {/* Visa Payment */}
            <label htmlFor="payment2" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment2" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image w-20 h-16 sm:w-64 sm:h-full object-center"
                  src={Visa.src}
                  alt="visa"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-medium">Pay with Visa
                </p>
              </div>
            </label>
          </div>


          <div className="flex gap-4">

            {/* Amex Payment */}
            <label htmlFor="payment3" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment3" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image w-20 h-16 sm:w-64 sm:h-full object-center"
                  src={Amex.src}
                  alt="amex"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-medium">Pay with American Express
                </p>
              </div>
            </label>
          
            {/* Apple Pay Payment */}
            <label htmlFor="payment4" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment4" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image w-20 h-16 sm:w-64 sm:h-full object-center"
                  src={Apple.src}
                  alt="applepay"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-medium">Pay with ApplePay
                </p>
              </div>
            </label>
            
          </div>

          <div className="flex gap-4">

            {/* Paypal Payment */}
            <label htmlFor="payment5" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment5" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image w-20 h-16 sm:w-64 sm:h-full object-center"
                  src={Paypal.src}
                  alt="paypal"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-medium">Pay with Paypal
                </p>
              </div>
            </label>
          
            {/* Stripe Payment */}
            <label htmlFor="payment6" className="relative w-full cursor-pointer">
              <input className="peer hidden" type="radio" id="payment6" name="payment" />
              <div className="payment-content flex items-center sm:justify-center p-5 pr-16 sm:p-8 gap-5 h-24 sm:h-40 w-64 bg-white border-2 border-gray-200 rounded-md transition peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:-translate-y-1 mt-8">
                <img
                  className="payment-image w-20 h-16 sm:w-64 sm:h-full object-center"
                  src={Stripe.src}
                  alt="stripe"
                />
                <p className="payment-text static sm:absolute
                    top-full sm:mt-1
                    text-center text-lg sm:text-xl
                    w-auto sm:w-full
                    opacity-70 font-medium">Pay with Stripe
                </p>
              </div>
            </label>
          </div>
          


          {/* Card Number */}
          {paymentMethod === "creditCard" && (
            <div className="flex items-center mt-4 ml-12">
              <label htmlFor="cardNumber" className="text-s">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                className="w-64 py-2 px-3 border border-gray-300"
                placeholder="Enter card number"
              />
            </div>
          )}



        </div>


        {/* Middle Container */}
        <div className="w-1/6 pl-2 pt-4">
        </div>


        {/* Your Order */}
        <div className="flex items-center justify-center mt-0">
          <div className="border border-gray-300 p-8 w-100">
            <h2 className="text-2xl mb-4">YOUR ORDER</h2>

            <div className="flex items-center mb-2">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-lg text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-base text-gray-400 mb-2">Item Detail</p>
                <p className="text-base text-black mb-2">x1</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-lg text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-base text-gray-400 mb-2">Item Detail</p>
                <p className="text-base text-black mb-2">x1</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl mt-4 mb-2">Discount Code</h3>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    className={`w-64 py-2 px-3 border ${
                      isInvalidCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Add discount code"
                    value={discountCode}
                    onChange={handleDiscountCodeChange}
                  />
                  {isInvalidCode && (
                    <p className="text-red-500 text-sm mt-1">Invalid discount code.</p>
                  )}
                </div>
                <button
                  className={`py-2 px-4 ml-2 text-black ${
                    discountCode.trim() !== '' ? 'border border-black' : 'bg-white border border-gray-300 text-gray-300'
                  }`}
                  onClick={handleApplyDiscount}
                  disabled={discountCode.trim() === ''}
                >
                  Apply
                </button>
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-lg text-gray-500">Subtotal</p>
                <p className="text-lg text-gray-500">$$$</p>
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-lg text-gray-500">Discount</p>
                <p className="text-lg text-gray-500">-$$</p>
              </div>

              <div className="flex justify-between mt-4">
                <p className="text-xl">Grand Total</p>
                <p className="text-xl">$$$</p>
              </div>
            </div>

        </div>
      </div>
      </section>
  
      {/* Button */}
      <div className="flex justify-center"> {/* Centering wrapper */}
        <button className="my-2 mt-12 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
          bg-white text-black hover:bg-black hover:text-white mr-12">
          <div className="uppercase flex items-center justify-center">
            Back
          </div>
        </button>

        <button className="my-2 mt-12 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
          bg-white text-black hover:bg-black hover:text-white">
          <div className="uppercase flex items-center justify-center">
            Continue
          </div>
        </button>
      </div>

    </section>
  );
};

export default Page;
