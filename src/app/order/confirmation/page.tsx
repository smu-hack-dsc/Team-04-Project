import React from "react";
import Image from "next/image";
import Link from "next/link"

const Page = () => {
  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}
      <div className="flex items-center justify-center flex-col mt-24">
        <img
          src="/images/shoppingBag.png"
          alt="shoppingBag"
          className="h-14 w-14 mb-5"
        />
      </div>
      <div className="flex items-center justify-center flex-col mt-4">
        <h1 className="text-3xl font-bold text-center">
          Thank you for your order!
        </h1>
        <p className="text-lg text-center text-gray-500 mt-4">
          A confirmation has been sent to your email.
        </p>
      </div>
      {/* Button */}
      <div className="flex justify-center">
        <button
          className="my-2 mt-20 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
          bg-white text-black hover:bg-black hover:text-white"
        >
          <Link href="/">
            <div className="uppercase flex items-center justify-center">
              Back to shopping
            </div>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Page;
