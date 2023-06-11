import type { NextPage } from "next";
import product1 from "../_images/product1.jpg";
import { HeartFill } from 'react-bootstrap-icons';

type CardProps = {
  name: string;
  brand: string;
  price: string;
};

const imageUrl = product1.src;
const Card: NextPage<CardProps> = ({ name, brand, price }) => {
  return (
  
      <div className="w-[300px] h-[450px] mb-40">
        <img src={imageUrl}></img>
        <div className="my-2 font-semibold font-lato">
          {brand}
        </div>
        <div className="text-slate-500 font-lato">
          {name}
        </div>
        <div className="text-slate-500 font-lato">
          {price}
        </div>
        <div className="flex items-center justify-between">
          <div className="my-2 box-border py-3 px-6 border-[1px] w-150px] tracking-[1.5px] flex border-solid border-black">
            <div className="uppercase flex items-center justify-center">
              Add to cart
            </div>
          </div>
          <HeartFill  size={24} />
        </div>


          
        

      </div>
  
  );
};

export default Card;
