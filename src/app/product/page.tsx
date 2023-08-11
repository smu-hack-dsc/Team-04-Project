"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BrowsingCard from "../_components/BrowsingCard";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import "antd/dist/antd";
import { Dialog } from "@headlessui/react";
import SizeChart from "../_components/SizeChart";
import { Skeleton } from "antd";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

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
  date: Date;
  is_booked: boolean;
  product_id: number;
}

const ProductPage: React.FC = () => {
  const SECRET_KEY =
    "q9grv7k_5P07NZ7pz2k2r3wonSbNF2tJgTNf5zVaj9mHvrD_3H4aKGeOZq0yKpgv";
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState(""); // Add this state to store user ID

  useEffect(() => {
    // Check if the user token exists in session storage
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    // Update the state with the user token
    setUserToken(token);
    console.log("user token:", userToken); // This might still show the old value

    // Decode the user token to get the user ID
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserId(decodedToken.user_id); // Store the decoded user ID in state
    }
  }, [setUserId]);

  const decodeToken = (token) => {
    try {
      if (!token) {
        console.error("Token is undefined or null.");
        return null;
      }

      // Access the secret key from the environment variables or hardcoded value
      const secretKey =
        SECRET_KEY ||
        "q9grv7k_5P07NZ7pz2k2r3wonSbNF2tJgTNf5zVaj9mHvrD_3H4aKGeOZq0yKpgv";
      console.log("secret_key", secretKey);

      // Decode the token using the provided secret key
      const decodedToken = jwt.verify(token, secretKey);
      console.log("userinfo:", decodedToken.user_id);
      setUserId(decodedToken.user_id);
      sessionStorage.setItem("userId", decodedToken.user_id); // Store in session storage
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("addToCart")) {
      toast("Please input details to add product to cart");
      sessionStorage.removeItem("addToCart");
    }
  }, []);

  // Convert Moment to Dayjs before setting the selectedDate state
  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
  };
  const rentalPeriodOptions = [
    { label: "4 Days", days: 4 },
    { label: "8 Days", days: 8 },
    { label: "12 Days", days: 12 },
    { label: "16 Days", days: 16 },
  ];

  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>(
    []
  );
  const [availabilityDates, setAvailabilityDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [returnDate, setReturnDate] = useState<Moment | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<
    number | null
  >(0);
  const [addToCartSelected, setAddToCartSelected] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [recommendedSize, setRecommendedSize] = useState("");

  const toggleSizeChart = () => {
    setIsSizeChartOpen((prev) => !prev);
  };

  useEffect(() => {
    // Retrieve the selected product ID from sessionStorage
    const productId = sessionStorage.getItem("selectedProductId");
    const productIdInt = parseInt(productId, 10);
    console.log("Product ID:", productId);

    // Fetch product details from the backend using the specific product ID
    axios
      .get(`http://localhost:5000/api/product/${productIdInt}/`)
      .then((response) => {
        setProduct(response.data); // Update the product state with the data from the backend
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false); // Set loading to false in case of an error
      });

    axios
      .get(`http://localhost:5000/api/product_availability/${productIdInt}/`)
      .then((response) => {
        const availabilityData: AvailabilityData[] = response.data.map(
          (availability: any) => ({
            ...availability,
            date: new Date(availability.date), // Parse the date string into a Date object
          })
        );
        setAvailabilityData(availabilityData);
        // Get the dates that are booked (is_booked: true)
        const bookedDates = availabilityData.filter(
          (availability) => availability.is_booked
        );
        // Extract the Date objects of booked dates
        const bookedDateObjects = bookedDates.map(
          (availability) => availability.date
        );
        setAvailabilityDates(bookedDateObjects);

        // Calculate the initial return date if both selectedDate and selectedRentalPeriod are not null
        if (selectedDate && selectedRentalPeriod !== null) {
          const selectedRentalPeriodDays =
            rentalPeriodOptions[selectedRentalPeriod].days;
          const newReturnDate = selectedDate
            .clone()
            .add(selectedRentalPeriodDays, "days");
          console.log("Return date:", newReturnDate);
          setReturnDate(newReturnDate);
        } else {
          // Handle the case where either selectedDate or selectedRentalPeriod is null
          setReturnDate(null); // or set a default value if desired
        }
      })
      .catch((error) => {
        console.error("Error fetching product availability:", error);
      });
  }, [selectedDate, selectedRentalPeriod]);

  const isDateBooked = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0]; // Convert date to string in the format 'YYYY-MM-DD'
    return availabilityDates.some((availabilityDate) => {
      const availabilityDateString = availabilityDate
        .toISOString()
        .split("T")[0];
      return (
        availabilityDateString === dateString &&
        availabilityData.find(
          (availability) =>
            availabilityDate.getTime() === new Date(availability.date).getTime()
        )?.is_booked
      );
    });
  };

  const similarItemCount = 3;

  useEffect(() => {
    // When the product is loaded or changes, set the first image as the default selected image
    if (product && product.image_url) {
      const images = Object.values(product.image_url);
      setSelectedImage(images[0]);
    }

    //size recommender
    if (product) {
      const token =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
      const userId = sessionStorage.getItem("userId");
      if (token == null) {
        setRecommendedSize("Log in to find out");
      } else {
        axios
          .get(
            "http://localhost:5000/api/size_recommender/" +
              userId +
              "/" +
              product["brand"] +
              "/" +
              product["category"]
          )
          .then((response) => {
            setRecommendedSize(response.data["size_recommendation"]);
          })
          .catch((error) => {
            console.error("Error fetching product:", error);
            setLoading(false); // Set loading to false in case of an error
          });
      }
    }
  }, [product]);

  useEffect(() => {
    if (selectedDate && selectedRentalPeriod !== null) {
      const selectedRentalPeriodDays =
        rentalPeriodOptions[selectedRentalPeriod].days;
      const newReturnDate = selectedDate
        .clone()
        .add(selectedRentalPeriodDays, "days");
      console.log("Return date:", newReturnDate);
      setReturnDate(newReturnDate);
    }
  }, [selectedDate, selectedRentalPeriod]);

  // Extract colours and sizes arrays from the product data
  const colours = product?.colour || [];
  const sizes = product?.size || [];
  if (loading) {
    return <Skeleton active />;
  }

  const addToCart = (
    product_id: number | null,
    rental_start: string | null,
    rental_period: number | null,
    quantity: number
  ) => {
    if (!product_id || !rental_start || rental_period === null) {
      // Handle missing product data (optional)
      console.error("Product data is missing.");
      return;
    }

    const userId = sessionStorage.getItem("userId"); // Retrieve from session storage

    const productData = {
      product_id,
      user_id: userId,
      rental_start,
      rental_period,
      quantity,
    };
    console.log("productData:", productData);

    // Make a POST request to the backend to add the product to the cart database
    axios
      .post("http://localhost:5000/api/cart", productData)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        // Show a success toast notification
        toast.success("Added to cart!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);

        if (error.response) {
          // Error from the backend with specific error code
          const errorCode = error.response.status;
          const errorMessage = error.response.data.error_message;

          if (errorCode === 400) {
            if (
              errorMessage === "Product is already booked on the selected days"
            ) {
              toast.error(
                "This product is already booked on the selected days."
              );
            } else if (
              errorMessage ===
              "Product is already booked for some days within the selected period"
            ) {
              toast.error(
                "This product is already booked for some days within the selected period."
              );
            } else {
              toast.error(
                "Unknown error occurred while adding the product to the cart."
              );
            }
          } else if (errorCode === 4091) {
            toast.error("This product is already booked on the selected days.");
          } else if (errorCode === 4092) {
            toast.error(
              "This product is already booked for some days within the selected period."
            );
          } else {
            toast.error("Failed to add the product to the cart.");
          }
        } else {
          // Network error or other general error
          toast.error("Failed to add the product to the cart.");
        }
      });
  };

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
                    src={selectedImage || ""}
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
                          selectedImage === image
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        onClick={() => {
                          setSelectedImage(image);
                        }}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={image}
                          alt=""
                        />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl text-gray-900 sm:text-3xl uppercase">
              {product?.product_name}
            </h1>
            <div className="text-lg text-darkgrey">{product?.brand}</div>
            <div className="my-2 flex items-center">
              <p className="text-lg font-medium text-gray-500">
                {product?.price} SGD
              </p>
            </div>

            <hr className="mt-3"></hr>

            <h2 className="mt-4 text-base text-gray-900">Colour:</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {Array.isArray(colours) ? (
                colours.map((colourName, index) => (
                  <button
                    className={`box-border border-[1px] p-1 w-150px flex border-solid ${
                      index === selectedColor ? "border-black" : "border-white"
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedColor((prev) =>
                        prev === index ? null : index
                      );
                    }}
                  >
                    <div
                      className="border-black border-solid w-4 h-4 mr-1 mt-0.5"
                      style={{
                        borderStyle: "solid",
                        borderColor: "black",
                        backgroundColor: colourName,
                      }}
                    ></div>
                    <span className="font-normal text-sm">{colourName}</span>
                  </button>
                ))
              ) : (
                <button
                  className={`box-border border-[1px] p-1 w-150px flex border-solid ${
                    0 === selectedColor ? "border-black" : "border-white"
                  }`}
                  onClick={() => {
                    setSelectedColor((prev) => (prev === 0 ? null : 0));
                  }}
                >
                  <div
                    className="border-black border-solid box-border p-1 border-[1px] w-4 h-4 mr-1 mt-0.5"
                    style={{
                      borderStyle: "solid",
                      borderColor: "black",
                      backgroundColor: colours,
                    }}
                  ></div>
                  <span className="font-normal text-sm">{colours}</span>
                </button>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <h2 className="text-base text-gray-900">Size:</h2>
              <span>
                <button
                  className="underline cursor-pointer"
                  onClick={toggleSizeChart}
                >
                  Size Chart
                </button>
              </span>
            </div>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1 justify-between">
              {Array.isArray(sizes) ? (
                sizes.map((sizeName, index) => (
                  <button
                    className={`box-border py-1 px-3 border-[1px] flex border-solid border-black ${
                      index === selectedSize ? "bg-black text-white" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedSize((prev) =>
                        prev === index ? null : index
                      );
                    }}
                  >
                    <span className="font-normal text-sm">{sizeName}</span>
                  </button>
                ))
              ) : (
                <button
                  className={`box-border py-1 px-3 border-[1px] flex border-solid border-black ${
                    0 === selectedSize ? "bg-black text-white" : ""
                  }`}
                  onClick={() => {
                    setSelectedSize((prev) => (prev === 0 ? null : 0));
                  }}
                >
                  <span className="font-normal text-sm">{sizes}</span>
                </button>
              )}
            </div>
            <div className="my-3 text-sm">
              Your Recommended Size:{" "}
              <span className="italic">{recommendedSize} </span>
            </div>
            <Dialog open={isSizeChartOpen} onClose={toggleSizeChart}>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                  <Dialog.Overlay className="fixed inset-0" />

                  <div className="bg-white p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
                    <Dialog.Title className="text-xl font-semibold">
                      Size Chart
                    </Dialog.Title>
                    <div className="mt-4">
                      {/* Pass brand and category props to SizeChart component */}
                      {product && product.brand && product.category && (
                        <SizeChart
                          brand={product.brand}
                          category={product.category}
                        />
                      )}
                    </div>
                    <div className="mt-4 text-right">
                      <button
                        className="text-black underline"
                        onClick={toggleSizeChart}
                      >
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
                    index === selectedRentalPeriod ? "bg-black text-white" : ""
                  }`}
                  onClick={() => {
                    setSelectedRentalPeriod((prev) =>
                      prev === index ? null : index
                    );
                  }}
                >
                  <span className="font-normal text-sm">{option.label}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-4 text-base text-gray-900">Delivery:</h2>
            <div className="mt-3 flex  items-center gap-1 border border-1 border-black w-[150px]">
              <DatePicker
                selected={selectedDate ? moment(selectedDate) : null}
                bordered={false}
                onChange={handleDateChange}
                disabledDate={(current) => {
                  // Disable dates where product is alr booked
                  return (
                    current &&
                    (current < moment() || isDateBooked(current.toDate())) // Convert Dayjs to Date
                  );
                }}
              />
            </div>

            <h2 className="mt-4 text-base text-gray-900">Return Date:</h2>
            <div className="mt-2 flex select-none flex-wrap items-center gap-1 font-bold">
              {returnDate ? returnDate.format("YY/MM/DD") : "YY/MM/DD"}
            </div>

            <div className="mt-3 flex flex-wrap justify-center items-center gap-1">
              <button
                className={`my-2 box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-solid border-black ${
                  addToCartSelected ? "bg-black text-white" : ""
                }`}
                onClick={() => {
                  setAddToCartSelected(true);
                  // Call the function to add the product to the cart database
                  addToCart(
                    product?.product_id,
                    selectedDate
                      ? selectedDate.toISOString().split("T")[0]
                      : null,
                    rentalPeriodOptions[selectedRentalPeriod]?.days || 0,
                    1 // Assuming quantity is 1
                  );
                }}
              >
                <div className="uppercase flex items-center justify-center">
                  Add to cart
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
