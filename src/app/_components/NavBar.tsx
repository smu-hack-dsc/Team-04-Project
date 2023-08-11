"use client";
import { deleteAppClientCache } from "next/dist/server/lib/render-server";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  Heart,
  Person,
  Bag,
  Search,
  List,
  X,
  Plus,
  Dash,
  Upload,
  Camera,
} from "react-bootstrap-icons";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import axios from "axios";
import CartItem from "./CartItem";
import jwt from "jsonwebtoken";
// const playfair = Playfair_Display({ subsets: ['latin'], weight :'400'})
const customFontStyle = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"], // Replace 'weight' with 'weights'
});

const NavBar = () => {
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

  const user_id = sessionStorage.getItem("userId"); // Replace with the actual user ID or retrieve it from your authentication system
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if the user token exists in session storage
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    console.log(token);

    // Update the state with the user token
    setUserToken(token);

    //to update badge on cart icon
    const initCartItemNum = async () => {
      if (typeof window !== "undefined") {
        if (!sessionStorage.getItem("userId")) {
          const userId = 0; //set to 0 if no user
          sessionStorage.setItem("userId", userId.toString());
        }

        if (!sessionStorage.getItem("cartItemNum")) {
          const userId = sessionStorage.getItem("userId");
          if (userId !== "0") {
            try {
              getCartItemNum(userId); // Await the result
            } catch (error) {
              console.error(error);
              const cartItemNum = 0;
              sessionStorage.setItem("cartItemNum", cartItemNum.toString());
              setCount(cartItemNum);
            }
          } else {
            const cartItemNum = 0;
            sessionStorage.setItem("cartItemNum", cartItemNum.toString());
            setCount(cartItemNum);
          }
        } else {
          // Retrieve count from session storage
          setCount(parseInt(sessionStorage.getItem("cartItemNum")));
        }
      }
    };

    initCartItemNum();
  }, []);

  const getCartItemNum = async (userId) => {
    try {
      const response = await axios.get(
        "http://54.179.80.139:5000/api/cart/" + userId
      );
      const cartItemNum = response.data.length;
      sessionStorage.setItem("cartItemNum", cartItemNum.toString());
      setCount(cartItemNum);
      return cartItemNum;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [setSelectedOccasion] = useState(null);
  const [setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://54.179.80.139:5000/api/image_search/query",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File upload response:", response.data);
        sessionStorage.setItem("productList", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        window.location.href = "/rent";
      }
    }
  };

  const handleRentOptionClick = (gender, type) => {
    // Fetch relevant product IDs based on gender and type
    const url =
      "http://54.179.80.139:5000/api/product/filter?type=" +
      type +
      "&gender=" +
      gender;
    axios
      .get(url)
      .then((response) => {
        // Save the product IDs in sessionStorage
        console.log("handleclick response:", response.data);
        const productIds = response.data.products.map(
          (product) => product.product_id
        );
        console.log(productIds);
        sessionStorage.setItem("productIds", JSON.stringify(productIds));

        // Navigate to the RentPage
        // window.location.href = "/rent";
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove the user token from the session storage
    sessionStorage.removeItem("token");
    // Reload the page to update the Navbar
    window.location.reload();
  };

  // hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  // rent apparel in hamburger menu
  const [rentOptionOpen, setRentOptionOpen] = useState(false);
  const handleRentOption = () => {
    setRentOptionOpen(!rentOptionOpen);
  };

  // Men option in hamburger menu
  const [menOptionOpen, setMenOptionOpen] = useState(false);
  const handleMenOption = () => {
    setMenOptionOpen(!menOptionOpen);
  };

  // women option in hamburger menu
  const [womenOptionOpen, setWomenOptionOpen] = useState(false);
  const handleWomenOption = () => {
    setWomenOptionOpen(!womenOptionOpen);
  };

  // occasions option in hamburger menu
  const [occasionsOptionOpen, setOccasionsOptionOpen] = useState(false);
  const handleOccasionsOption = () => {
    setOccasionsOptionOpen(!occasionsOptionOpen);
  };

  // collections option in hamburger menu
  const [collectionsOptionOpen, setCollectionsOptionOpen] = useState(false);
  const handleCollectionsOption = () => {
    setCollectionsOptionOpen(!collectionsOptionOpen);
  };

  // account details in hamburger menu
  const [accDetailsOpen, setAccDetailsOpen] = useState(false);
  const handleAccDetails = () => {
    setAccDetailsOpen(!accDetailsOpen);
  };

  // rent dropdown
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const handleRentDropdown = () => {
    setRentDropdownOpen(!rentDropdownOpen);
  };

  // account
  const [accOpen, setAccOpen] = useState(false);
  const handleAcc = () => {
    setAccOpen(!accOpen);
  };

  // search
  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // console.log("INPUT" + e.target.value);
  };

  const handleSubmitSearch = async () => {
    // console.log("SEARCH QUERY  " + searchQuery);
    try {
      const response = await axios.get(
        "http://54.179.80.139:5000/api/text_search/" + searchQuery
      );

      // Check if the response data is not empty or null
      if (response.data) {
        const jsonData = response.data;
        setSearchText(jsonData);
        handleSearchText(jsonData); // Now you can pass jsonData to the function
        // console.log("OPENAI " + jsonData);
      } else {
        console.error("Empty or invalid JSON response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchText = async (searchText) => {
    try {
      var colors = searchText[0];
      var types = searchText[1];
      var brands = searchText[2];
      if (colors.length === 1 && colors[0] === "N/A") {
        colors = [];
      }
      if (types.length === 1 && types[0] === "N/A") {
        types = [];
      }
      if (brands.length === 1 && brands[0] === "N/A") {
        brands = [];
      }

      fetchSearchedProducts(colors, types, brands);

      // console.log("Colors:", colors);
      // console.log("Clothing Types:", types);
      // console.log("Brands:", brands);
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  };

  const [searchProductsArr, setSearchedProducts] = useState();

  const fetchSearchedProducts = (colors, types, brands) => {
    axios
      .get("http://54.179.80.139:5000/api/product/filter", {
        params: {
          brand: brands,
          // size: selectedSizes,
          colour: colors,
          type: types,
          // gender: selectedGender,
          price_min: 0,
          price_max: Number.MAX_SAFE_INTEGER,
        },
      })
      .then((response) => {
        if (response.data.products && response.data.products.length > 0) {
          const productIds = response.data.products.map(
            (item) => item.product_id
          );
          setSearchedProducts(productIds);
          sessionStorage.setItem(
            "searchedProducts",
            JSON.stringify(productIds)
          ); // Store in session storage
          // console.log("SEARCHED " + productIds);
          window.location.href = "/rent";
        } else {
          // console.log("No products found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchFile = async (searchFile) => {};

  const menOptionsArr = [
    "All Products",
    "Tops",
    "Bottoms",
    "Suits",
    "Jackets & Vests",
    "Accessories",
  ];
  const womenOptionsArr = [
    "All Products",
    "Tops",
    "Bottoms",
    "Dresses",
    "Jumpsuits & Rompers",
    "Outerwear",
    "Suits",
    "Accessories",
    "Maternity",
  ];
  const occasionsOptionsArr = [
    "Black Tie",
    "Casual",
    "Cocktail",
    "Date Night",
    "Prom",
    "Wedding",
    "Work Function",
  ];
  const collectionsOptionsArr = [
    "Autumn 2022",
    "Winter 2022",
    "Spring 2023",
    "Summer 2023",
  ];
  const accDetailsOptionsArr = ["Account Details", "My Rentals", "Logout"];
  const womenFirstCol = [
    "All Products",
    "Tops",
    "Bottoms",
    "Dresses",
    "Jumpsuits & Rompers",
    "Outerwear",
  ];

  return (
    <nav className="fixed w-full h-16 outline-1 outline-grey outline bg-white px-3 z-50">
      <div className="flex flex-wrap justify-between items-center h-full w-full px-5 2xl:px-16">
        <div onClick={handleNav} className="lg:hidden cursor-pointer">
          <List size={20} />
        </div>
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[50%] lg:hidden h-screen bg-[#ffffff] p-7 ease-in duration-500 scroll-smooth overflow-y-auto z-10"
              : "fixed left-[-100%] top-0 p-8 ease-in duration-500"
          }
        >
          <div className="flex w-full items-center justify-end">
            <div onClick={handleNav} className="cursor-pointer">
              <X size={22} />
            </div>
          </div>
          <div className="flex-col ">
            <ul>
              <li className="flex justify-between outline outline-1 rounded-lg py-1 px-2 mb-4 mt-6 w-full">
                {/* <Search size={14} className="ml-2 mr-3 self-center"/> */}
                <input
                  type="text"
                  name="search"
                  placeholder="Search ..."
                  className="text-xs focus:border-grey focus:border-0 focus:ring-0 border-none"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitSearch()}
                />
                <label className="flex items-center">
                  <Upload size={15} className="mx-2 hidden sm:inline" />
                  <Camera size={16} className="mx-2 inline sm:hidden" />
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    name="search"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </li>
              <Link href="/">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  Home
                </li>
              </Link>
              <Link href="">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  About
                </li>
              </Link>
              <div className="flex justify-between">
                <Link href="/rent">
                  <li className="py-2">
                    <span
                      onClick={() => setMenuOpen(false)}
                      className="cursor-pointer"
                    >
                      Rent
                    </span>
                  </li>
                </Link>
                <div className="flex items-center">
                  <Plus
                    size={17}
                    onClick={handleRentOption}
                    className={
                      rentOptionOpen
                        ? "hidden cursor-pointer"
                        : "cursor-pointer"
                    }
                  />
                  <Dash
                    size={16}
                    onClick={handleRentOption}
                    className={
                      rentOptionOpen
                        ? "cursor-pointer"
                        : "hidden cursor-pointer"
                    }
                  />
                </div>
              </div>

              {/* rent option opened */}
              <ul className={rentOptionOpen ? "block pl-5" : "hidden"}>
                <div className="flex justify-between">
                  <Link href="">
                    <li className="py-2">
                      <span
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer"
                      >
                        Men
                      </span>
                    </li>
                  </Link>
                  <div className="flex items-center">
                    <Plus
                      size={16}
                      onClick={handleMenOption}
                      className={
                        menOptionOpen
                          ? "hidden cursor-pointer"
                          : "cursor-pointer"
                      }
                    />
                    <Dash
                      size={16}
                      onClick={handleMenOption}
                      className={
                        menOptionOpen
                          ? "cursor-pointer"
                          : "hidden cursor-pointer"
                      }
                    />
                  </div>
                </div>
                <ul className={menOptionOpen ? "block pl-5" : "hidden"}>
                  {menOptionsArr.map((item, index) => (
                    <Link href={"/rent"} key={index}>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSelectedGender("male"); // Set the selected gender (assuming this is for men)
                          setSelectedType(item); // Set the selected type
                          sessionStorage.setItem("selectedGender", "male"); // Store selected gender in session storage
                          sessionStorage.setItem("selectedType", item); // Store selected type in session storage
                          handleRentOptionClick("male", item);
                        }}
                        className="py-2 cursor-pointer"
                      >
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <Link href="">
                    <li className="py-2">
                      <span
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer"
                      >
                        Women
                      </span>
                    </li>
                  </Link>
                  <div className="flex items-center">
                    <Plus
                      size={16}
                      onClick={handleWomenOption}
                      className={
                        womenOptionOpen
                          ? "hidden cursor-pointer"
                          : "cursor-pointer"
                      }
                    />
                    <Dash
                      size={16}
                      onClick={handleWomenOption}
                      className={
                        womenOptionOpen
                          ? "cursor-pointer"
                          : "hidden cursor-pointer"
                      }
                    />
                  </div>
                </div>
                <ul className={womenOptionOpen ? "block pl-5" : "hidden"}>
                  {womenOptionsArr.map((item, index) => (
                    <Link href={"/rent"} key={index}>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSelectedGender("female"); // Set the selected gender (assuming this is for men)
                          setSelectedType(item); // Set the selected type
                          sessionStorage.setItem("selectedGender", "female"); // Store selected gender in session storage
                          sessionStorage.setItem("selectedType", item); // Store selected type in session storage
                          handleRentOptionClick("male", item);
                        }}
                        className="py-2 cursor-pointer"
                      >
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <Link href="">
                    <li className="py-2">
                      <span
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer"
                      >
                        Occasions
                      </span>
                    </li>
                  </Link>
                  <div className="flex items-center">
                    <Plus
                      size={16}
                      onClick={handleOccasionsOption}
                      className={
                        occasionsOptionOpen
                          ? "hidden cursor-pointer"
                          : "cursor-pointer"
                      }
                    />
                    <Dash
                      size={16}
                      onClick={handleOccasionsOption}
                      className={
                        occasionsOptionOpen
                          ? "cursor-pointer"
                          : "hidden cursor-pointer"
                      }
                    />
                  </div>
                </div>
                <ul className={occasionsOptionOpen ? "block pl-5" : "hidden"}>
                  {occasionsOptionsArr.map((item, index) => (
                    <Link href="/rent" key={index}>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          sessionStorage.setItem("selectedOccasion", item);
                        }}
                        className="py-2 cursor-pointer"
                      >
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <Link href="">
                    <li className="py-2">
                      <span
                        onClick={() => setMenuOpen(false)}
                        className="cursor-pointer"
                      >
                        Collections
                      </span>
                    </li>
                  </Link>
                  <div className="flex items-center">
                    <Plus
                      size={16}
                      onClick={handleCollectionsOption}
                      className={
                        collectionsOptionOpen
                          ? "hidden cursor-pointer"
                          : "cursor-pointer"
                      }
                    />
                    <Dash
                      size={16}
                      onClick={handleCollectionsOption}
                      className={
                        collectionsOptionOpen
                          ? "cursor-pointer"
                          : "hidden cursor-pointer"
                      }
                    />
                  </div>
                </div>
                <ul className={collectionsOptionOpen ? "block pl-5" : "hidden"}>
                  {collectionsOptionsArr.map((item, index) => (
                    <Link href="/rent" key={index}>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          sessionStorage.setItem("selectedCollections", item);
                        }}
                        className="py-2 cursor-pointer"
                      >
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
              </ul>
              <Link href="/wishlist">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  Wishlist
                </li>
              </Link>
              <Link href="/cart">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  Cart
                </li>
              </Link>
              <div
                className={
                  userToken != null ? "flex justify-between" : "hidden"
                }
              >
                <Link href="">
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="py-2 cursor-pointer"
                  >
                    Account
                  </li>
                </Link>
                <div className="flex items-center">
                  <Plus
                    size={16}
                    onClick={handleAccDetails}
                    className={
                      accDetailsOpen
                        ? "hidden cursor-pointer"
                        : "cursor-pointer"
                    }
                  />
                  <Dash
                    size={16}
                    onClick={handleAccDetails}
                    className={
                      accDetailsOpen
                        ? "cursor-pointer"
                        : "hidden cursor-pointer"
                    }
                  />
                </div>
              </div>
              <ul className={accDetailsOpen ? "block pl-5" : "hidden"}>
                {accDetailsOptionsArr.map((item, index) => (
                  <Link href="" key={index}>
                    <li
                      onClick={() => setMenuOpen(false)}
                      className="py-2 cursor-pointer"
                    >
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
              <Link href="/login">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  Login
                </li>
              </Link>
              <Link href="">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-2 cursor-pointer"
                >
                  Help
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/3">
          <ul className="hidden lg:flex">
            <Link href="">
              <li className="mr-10 uppercase hover:border-b-2 text-sm">
                About
              </li>
            </Link>
            <Link href="/rent">
              <li
                className="mr-10 uppercase hover:border-b-2 text-sm"
                onMouseOver={() => setRentDropdownOpen(true)}
              >
                Rent
              </li>
            </Link>
            <Link href="">
              <li className="uppercase hover:border-b-2 text-sm">Help</li>
            </Link>
          </ul>
        </div>
        <Link
          href="/"
          className="lg:w-1/3 absolute left-1/2 transform -translate-x-1/2"
        >
          <h2 className="text-center">TO THE CLOSET</h2>
        </Link>
        <div className="lg:w-1/3">
          <ul className="hidden lg:flex justify-end items-center">
            <Search
              size={15}
              onMouseOver={() => setSearchOpen(true)}
              className={searchOpen ? "hidden" : ""}
            />
            <div
              onMouseLeave={() => setSearchOpen(false)}
              className={
                searchOpen
                  ? "flex justify-between outline outline-1 rounded-lg py-1 px-2 w-52"
                  : "hidden"
              }
            >
              {/* <Search size={15} className="ml-2 mr-3"/> */}
              <input
                type="text"
                name="search"
                placeholder="Search ..."
                className="text-xs focus:border-grey focus:border-0 focus:ring-0 border-none"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitSearch()}
              />
              <label className="flex items-center">
                <Upload size={15} className="mx-2 hidden sm:inline" />
                <Camera size={16} className="mx-2 inline sm:hidden" />
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .webp"
                  name="search"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <Link href="/wishlist">
              <Heart className="ml-7" size={15} />
            </Link>
            <Link href="/cart">
              <Badge count={count} color="#000000" size="small">
                <Bag className="ml-7" size={15} />
              </Badge>
            </Link>
            <Link href="" className={userToken != null ? "" : "hidden"}>
              <Person
                className="ml-7"
                size={17}
                onMouseOver={() => setAccOpen(true)}
              />
            </Link>
            <Link
              href="/login"
              className={userToken == null ? "ml-7" : "hidden"}
            >
              Log In
            </Link>
          </ul>
        </div>
      </div>
      <div
        onMouseLeave={() => setRentDropdownOpen(false)}
        className={
          rentDropdownOpen
            ? "fixed grid grid-cols-5 w-full right-0 left-0 top-19 h-25 lg-hidden border-t border-b border-grey bg-[#ffffff] px-10 py-7 ease-in duration-500"
            : "hidden"
        }
      >
        <div>
          <p className="text-darkgrey py-2">MEN</p>
          {menOptionsArr.map((item, index) => (
            <Link href={"/rent"} key={index}>
              <p
                onClick={() => {
                  setMenuOpen(false);
                  setSelectedGender("male"); // Set the selected gender (assuming this is for women)
                  setSelectedType(item); // Set the selected type
                  sessionStorage.setItem("selectedGender", "male"); // Store selected gender in session storage
                  sessionStorage.setItem("selectedType", item); // Store selected type in session storage
                  handleRentOptionClick("male", item);
                }}
                className="py-1 cursor-pointer"
              >
                {item}
              </p>
            </Link>
          ))}
        </div>
        <div>
          <p className="text-darkgrey py-2">WOMEN</p>
          {womenOptionsArr.map((item, index) => (
            <Link href={"/rent"} key={index}>
              <p
                onClick={() => {
                  setMenuOpen(false);
                  setSelectedGender("female"); // Set the selected gender (assuming this is for women)
                  setSelectedType(item); // Set the selected type
                  sessionStorage.setItem("selectedGender", "female"); // Store selected gender in session storage
                  sessionStorage.setItem("selectedType", item); // Store selected type in session storage
                }}
                className="py-1 cursor-pointer"
              >
                {item}
              </p>
            </Link>
          ))}
        </div>

        <div>
          <p className="text-darkgrey py-2">OCCASIONS</p>
          {occasionsOptionsArr.map((item, index) => (
            <Link href="" key={index}>
              <p className="py-1">{item}</p>
            </Link>
          ))}
        </div>
        <div>
          <p className="text-darkgrey py-2">COLLECTIONS</p>
          {collectionsOptionsArr.map((item, index) => (
            <Link href="" key={index}>
              <p className="py-1">{item}</p>
            </Link>
          ))}
        </div>
      </div>
      <div
        onMouseLeave={() => setAccOpen(false)}
        className={
          accOpen
            ? "fixed right-0 top-19 h-25 lg-hidden border-t border-b border-s border-grey bg-[#ffffff] px-10 py-4 ease-in duration-500"
            : "hidden"
        }
      >
        {accDetailsOptionsArr.map((item, index) => (
          <Link href="" key={index}>
            <p className="py-1">{item}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
