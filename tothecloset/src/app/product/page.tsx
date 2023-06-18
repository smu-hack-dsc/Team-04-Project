'use client'
import product1 from "../_images/product1.jpg";
import React from 'react';
import WishlistCard from "../_components/wishlistCard";

const imageUrl = product1.src;

const ProductPage: React.FC = () => {
  const wishlistItems = [
    // List of items in your wishlist
    // Each item can have its own properties like name, brand, price, etc.
    { id: 1, name: "Item 1", brand: "Brand 1", price: "69.90 SGD" },
    { id: 2, name: "Item 2", brand: "Brand 2", price: "79.90 SGD" },
    { id: 3, name: "Item 3", brand: "Brand 3", price: "89.90 SGD" },
  ];
  const colours = ["Black", "Gray", "Brown"]
  const size = ["S", "M", "L"]
  const rentalperiod = ["4 Days", "8 Days", "12 Days", "16 Days"]
  // const products = [
  //   {
  //     id: 1,
  //     name: "Item 1",
  //     brand: "Brand 1",
  //     price: "69.90 SGD",
  //     colour: ["Black", "Gray", "Brown"],
  //     size: ["S", "M", "L"],
  //     rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
  //   },
  //   {
  //     id: 2,
  //     name: "Item 2",
  //     brand: "Brand 2",
  //     price: "79.90 SGD",
  //     colour: ["Black", "Red", "Blue"],
  //     size: ["S", "M", "L"],
  //     rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
  //   },
  //   {
  //     id: 3,
  //     name: "Item 3",
  //     brand: "Brand 3",
  //     price: "89.90 SGD",
  //     colour: ["Black", "Red", "Blue"],
  //     size: ["S", "M", "L"],
  //     rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
  //   },
  //   {
  //     id: 4,
  //     name: "Item 4",
  //     brand: "Brand 4",
  //     price: "99.90 SGD",
  //     colour: ["Black", "Red", "Blue"],
  //     size: ["S", "M", "L"],
  //     rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
  //   },
  //   {
  //     id: 5,
  //     name: "Item 5",
  //     brand: "Brand 5",
  //     price: "99.90 SGD",
  //     colour: ["Black", "Red", "Blue"],
  //     size: ["S", "M", "L"],
  //     rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
  //   },
  //   // Add more attributes as needed
  // ];

  // const selectedProduct = products.find((product) => product.id === 1);

  return (

<section className="py-12 sm:py-16"> 
<div className="container mx-auto px-4">
  <div className="px-4 lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
    <div className="lg:col-span-3 lg:row-end-1">
      <div className="lg:flex lg:items-start">
        <div className="lg:order-2 lg:ml-5">
          <div className="mx-auto max-w-xl overflow-hidden">
            <img className="h-full w-full max-w-full object-cover" src={imageUrl} alt="" />
          </div>
        </div>

        <div className="w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
          <div className="flex flex-row lg:items-start justify-center lg:flex-col">
            <button type="button" className="flex-0 aspect-square mb-1 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
              <img className="h-full w-full object-cover" src={imageUrl} alt="" />
            </button>
            <button type="button" className="flex-0 aspect-square mb-1 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
              <img className="h-full w-full object-cover" src={imageUrl} alt="" />
            </button>
            <button type="button" className="flex-0 aspect-square mb-1 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
              <img className="h-full w-full object-cover" src={imageUrl} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
      <h1 className="sm: text-2xl text-gray-900 sm:text-3xl uppercase">Item Name Here</h1>

      <div className="my-2 flex items-center">
        <p className="text-xl font-medium text-gray-500">69.90 SGD</p>
      </div>

      <hr className="mt-3"></hr>

      <h2 className="mt-4 text-base text-gray-900">Colour:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {colours.map((colourName, index) => (
              <button className="box-border px-1 w-150px flex border-solid border-white">
                <div className="w-4 h-4 mr-1 mt-0.5" style={{ backgroundColor: colourName }}></div>
                <span className="font-normal text-sm">{colourName}</span>
              </button>
            ))} 
      </div>

      <h2 className="mt-4 text-base text-gray-900">Size:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {size.map((sizeName, index) => (
                <button
                  key={index}
                  className="box-border py-1 px-3 border-[1px] flex border-solid border-black">
                  <span className="font-normal text-sm">{sizeName}</span>
                </button>
              ))}
      </div>

      <h2 className="mt-4 text-base text-gray-900">Rental Period:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {rentalperiod.map((rentalperiodName, index) => (
                <button
                  key={index}
                  className="box-border py-1 px-4 border-[1px] flex border-solid border-black">
                  <span className="font-normal text-sm">{rentalperiodName}</span>
                </button>
              ))}
      </div>

      <h2 className="mt-4 text-base text-gray-900">Delivery:</h2>
      <div className="mt-3 flex flex-wrap items-center gap-1">
        <button className="box-border py-1 px-2 border-[1px] w-150px flex border-solid border-black">
              <input type="date"></input>
        </button>
      </div>

      <h2 className="mt-4 text-base text-gray-900">Return Date:</h2>
      <div className="mt-2 flex select-none flex-wrap items-center gap-1 font-bold">
        DD/MM/YY
      </div>

      <div className="mt-3 flex flex-wrap justify-center items-center gap-1">
        <button className="my-2 box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">Add to cart</div>
        </button>
      </div>
    </div>
  </div>
</div>

<hr></hr>
<div className="flex justify-center mt-4">
  <div className="text-center">Complete your look</div>
</div>

      <div className="mx-auto py-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="">
              <WishlistCard name={item.name} brand={item.brand} price={item.price} />
            </div>
          ))}
        </div>
      </div> 



   
</section>

   
  );
};

export default ProductPage;
