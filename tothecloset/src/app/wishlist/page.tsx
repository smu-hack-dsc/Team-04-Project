import type { NextPage } from "next";
import Card from "../_components/card";


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
  //   <div className="bg-white w-full text-left font-lato">
  //     <div className="text-[32px] tracking-[5px] uppercase text-gray py-[50px] px-8">
  //       Wish List
  //     </div>

  //     {/*  grid grid-cols-4 gap-4 mt-4 mx-24 */}
  //     <div className="flex flex-col items-start">
  //     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between ">
  //       {wishlistItems.map((item) => (
  //         <div className="flex justify-center mx-8 mb-24">
  //         <Card
  //           key={item.id}
  //           name={item.name}
  //           brand={item.brand}
  //           price={item.price}
  //         />
  //         </div>
  //       ))}
  //     </div>
  //     </div>
  //   </div>
  // // );
  // <div className="bg-white w-full font-lato">
    

  //     {/*  grid grid-cols-4 gap-4 mt-4 mx-24 */}
  //     <div className="flex flex-col items-start">
  //     <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between ">
  //       <div className="mx-8 mb-12 flex justify-center text-[32px] tracking-[2.4px] uppercase py-[50px]">Wish List</div>
  //       <div className="col-span-1"></div> {/* Empty column */}
  //       <div className="col-span-1"></div> {/* Empty column */}
  //       <div className="col-span-1"></div> {/* Empty column */}
  //       {wishlistItems.map((item) => (
  //         <div className="flex justify-center mx-8 mb-24">
    
  //         <Card
  //           key={item.id}
  //           name={item.name}
  //           brand={item.brand}
  //           price={item.price}
  //         />
  //         </div>
  //       ))}
  //     </div>
  //     </div>
  //   </div>
  <div className="bg-white w-full font-lato">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <div className="col-span-full text-[32px] tracking-[2.4px] uppercase text-gray py-8">
      Wish List
    </div>
    {wishlistItems.map((item) => (
      <div className="flex justify-center" key={item.id}>
        <Card name={item.name} brand={item.brand} price={item.price} />
      </div>
    ))}
  </div>
</div>
  );
};

export default WishlistLoggedIn;
