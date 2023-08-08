"use client";
import React, { FC } from "react";
import Image from "next/image";

interface PaymentLogoProps {
  imageUrl: string;
  bgColour: string;
}

const PaymentLogo: FC<PaymentLogoProps> = ({ imageUrl, bgColour }) => {
  const containerStyles = {
    backgroundColor: bgColour,
  };
  return (
    <div
      className="w-10 h-7 rounded-md flex items-center justify-center mx-1"
      style={containerStyles}
    >
      <img src={imageUrl} alt="logo" className="w-8 h-auto" />
    </div>
  );
};

export default PaymentLogo;
