import ProductCard from "../_components/productCard";

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Item 1",
      brand: "Brand 1",
      price: "69.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
    },
    {
      id: 2,
      name: "Item 2",
      brand: "Brand 2",
      price: "79.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
    },
    {
      id: 3,
      name: "Item 3",
      brand: "Brand 3",
      price: "89.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
    },
    {
      id: 4,
      name: "Item 4",
      brand: "Brand 4",
      price: "99.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
    },
    {
      id: 5,
      name: "Item 5",
      brand: "Brand 5",
      price: "99.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
    },
    // Add more attributes as needed
  ];

  const selectedProduct = products.find((product) => product.id === 1);

  return (
    <div className="container mx-auto">
      <div className="my-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {selectedProduct && (
          <div className="">
            <ProductCard {...selectedProduct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
