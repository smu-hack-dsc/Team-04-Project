import type { NextPage } from "next";

type CardProps = {
  name: string;
  brand: string;
  price: string;
};

const Card: NextPage<CardProps> = ({ name, brand, price }) => {
  return (
    <div className="w-[200px] h-[400px] text-left text-xs text-dimgray font-lato mr-4 mb-4">
    <div className="top-[50px] mr-40 my-3 bg-gainsboro w-[200px] h-[300px]" />
      <div className="leading-[20px] flex items-center">
        {name}
      </div>
      <b className="leading-[20px] flex text-black items-center">
        {brand}
      </b>
      <div className="leading-[20px] flex items-center">
        {price}
      </div>
      <div className="box-border w-[121px] h-[33px] flex flex-row py-2.5 px-5 items-start justify-start text-center text-2xs text-black border-[1px] border-solid border-black">
        <div className="bg-white w-[83px] h-[13px] z-[0]" />
        <div className="uppercase flex items-center justify-center w-[83px] h-[13px] shrink-0 z-[1]">
          Add to cart
        </div>
      </div>
    </div>
  );
};

export default Card;
