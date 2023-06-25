import ProductCard from "../_components/productCard";

const ProductPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Item 1",
      brand: "Brand 1",
      price: "69.90 SGD",
      colour: ["Black", "Gray", "Brown"],
      size: ["S", "M", "L"],
      rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
    },
    {
      id: 2,
      name: "Item 2",
      brand: "Brand 2",
      price: "79.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
      rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
    },
    {
      id: 3,
      name: "Item 3",
      brand: "Brand 3",
      price: "89.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
      rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
    },
    {
      id: 4,
      name: "Item 4",
      brand: "Brand 4",
      price: "99.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
      rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
    },
    {
      id: 5,
      name: "Item 5",
      brand: "Brand 5",
      price: "99.90 SGD",
      colour: ["Black", "Red", "Blue"],
      size: ["S", "M", "L"],
      rentalperiod: ["4 Days", "8 Days", "12 Days", "16 Days"],
    },
    // Add more attributes as needed
  ];

  const selectedProduct = products.find((product) => product.id === 1);

  return (
    <div className="container mx-auto">
      
        {selectedProduct && (
          <div className="">
            <ProductCard {...selectedProduct} />
          </div>
        )}
      </div>
   
  );
};

export default ProductPage;
