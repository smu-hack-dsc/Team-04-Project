import type { NextPage } from "next";
import Heart from "../_images/heart.svg";

type CardProps = {
  name: string;
  brand: string;
  price: string;
};

// const Card: NextPage<CardProps> = ({ name, brand, price }) => {
//   return (
//     <div className="w-[200px] h-[400px] text-left text-xs text-dimgray font-lato mb-4">
//       <div className="top-[50px] my-3 bg-gainsboro w-[180px] h-[270px]"></div>
//       <b className="leading-[20px] flex text-black items-center">
//         {brand}
//       </b>
//       <div className="leading-[20px] flex items-center">
//         {name}
//       </div>
//       <div className="leading-[20px] flex items-center">
//         {price}
//       </div>
    //   <div className="box-border w-[121px] h-[33px] flex flex-row py-2.5 px-5 items-start justify-start text-center text-2xs text-black border-[1px] border-solid border-black">
    //       <div className="bg-white w-[83px] h-[13px] z-[0]" ></div>
    //       <div className="uppercase flex items-center justify-center w-[83px] h-[13px] shrink-0 z-[1]">
    //         Add to cart
    //       </div>
    //     </div>
    // </div>
//   );
// };
const Card: NextPage<CardProps> = ({ name, brand, price }) => {
  return (
  
      <div className="w-[250px] h-[400px] mb-20">
        <div className="bg-gainsboro h-[100%] w-100">
        </div>
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
          <img className="fill-black" src={Heart} alt="heart"></img>
        </div>


          
        

      </div>
  
  );
};

export default Card;
