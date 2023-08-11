"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Apple } from "react-bootstrap-icons";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };
    console.log("userCredentials:", userCredentials); // Log userCredentials before making the POST request

    sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoidGVzdDIiLCJsYXN0X25hbWUiOiJ0ZXN0MiJ9.XI6OkvQwtUEpeyyhNmTCTXJk-Js-GQ7SNJQmBQSuOSM");
    window.location.href = "/";

    // try {
    //   const response = await axios.post(
    //     "http://54.179.80.139:5000/api/user/login",
    //     userCredentials
    //   );
    //   console.log("status:", response.status);
    //   if (response.status === 200) {
    //     // Login successful, you can save the authentication token or perform other actions here
    //     console.log(response.data.message);
    //     const token = response.data.token;
    //     sessionStorage.setItem("token", token.toString());
    //     window.location.href = "/";
    //   } else if (response.status === 401) {
    //     // Login failed, display the error message
    //     setError("Invalid email or password");
    //   } else {
    //     // Handle other error cases
    //     setError("An error occurred during login");
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   setError("An error occurred during login");
    // }
  };

  return (
    <div className="py-16 px-8 grid grid-cols-1 md:grid-cols-3">
      <div className="text-white hidden md:flex">blank</div>
      <div>
        <div className="flex justify-center mb-10 mt-8">
          <span className="text-2xl uppercase tracking-[2.4px]">Log In</span>
        </div>

        <div className="p-2">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
          />
        </div>
        <div className="p-2">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1"
          />
        </div>
        <div className="p-2 flex">
          <div className="flex items-center pe-2">
            <input
              type="checkbox"
              id="rememberPw"
              name="rememberPw"
              value=""
              className="focus:border-grey focus:border-1 focus:ring-0 text-black"
            />
          </div>
          <p className="text-xs">Remember Me</p>
        </div>

        <div className="flex my-5 items-center">
          <hr className="text-grey w-full" />
          <div className="text-sm text-center w-72">Or log in with</div>
          <hr className="text-grey w-full " />
        </div>

        <div className="flex justify-center mb-5">
          <Image
            src="/images/googleIcon.png"
            alt="google"
            width={27}
            height={27}
            className="me-2"
          />
          <Apple size={25} className="ms-2" />
        </div>

        <div className="flex justify-center text-sm py-2">
          <div className="">
            Trouble logging in?{" "}
            <span className="underline ">Reset Password</span>
          </div>
        </div>

        <div className="flex justify-center text-sm p-2">
          <div className="">
            Don't have an account?{" "}
            <Link href="/signup/personal-particulars" className="underline">
              Sign up now
            </Link>
          </div>
        </div>

        {error && (
          <div className="flex justify-center text-sm py-2 text-red-500">
            <div className="">{error}</div>
          </div>
        )}

        <div className="flex justify-center">
          <form onSubmit={handleLogin}>
            <button
              type="submit"
              className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black"
            >
              <div className="uppercase flex items-center justify-center">
                Log In
              </div>
            </button>
          </form>
        </div>
      </div>
      <div className="text-white hidden md:flex">blank</div>
    </div>
  );
}
