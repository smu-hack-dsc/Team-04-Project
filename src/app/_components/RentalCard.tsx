"use client";
import React, { FC } from "react";
import Link from "next/link";
import { BoxSeam } from "react-bootstrap-icons"; //packing
import { Truck } from "react-bootstrap-icons"; //delivering
import { Check2Circle } from "react-bootstrap-icons"; //delivered
import { ArrowReturnLeft } from "react-bootstrap-icons"; //returned
import { ChevronRight } from "react-bootstrap-icons";
import axios from "axios";

interface RentalCardProps {
  productJson: object;
  rentalJson: object;
  deliveryStatus: string | null; //packing OR delivering OR delivered OR returned
  deliveryDate: string;
}

const RentalCard: FC<RentalCardProps> = ({
  productJson,
  rentalJson,
  deliveryStatus,
  deliveryDate,
}) => {
  if (typeof deliveryStatus === "string") {
    deliveryStatus = deliveryStatus.toLowerCase();
  }

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

  return (
    <div>
      <div className="border border-grey border-1">
        <div className="border-b border-grey border-1 flex flex-cols justify-between">
          <div className="items-center flex justify-center px-7">
            {deliveryStatus == "packing" && <BoxSeam size={30} />}
            {deliveryStatus == "on the way" && <Truck size={30} />}
            {deliveryStatus == "delivered" && <Check2Circle size={30} />}
            {deliveryStatus == "returned" && <ArrowReturnLeft size={30} />}
          </div>
          <div className="p-3">
            {deliveryStatus == "packing" && <p>Packing</p>}
            {deliveryStatus == "on the way" && <p>On the way</p>}
            {deliveryStatus == "delivered" && <p>Delivered</p>}
            {deliveryStatus == "returned" && <p>Returned</p>}
            <p className="text-sm text-midgrey">on {deliveryDate} </p>
          </div>
          <div className="flex justify-center p-3">
            <Link href="" className="">
              <button className="box-border text-sm py-2 px-5 border-[1px] tracking-[1px] flex border-solid border-black hover:bg-black hover:text-white">
                <div className="uppercase text-xs flex items-center justify-center">
                  {deliveryStatus == "packing" && (
                    <span>
                      Track
                      <br />
                      order
                    </span>
                  )}
                  {deliveryStatus == "on the way" && (
                    <span>
                      Track
                      <br />
                      order
                    </span>
                  )}
                  {deliveryStatus == "delivered" && (
                    <span>
                      Request
                      <br />
                      Return
                    </span>
                  )}
                  {deliveryStatus == "returned" && (
                    <span>
                      Rent
                      <br />
                      Again
                    </span>
                  )}
                </div>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-cols justify-between">
          <div className="p-3 flex items-center">
            <img
              src={productJson["image_url"][0]}
              alt="product image"
              className="w-24 object-cover"
            />
            <div className="px-5">
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
            </div>
          </div>
          <div className="flex items-center justify-end p-3 ">
            <ChevronRight size={20} />
          </div>
        </div>
        <div className="border-t border-grey border-1 p-3 flex items-center justify-center">
          <div className="text-xs">
            Rental Period: {formatDate(rentalJson["rental_start"])} -{" "}
            {formatDate(rentalJson["rental_end"])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
