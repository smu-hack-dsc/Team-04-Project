"use client"
import product1 from "../_images/product1.jpg";

import { Heart } from "react-bootstrap-icons";
import { useState } from "react";

type BrowsingCardProps = {
    name: string;
    brand: string;
    price: string;
};
const imageUrl = product1.src;
const BrowsingCard: React.FC<BrowsingCardProps> = ({ name, brand, price }) => {
    const [unliked, setUnlike] = useState(false)
    const handleLike = () => {
        setUnlike(!unliked)
        //cld do db thing here
    }
    return (
        <div className={
            unliked
            ? "hidden"
            : "mb-10"
        }>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
                src={imageUrl}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            </div>
            <div className="mt-4 flex justify-between">
            <div>
                <h3 className="mb-1 font-semibold uppercase">
                <a href="#">
                    <span aria-hidden="true" className="" />
                    {brand}
                </a>
                </h3>
                <p className="mt-1 text-slate-500">{name}</p>
                <p className="text-slate-500 font-lato">{price}</p>
                <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
                    <div className="uppercase flex items-center justify-center">
                    Add to cart
                    </div>
                </button>
            </div>
            <Heart size={24} onClick={handleLike} className="cursor-pointer"/>
            <Heart size={24} className={
                unliked
                ? ""
                : "hidden"

            }/>
            </div>

        </div>
        
    )

};

export default BrowsingCard;
