"use client";
import React from "react";
import { Facebook, Instagram, Pinterest, Youtube } from "react-bootstrap-icons";
import { BsCCircle } from "react-icons/bs";

const Footer = () => {
  const dummyUrl = "http://54.179.80.139:3000/404"; // Replace with a valid 404 URL
  return (
    <div className="bg-white p-8 z-50 border-t border-grey border-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="pb-5">
          <div className="text-darkgrey py-2 uppercase">About</div>
          <a href={dummyUrl}>
          <div className="py-2">About Us</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Contact Us</div>
          </a>
        </div>
        <div className="pb-5">
          <a href={dummyUrl}>
          <div className="text-darkgrey py-2 uppercase">Customer Care</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Terms & Conditions</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Return & Delivery Information</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Track your Orders</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Privacy Policy</div>
          </a>
        </div>
        <div className="pb-5">
        <a href={dummyUrl}>
          <div className="text-darkgrey py-2 uppercase">Find Us</div>
        </a>
          <div className="flex py-2">
          <a href={dummyUrl} className="me-6">
            <Facebook />
          </a>
          <a href={dummyUrl} className="me-6">
            <Instagram />
          </a>
          <a href={dummyUrl} className="me-6">
            <Pinterest />
          </a>
          <a href={dummyUrl}>
            <Youtube />
          </a>
          </div>
        </div>
        <div className="pb-5">
            <div className="text-darkgrey py-2 uppercase">Newsletter</div>
            <div className="py-2">Sign up for 10% on your next order *</div>
          <input
            type="text"
            placeholder="Enter your email address"
            className="p-2 focus:border-grey focus:border focus:ring-0 my-2 text-sm w-full border-grey border"
          />
          <button className="box-border text-sm my-2 py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
          <a href={dummyUrl}>
            <div className="uppercase flex items-center justify-center">
              Subscribe
            </div>
          </a>
          </button>
        </div>
      </div>
      <div className="flex mt-10">
        <span className="flex items-center pe-3">
          <BsCCircle />{" "}
        </span>
        <span className="text-xs uppercase text-center">
          {" "}
          2023 to the closet
        </span>
      </div>
    </div>
  );
};

export default Footer;
