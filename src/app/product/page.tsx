'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BrowsingCard from "../_components/BrowsingCard";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { Dialog } from '@headlessui/react';
import SizeChart from '../_components/SizeChart'

interface Product {
  brand: string;
  colour: string[]; // Change this to string[] if 'colour' is an array of strings
  date_added: string;
  image_url: string;
  price: string;
  product_id: number;
  product_name: string;
  size: string[]; // Change this to string[] if 'size' is an array of strings
  type: string[];
  category: string;
  size_chart: JSON;
}

interface AvailabilityData {
  date: string;
  is_booked: boolean;
  product_id: number;
}

const ProductPage: React.FC = () => {

  const rentalPeriodOptions = [
    { label: '4 Days', days: 4 },
    { label: '8 Days', days: 8 },
    { label: '12 Days', days: 12 },
    { label: '16 Days', days: 16 },
  ];
  
  // State to hold the product availability
  // State to hold the product availability data
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([]);
  const [availabilityDates, setAvailabilityDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<number | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [addToCartSelected, setAddToCartSelected] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);



  const toggleSizeChart = () => {
      setIsSizeChartOpen((prev) => !prev);
    };

  useEffect(() => {
    const productId = 5; // Replace 1 with the ID of the product you want to display

    // Fetch product details from the backend using the specific product ID
    axios.get(`http://localhost:5000/api/product/${productId}/`)
      .then((response) => {
        setProduct(response.data); // Update the product state with the data from the backend
        setLoading(false); // Set loading to false once the data is fetched
        console.log('Response data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false); // Set loading to false in case of an error
      });

      // Fetch product availability data from the backend using the specific product ID
      axios
      .get(`http://localhost:5000/api/product_availability/${productId}/`)
      .then((response) => {
        setAvailabilityData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product availability:', error);
      });
  }, []);

  const isDateBooked = (date: Date): boolean => {
    const dateString = date.toISOString().split('T')[0]; // Convert date to string in the format 'YYYY-MM-DD'
    return availabilityDates.some((availabilityDate) => {
      const availabilityDateString = availabilityDate.toISOString().split('T')[0];
      return availabilityDateString === dateString && availabilityData.find(availability => availabilityDate.getTime() === new Date(availability.date).getTime())?.is_booked;
    });
  };
  
  const similarItemCount = 3;

  useEffect(() => {
    // When the product is loaded or changes, we'll set the first image as the default selected image
    if (product && product.image_url) {
      const images = Object.values(product.image_url);
      setSelectedImage(images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedDate && selectedRentalPeriod !== null) {
      const selectedRentalPeriodDays = rentalPeriodOptions[selectedRentalPeriod].days;
      const newReturnDate = addDays(selectedDate, selectedRentalPeriodDays);
      setReturnDate(newReturnDate);
    }
  }, [selectedDate, selectedRentalPeriod]);

  // Extract colours and sizes arrays from the product data
  const colours = product?.colour || [];
  const sizes = product?.size || [];
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

<section className="py-12 sm:py-16"> 
<div className="container mx-auto px-4">
  <div className="px-4 lg:col-gap-8 mt-8 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-5 lg:gap-8">
    <div className="lg:col-span-3 lg:row-end-1">
      <div className="lg:flex lg:items-center">
        <div className="lg:order-2 lg:ml-5">
          <div className="mx-auto max-w-xl overflow-hidden">
          <img
            className="h-[600px] w-full max-w-full object-cover"
            src={selectedImage || ''}
            alt=""
          />
        </div>
      </div>
      <div className="w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
        <div className="flex flex-row lg:items-center xs:pt-4 sm:pt-4 md:pt-4 justify-center lg:flex-col">
          {product &&
            Object.values(product.image_url).map((image, index) => (
              <button
                key={index}
                type="button"
                className={`flex-0 aspect-square mb-1 h-20 overflow-hidden rounded-lg border-[1px] text-center ${
                  selectedImage === image ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => {
                  setSelectedImage(image);
                }}
              >
                <img className="h-full w-full object-cover" src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
      <h1 className="sm: text-2xl text-gray-900 sm:text-3xl uppercase">{product?.product_name}</h1>

      <div className="my-2 flex items-center">
        <p className="text-xl font-medium text-gray-500">{product?.price} SGD</p>
      </div>

      <hr className="mt-3"></hr>

      <h2 className="mt-4 text-base text-gray-900">Colour:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {Array.isArray(colours) ? (
            colours.map((colourName, index) => (
              <button
                className={`box-border border-[1px] p-1 w-150px flex border-solid ${
                  index === selectedColor ? 'border-black' : 'border-white'
                }`}
                key={index}
                onClick={() => {
                  setSelectedColor((prev) => (prev === index ? null : index));
                }}
              >
                <div
                  className="border-black border-solid w-4 h-4 mr-1 mt-0.5"
                  style={{
                    borderStyle: 'solid',
                    borderColor: 'black',
                    backgroundColor: colourName,
                  }}
                ></div>
                <span className="font-normal text-sm">{colourName}</span>
              </button>
            ))
          ) : (
            <button
              className={`box-border border-[1px] p-1 w-150px flex border-solid ${
                0 === selectedColor ? 'border-black' : 'border-white'
              }`}
              onClick={() => {
                setSelectedColor((prev) => (prev === 0 ? null : 0));
              }}
            >
              <div
                className="border-black border-solid box-border p-1 border-[1px] w-4 h-4 mr-1 mt-0.5"
                style={{
                  borderStyle: 'solid',
                  borderColor: 'black',
                  backgroundColor: colours,
                }}
              ></div>
              <span className="font-normal text-sm">{colours}</span>
            </button>
          )}
      </div>

      <h2 className="mt-4 text-base text-gray-900">Size:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1 justify-between">
      {Array.isArray(sizes)
    ? sizes.map((sizeName, index) => (
        <button
          className={`box-border py-1 px-3 border-[1px] flex border-solid border-black ${
            index === selectedSize ? 'bg-black text-white' : ''
          }`}
          key={index}
          onClick={() => {
            setSelectedSize((prev) => (prev === index ? null : index));
          }}
        >
          <span className="font-normal text-sm">{sizeName}</span>
        </button>
      ))
    : (
      <button
        className={`box-border py-1 px-3 border-[1px] flex border-solid border-black ${
          0 === selectedSize ? 'bg-black text-white' : ''
        }`}
        onClick={() => {
          setSelectedSize((prev) => (prev === 0 ? null : 0));
        }}
      >
        <span className="font-normal text-sm">{sizes}</span>
      </button>
    )
  }
  <span>
  <button
          className="text-blue-600 underline cursor-pointer"
          onClick={toggleSizeChart}
        >
          Size Chart
        </button>
  </span>
      </div>
      <Dialog open={isSizeChartOpen} onClose={toggleSizeChart}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0" />

            <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
              <Dialog.Title className="text-xl font-semibold">Size Chart</Dialog.Title>
              <div className="mt-4">
                {/* Pass brand and category props to SizeChart component */}
                {product && product.brand && product.category && (
                  <SizeChart brand={product.brand} category={product.category} />
                )}
              </div>
              <div className="mt-4 text-right">
                <button className="text-blue-600 underline" onClick={toggleSizeChart}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <h2 className="mt-4 text-base text-gray-900">Rental Period:</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
      {rentalPeriodOptions.map((option, index) => (
        <button
          key={index}
          className={`box-border py-1 px-4 border-[1px] flex border-solid border-black ${
            index === selectedRentalPeriod ? 'bg-black text-white' : ''
          }`}
          onClick={() => {
            setSelectedRentalPeriod((prev) => (prev === index ? null : index));
          }}
        >
          <span className="font-normal text-sm">{option.label}</span>
        </button>
      ))}
      </div>

      <h2 className="mt-4 text-base text-gray-900">Delivery:</h2>
      <div className="mt-3 flex flex-wrap items-center gap-1">
      <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date()}
  filterDate={(date) => {
    const dateString = date.toISOString().split('T')[0];
    const isBooked = availabilityData.some(
      (availability) => availability.date.split('T')[0] === dateString && availability.is_booked
    );
    return !isBooked;
  }}
/>
      </div>

      <h2 className="mt-4 text-base text-gray-900">Return Date:</h2>
      <div className="mt-2 flex select-none flex-wrap items-center gap-1 font-bold">
        {returnDate ? returnDate.toLocaleDateString() : 'DD/MM/YY'}
      </div>

      <div className="mt-3 flex flex-wrap justify-center items-center gap-1">
      <button
  className={`my-2 box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-solid border-black ${
    addToCartSelected ? 'bg-black text-white' : ''
  }`}
  onClick={() => {
    setAddToCartSelected(true);
    // Call the function to add the product to the cart database
    addToCart(
      product?.product_id,
      selectedDate ? selectedDate.toISOString().split('T')[0] : null,
      rentalPeriodOptions[selectedRentalPeriod]?.days || 0,
      1 // Assuming quantity is 1 for now, you can change it if needed
    );
  }}
>
  <div className="uppercase flex items-center justify-center">Add to cart</div>
</button>


      </div>
    </div>
  </div>
</div>

<hr></hr>
<div className="flex justify-center mt-4">
  <div className="text-center text-xl">Complete your look</div>
</div>

      <div className="mx-auto py-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {Array.from({ length: similarItemCount }).map((_, index) => (
          <div key={index} className="">
            {product && (
              <BrowsingCard productId={product.product_id} />
            )}
          </div>
        ))}
        </div>
      </div> 
</section>
  );
};

const addToCart = (
  product_id: number | null,
  rental_start: string | null,
  rental_period: number | null,
  quantity: number
) => {
  if (!product_id || !rental_start || rental_period === null) {
    // Handle missing product data (optional)
    console.error('Product data is missing.');
    return;
  }

  const productData = {
    product_id,
    user_id: 2, // Replace this with the actual user ID if available
    rental_start,
    rental_period,
    quantity,
  };
  console.log(productData)
  // Make a POST request to the backend to add the product to the cart database
  axios
    .post('http://localhost:5000/api/cart', productData)
    .then((response) => {
      console.log('Product added to cart:', response.data);
      // Add any additional logic you need after successfully adding the product to the cart
    })
    .catch((error) => {
      console.error('Error adding product to cart:', error);
      // Handle errors if necessary
    });
};


export default ProductPage;
