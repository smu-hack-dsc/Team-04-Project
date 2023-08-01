"use client"
import { HeartFill, Heart } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from 'antd';

type BrowsingCardProps = {
  productId: number; // Add the product ID prop to identify the specific product
};

const BrowsingCard: React.FC<BrowsingCardProps> = ({ productId }) => {
  const [unliked, setUnlike] = useState(true); // Set unliked to true by default
  const [product, setProduct] = useState<Product | null>(null);

  // Define the Product interface based on your database schema
  interface Product {
    brand: string;
    product_name: string;
    price: string;
    image_url: string[]; // Assuming imageUrls is an array of image URLs
    // Add other properties as needed
  }

  const handleLike = () => {
    setUnlike((prevState) => !prevState); // Toggle the unliked state
    // Add code to perform like/unlike action in the backend if needed
  };

  useEffect(() => {
    // Fetch product details from the backend using the specific product ID
    axios
      .get(`http://localhost:5000/api/product/${productId}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  if (!product) {
    // Handle loading state while waiting for the data to be fetched
    return <Skeleton active />;
  }

  return (
    <div className="mb-10"> {/* Always show the card */}
      <div className="w-full h-auto overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75">
        {/* Use the first image from the imageUrls array */}
        {product.image_url.length > 0 && (
          <img src={product.image_url[0]} className="h-auto w-full object-cover object-center lg:w-full" alt="" />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="mb-1 font-semibold uppercase">
            <a href="#">
              <span aria-hidden="true" className="" />
              {product.brand}
            </a>
          </h3>
          <p className="mt-1 text-slate-500 uppercase">{product.product_name}</p>
          <p className="text-slate-500 font-lato">{product.price} SGD</p>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">Add to cart</div>
          </button>
        </div>
        {unliked ? (
          <Heart size={24} onClick={handleLike} className="cursor-pointer" />
        ) : (
          <HeartFill size={24} onClick={handleLike} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default BrowsingCard;
