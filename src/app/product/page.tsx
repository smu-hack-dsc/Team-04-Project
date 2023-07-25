'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import product1 from "../_images/product1.jpg";
import BrowsingCard from "../_components/BrowsingCard";

const imageUrl = product1.src;

interface Product {
  brand: string;
  colour: string[]; // Change this to string[] if 'colour' is an array of strings
  date_added: string;
  image_url: string;
  price: string;
  product_id: number;
  product_name: string;
  size: string[]; // Change this to string[] if 'size' is an array of strings
  type: string[];
}

const ProductPage: React.FC = () => {
  const rentalperiod = ["4 Days", "8 Days", "12 Days", "16 Days"]
  const wishlistItems = [
    // List of items in your wishlist
    // Each item can have its own properties like name, brand, price, etc.
    { id: 1, name: "Item 1", brand: "Brand 1", price: "69.90 SGD" },
    { id: 2, name: "Item 2", brand: "Brand 2", price: "79.90 SGD" },
    { id: 3, name: "Item 3", brand: "Brand 3", price: "89.90 SGD" },
  ];
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = 5; // Replace 1 with the ID of the product you want to display

    // Fetch product details from the backend using the specific product ID
    axios.get(`http://localhost:8080/api/product/${productId}/`)
      .then((response) => {
        setProduct(response.data); // Update the product state with the data from the backend
        setLoading(false); // Set loading to false once the data is fetched
        console.log('Response data:', response.data)
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Extract colours and sizes arrays from the product data
  const colours = product?.colour || [];
  const sizes = product?.size || [];

  if (loading) {
    return <div>Loading...</div>;
  }
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
      <h1 className="sm: text-2xl text-gray-900 sm:text-3xl uppercase">{product?.product_name}</h1>

      <div className="my-2 flex items-center">
        <p className="text-xl font-medium text-gray-500">${product?.price}</p>
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
      {sizes.map((sizeName, index) => (
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
              <BrowsingCard name={item.name} brand={item.brand} price={item.price} />
            </div>
          ))}
        </div>
      </div> 



   
</section>

   
  );
};

export default ProductPage;
