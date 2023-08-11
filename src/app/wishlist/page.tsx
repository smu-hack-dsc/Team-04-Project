"use client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import WishlistCard from "../_components/WishlistCard";
import jwt from "jsonwebtoken";

interface WishlistItem {
  id: number;
}

interface Product {
  id: number;
  product_name: string;
  image_url: string;
  brand: string;
  price: string;
  // Add more properties as needed
}

const WishlistLoggedIn: NextPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [userId, setUserId] = useState(""); // Add this state to store user ID


  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/api/wishlist/${userId}/`)
      .then((response) => {
        console.log("response:", response.data);
        setWishlistItems(response.data); // Update the wishlist items state with the data from the API
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Check if the wishlistItems has the product_id array
        if (!wishlistItems.product_id) {
          return; // If the product_id array is not available, do not make the API call
        }

        // Loop through each product_id in the array and fetch product details
        const productPromises = wishlistItems.product_id.map((productId) =>
          axios.get<Product>(`http://localhost:5000/api/product/${productId}/`)
        );
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.map((response) => response.data);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [wishlistItems]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:max-w-7xl">
      <h1 className="text-2xl uppercase tracking-[2.4px] mb-10 mt-5">
        Wish List
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="">
            <WishlistCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistLoggedIn;
