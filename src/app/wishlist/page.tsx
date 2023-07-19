import type { NextPage } from "next";
import WishlistCard from "../_components/WishlistCard";


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

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl uppercase tracking-[2.4px] mb-10 mt-5">Wish List</h1>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group relative">
              <WishlistCard name={item.name} brand={item.brand} price={item.price} />
            </div>
          ))}
        </div>
      </div>  
  );
};

export default WishlistLoggedIn;
