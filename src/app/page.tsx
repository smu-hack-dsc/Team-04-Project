'use client';
import ReactTypingEffect from 'react-typing-effect';
import { render } from "react-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import landing from "./_images/landing.jpg";
import landing1 from "./_images/landing1.jpg";
import landing2 from "./_images/landing2.jpg";
import landing3 from "./_images/landing3.jpg";
import landing4 from "./_images/landing4.jpg";
import landing5 from "./_images/landing5.jpg";
import rent from "./_images/rent.png";
import wear from "./_images/wear.png";
import returnpic from "./_images/return.png";
import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Footer from './_components/Footer';


const imageUrl = landing.src;
const image1Url = landing1.src;
const image2Url = landing2.src;
const image3Url = landing3.src;
const image4Url = landing4.src;
const image5Url = landing5.src;
const rentUrl = rent.src;
const wearUrl = wear.src;
const returnUrl = returnpic.src;

const Landing: React.FC = () => {

  //initialising session storage whenever the landing page is first loaded
  useEffect(() => {
    // Check if session storage is available (for CSR)
    if (typeof window !== 'undefined') {
      // Set data in session storage
      if (!sessionStorage.getItem('userId')){
        var userId = 0; //when not logged in
        var userId = 3 //hard coding for now, to simulate log in
        sessionStorage.setItem('userId', userId.toString()); // userId=0 if user is not logged in
      }
    }
  }, [])
  

  const slides = [
    {
      url: imageUrl,
    },
    {
      url: image1Url,
    },
    {
      url: image2Url,
    },

    {
      url: image3Url,
    },
  ];
  
  const secondImg = [
    {url: image4Url},
  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  

  return (
    <section>
  <div className="container mx-auto flex py-16 items-center justify-center flex-col">
    <div className='h-screen w-screen mx-0 relative group'>
        <div
          
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-full bg-cover bg-cover duration-500'
        ></div>
        <div className='absolute top-0 pt-4 w-full h-full flex items-center justify-center'>
          <ReactTypingEffect className='text-white text-center sm:text-3xl text-xl font-bold' speed={100} eraseSpeed={100} typingDelay={500}
          text={['RENT DESIGNER CLOTHING FOR ANY OCCASION']}
          />
        </div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        {/* <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div> */}
        <div
          className="w-screen h-screen relative bg-cover"
          style={{ backgroundImage: `url(${image5Url})` }}
        >
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-24">
          <button className="box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-none bg-white text-black">
            <div className="uppercase flex items-center justify-center">
              View Summer 2023 Collection
            </div>
          </button>
        </div>
        </div>

        <div
        className="w-screen h-screen relative bg-cover"
        style={{ backgroundImage: `url(${image4Url})` }}
      >
      <div className="absolute bottom-0 left-0 ml-40 flex justify-center mb-40">
        <button className="box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-none bg-white text-black">
          <div className="uppercase flex items-center justify-center">
            View Trend 1
          </div>
        </button>
      </div>
      </div>

      <div
        className="w-screen h-screen relative bg-cover"
        style={{ backgroundImage: `url(${image3Url})` }}
      >
      <div className="absolute bottom-0 right-0 mr-40 flex justify-center mb-40">
        <button className="box-border py-3 px-8 border-[1px] w-150px tracking-[1.5px] flex border-none bg-white text-black">
          <div className="uppercase flex items-center justify-center">
            View Trend 2
          </div>
        </button>
      </div>
    </div>

      <div className="container mx-auto py-16 h-screen mt-5">
        <h1 className="text-center sm:text-3xl text-xl font-bold uppercase">How it works</h1>
        <div className="mx-auto py-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-32 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-24">
          <div className="flex flex-col items-center justify-center">
            <div>
              <div className='flex justify-center'>
                <img src={rentUrl} className="w-40 h-auto"></img>
              </div>
              <p className=" text-center font-bold sm:text-md text-lg py-4 align-middle inline-block w-full">RENT</p>
              <p className='text-center'>Choose your desired outfits from our thoughtfully curated selection.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
            <div className='flex justify-center'>
                <img src={wearUrl} className="w-40 h-auto"></img>
              </div>
              <p className=" text-center font-bold sm:text-md text-lg py-4 align-middle inline-block w-full">WEAR</p>
              <p className='text-center'>Flaunt your style confidently and make a statement wherever you go.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <div className='flex justify-center'>
                <img src={returnUrl} className="w-40 h-auto"></img>
              </div>
              <p className=" text-center font-bold sm:text-md text-lg py-4 align-middle inline-block w-full">RETURN</p>
              <p className='text-center'>After your stylish adventure, easily return the rental and explore more fashion options.</p>
            </div>
          </div>
        </div>
      </div> 
      </div>
      <Footer/>
    
    </div>
  </div>
</section>
  )
}

export default Landing;