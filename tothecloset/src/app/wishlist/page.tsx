import type { NextPage } from "next";
import Card from "../_components/card";

const WishlistLoggedIn: NextPage = () => {
  const wishlistItems = [
    // List of items in your wishlist
    // Each item can have its own properties like name, brand, price, etc.
    { id: 1, name: "Item 1", brand: "Brand 1", price: "69.90 SGD" },
    { id: 2, name: "Item 2", brand: "Brand 2", price: "79.90 SGD" },
    { id: 3, name: "Item 3", brand: "Brand 3", price: "89.90 SGD" },
    // Add more items as needed
  ];

  return (
    <div className="relative bg-white w-full h-[1024px] overflow-hidden text-left text-xs font-lato">
      <div className="top-[150px] left-[100px] text-[32px] tracking-[5px] uppercase text-gray mt-8 ml-8">
        Wish List
      </div>

      <div className="flex flex-wrap justify-start my-5 mt-4 ml-8">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            brand={item.brand}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistLoggedIn;
