'use client'
import product1 from "../_images/product1.jpg";
import React from 'react';
import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel-react';

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 4
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const imageUrl = product1.src;

type CardProps = {
  name: string;
  brand: string;
  price: string;
  colour: string[];
  size: string[];
  rentalperiod: string[];
};

const ProductCard: React.FC<CardProps> = ({ name, brand, price, colour, size, rentalperiod }) => {
  return (
    <div className="my-10">
      <div className="justify-center mx-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <div className="flex mx-5 w-auto">
          <div className="flex w-auto">
          <main className="mx-auto my-auto sandbox">
            <section className="sandbox__carousel">
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </section>
          </main>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="my-4">
            <h1 className="text-xl uppercase font-semibold">{name}</h1>
            <p className="text-gray-600 text-xl my-3">{price}</p>
            <hr className="h-px bg-gray-600" />
          </div>

          <h2 className="font-semibold">Colour:</h2>
          <div className="flex flex-row my-2">
            {colour.map((colourName, index) => (
              <button className="box-border px-2 w-150px flex border-solid border-white">
                <div className="w-4 h-4 mr-1 mt-0.5" style={{ backgroundColor: colourName }}></div>
                <span className="font-normal text-sm">{colourName}</span>
              </button>
            ))}
          </div>

          <div className="my-1">
            <h2 className="font-semibold mb-2">Size:</h2>
            <div className="flex flex-wrap space-x-4">
              {size.map((sizeName, index) => (
                <button
                  key={index}
                  className="box-border py-1 px-3 border-[1px] flex border-solid border-black">
                  <span className="font-normal text-sm">{sizeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="my-2">
            <h2 className="font-semibold mb-2">Rental Period:</h2>
            <div className="flex flex-wrap space-x-4">
              {rentalperiod.map((rentalperiodName, index) => (
                <button
                  key={index}
                  className="my-2 box-border py-1 px-4 border-[1px] flex border-solid border-black"
                >
                  <span className="font-normal text-sm">{rentalperiodName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="my-1">
            <h2 className="font-semibold mb-2">Delivery Date:</h2>
            <div className="flex flex-wrap">
              <div>
                <button className="my-2 box-border py-1 px-2 border-[1px] w-150px flex border-solid border-black">
                  <input type="date"></input>
                </button>
              </div>
            </div>
          </div>

          <div className="my-4">
            <h2 className="font-semibold mb-2">Return Date</h2>
            <div className="flex flex-wrap space-x-4">
              <div className="">DD/MM/YY</div>
            </div>
          </div>

          <div className="my-4 flex justify-center">
            <button className="my-2 box-border py-3 px-10 border-[1px] w-150px tracking-[1.5px] flex border-solid border-black">
              <div className="uppercase flex items-center justify-center">Add to cart</div>
            </button>
          </div>
        </div>
      </div>

        <hr className="mt-8 mb-6 mx-auto w-length" />


      <div className="justify-center mx-20 grid grid-cols-3 gap-20 mt-8">
        <div className="col-span-3">
          <h2 className="font-semibold text-center mb-4">Complete your look</h2>
        </div>
        {[...Array(3)].map((_, index) => (
          <div className="items-center flex">
          <img
            key={index}
            src={imageUrl}
            alt={`Product Image ${index + 5}`}
            className="max-w-full h-auto object-contain"
          /></div>
        ))}
      </div>
    </div>
  );
};


export default ProductCard;
