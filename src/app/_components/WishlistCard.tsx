'use client'
import { HeartFill } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { useState } from "react";

interface WishlistCardProps {
    product: {
        id: number;
        product_name: string;
        image_url: string;
        brand: string;
        price: string;
        // Add more properties as needed
    };
    }

const WishlistCard: React.FC<WishlistCardProps> = ({ product }) => {
const [unliked, setUnlike] = useState(true); // Initialize as true to start filled
const handleLike = () => {
    setUnlike(!unliked); // Toggle between true and false
    // Perform any actions you want when the heart icon is clicked
};

return (
    <div className="mb-10">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
            src={product.image_url[0]}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            alt={product.product_name}
            />
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
                <div className="uppercase flex items-center justify-center">
                Add to cart
                </div>
            </button>
            </div>
            <div>
            {unliked ? (
                <HeartFill
                size={24}
                onClick={handleLike}
                className="cursor-pointer"
                />
            ) : (
                <Heart
                size={24}
                onClick={handleLike}
                className="cursor-pointer"
                />
            )}
            </div>
        </div>
    </div>
);
};

export default WishlistCard;
