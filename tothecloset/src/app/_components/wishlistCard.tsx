import product1 from "../_images/product1.jpg";
import { HeartFill } from 'react-bootstrap-icons';

type wishlistCardProps = {
    name: string;
    brand: string;
    price: string;
  };
const imageUrl = product1.src;
const wishlistCard: React.FC<wishlistCardProps> = ({ name, brand, price }) => {
  return (
        <div className="mb-10">
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
                    <span aria-hidden="true" className="absolute inset-0" />
                    {brand}
                </a>
                </h3>
                <p className="mt-1 text-slate-500">{name}</p>
                <p className="text-slate-500 font-lato">{price}</p>
                <button className="my-2 box-border py-3 px-6 border-[1px] w-150px] tracking-[1.5px] flex border-solid border-black">
                    <div className="uppercase flex items-center justify-center">
                    Add to cart
                    </div>
                </button>
            </div>
            <HeartFill size={24} />
            </div>

        </div>
        
      )
  
};

export default wishlistCard;
