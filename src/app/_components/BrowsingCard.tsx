"use client";
import { HeartFill, Heart } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import toast from"react-hot-toast"
// import { Link } from "react-router-dom";

type BrowsingCardProps = {
  productId: number; // Add the product ID prop to identify the specific product
};

const BrowsingCard: React.FC<BrowsingCardProps> = ({ productId }) => {
  const [like, setLike] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // Define the Product interface based on your database schema
  interface Product {
    brand: string;
    product_name: string;
    price: string;
    image_url: string[]; // Assuming imageUrls is an array of image URLs
    // Add other properties as needed
  }

  const handleLike = async () => {
    if (sessionStorage.getItem("token")) {
      setLike(true);
      try {
        const response = await axios.post(
          "http://13.212.68.5:5000/api/wishlist" +
            "?user_id=" +
            sessionStorage.getItem("userId") +
            "&product_id=" +
            productId
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("Log in to add to Wishlist");
    }
  };

  const handleUnlike = async () => {
    if (sessionStorage.getItem("token")) {
      setLike(false);
      try {
        const response = await axios.delete(
          "http://13.212.68.5:5000/api/wishlist/" +
            sessionStorage.getItem("userId") +
            "/" +
            productId
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // Fetch product details from the backend using the specific product ID
    axios
      .get(`http://13.212.68.5:5000/api/product/${productId}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });

    if (sessionStorage.getItem("token")) {
      axios
        .get(
          "http://13.212.68.5:5000/api/wishlist/check/" + sessionStorage.getItem("userId") + "/" + productId
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch((error) => {
          setLike(false);
        });
    }
  }, [productId]);

  if (!product) {
    // Handle loading state while waiting for the data to be fetched
    return <Skeleton active />;
  }

  const navigateToProductPage = () => {
    sessionStorage.setItem("selectedProductId", productId.toString());

    // Redirect to the product page
    window.location.href = "/product";
  };

  const navigateToProductPage2 = () => {
    sessionStorage.setItem("selectedProductId", productId.toString());
    sessionStorage.setItem("addToCart", "true")

    // Redirect to the product page
    window.location.href = "/product";
  };

  return (
    <div className="mb-4 ">
      {" "}
      {/* Always show the card */}
      <a href="/product">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          {product.image_url.length > 0 && (
            <img
              src={product.image_url[0]}
              className="w-full h-auto md:w-full h-[21rem]w-full object-cover object-center lg:h-full lg:w-full"
              alt=""
              onClick={navigateToProductPage}
            />
          )}
        </div>
      </a>
      <div className="mt-4 flex justify-between">
        <div className="h-[12rem]">
          <div className="h-[6rem] md:h-[8rem] lg:h-[6rem]">
            <h3 className="mb-1 font-semibold uppercase">
              <a href="#">
                <span aria-hidden="true" className="" />
                {product.brand}
              </a>
            </h3>
            <a href="/product">
              <span className="mt-1 text-slate-500 uppercase">
                {product.product_name}
              </span>
            </a>
            <p className="text-slate-500 font-lato">{product.price} SGD</p>
          </div>
          <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black flex self-end" onClick={navigateToProductPage2}>
            <div className="uppercase flex items-center justify-center">
              Add to cart
            </div>
          </button>
        </div>
        {!like ? (
          <Heart size={24} onClick={handleLike} className="cursor-pointer" />
        ) : (
          <HeartFill
            size={24}
            onClick={handleUnlike}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default BrowsingCard;
