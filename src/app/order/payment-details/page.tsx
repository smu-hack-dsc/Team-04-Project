"use client"; 
import React, {useState} from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import Link from "next/link";
import Image from "next/image";
import PaymentLogo from "@/app/_components/PaymentLogo";
import CreditCardDropDown from "@/app/_components/CreditCardDropDown";

const Page = () => {

  const [creditCardOpen, setCreditCardOpen] = useState(false);

  const handleFocus = () => {
    setCreditCardOpen(true);
  };

  const handleBlur = () => {
    setCreditCardOpen(false);
  };
  
  return (
    <div className="py-16 px-8">

      {/* Progress bar */}
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Shipping</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-black mx-2" />
          <CheckCircleFill className="text-black" />
          <hr className="w-6 inline-block align-middle text-black mx-2" />
        </div>

        <div className="flex items-center text-black">Review</div>

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
              <Image src="/images/4-circle.svg" width ={25} height={25} alt="Icon 4" className="mr-2" />
              <p className="uppercase">Payment Method</p>
            </div>

            <div className="m-9 text-sm">
              <div className="flex flex-row justify-between">
                <div>
                  <input type="radio" id="creditCard" name="paymentType" value="creditCard" className="me-3 focus:ring-0 text-black" onFocus={handleFocus} onBlur={handleBlur}/>
                  <label htmlFor="creditCard px-2">Credit Card</label>
                </div>
                <div className="flex">
                  <PaymentLogo imageUrl="/images/MastercardLogo.svg" bgColour="#202A44"/>
                  <PaymentLogo imageUrl="/images/VisaLogo.png" bgColour="#e0e0e0"/>
                  <PaymentLogo imageUrl="/images/AmericanExpressLogo.jpg" bgColour="#016fd0"/>
                </div>
              </div>
              {/* credit card dropdown */}
              {creditCardOpen && <CreditCardDropDown/>}

              <div className="flex flex-row justify-between mt-5">
                <div>
                  <input type="radio" id="payPal" name="paymentType" value="payPal" className="me-3 focus:ring-0 text-black"/>
                  <label htmlFor="payPal px-2">PayPal</label>
                </div>
                <div className="flex">
                  <PaymentLogo imageUrl="/images/PayPalLogo.png" bgColour="#252525"/>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-5">
                <div>
                  <input type="radio" id="applePay" name="paymentType" value="applePay" className="me-3 focus:ring-0 text-black"/>
                  <label htmlFor="applePay px-2">Apple Pay</label>
                </div>
                <div className="flex">
                  <PaymentLogo imageUrl="/images/ApplePayLogo.svg" bgColour="#888888"/>
                </div>
              </div>
            

            <div className="flex flex-row justify-between mt-5">
                <div>
                  <input type="radio" id="stripe" name="paymentType" value="stripe" className="me-3 focus:ring-0 text-black"/>
                  <label htmlFor="stripe px-2">Stripe</label>
                </div>
                <div className="flex">
                  <PaymentLogo imageUrl="/images/StripeLogo.jpg" bgColour="#6772e5"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border border-grey border-1 p-5">
            <div className="uppercase text-lg mb-8">Order Summary</div>
            <div className="text-sm">
              <div className="flex flex-cols justify-between mb-5">
                <div>Subtotal</div>
                <div>0.00 SGD</div>
              </div>
              <div className="flex flex-cols justify-between mb-5 ">
                <div>Discount</div>
                <div>-0.00 SGD</div>
              </div>
              <hr className="my-7"/>
              <div className="flex flex-cols justify-between my-5 ">
                <div className="uppercase">Total</div>
                <div>0.00 SGD</div>
              </div>
            </div>
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

        <Link href="/order/payment-details" className='m-4'>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
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
