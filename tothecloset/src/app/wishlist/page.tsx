import type { NextPage } from "next";
import WishlistCard from "../_components/wishlistCard";


const WishlistLoggedIn: NextPage = () => {
  const wishlistItems = [
    // List of items in your wishlist
    // Each item can have its own properties like name, brand, price, etc.
    { id: 1, name: "Item 1", brand: "Brand 1", price: "69.90 SGD" },
    { id: 2, name: "Item 2", brand: "Brand 2", price: "79.90 SGD" },
    { id: 3, name: "Item 3", brand: "Brand 3", price: "89.90 SGD" },
    { id: 4, name: "Item 4", brand: "Brand 4", price: "99.90 SGD" },
    { id: 5, name: "Item 5", brand: "Brand 5", price: "99.90 SGD" },
    // Add more items as needed
  ];

  return (

  // <div className="container mx-auto">
  //   <div className="my-20">
  //     <div className="flex flex-row justify-center sm:justify-start my-5">
  //       <h2 className="text-xl uppercase space-x-4 tracking-[2.4px]">Wish List</h2>
  //     </div>
  //     <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  //       {wishlistItems.map((item) => (
  //         <div className="flex flex-row justify-center items-start my-3" key={item.id}>
  //           <Card name={item.name} brand={item.brand} price={item.price} />
  //         </div>
  //         ))}
  //     </div>
  //   </div>
  // </div>
  <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-semibold uppercase tracking-[2.4px]">Wish List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group relative">
            <WishlistCard name={item.name} brand={item.brand} price={item.price} />
            </div>
          ))}
        </div>
        </div>
      </div>
  
  );
};

export default WishlistLoggedIn;
