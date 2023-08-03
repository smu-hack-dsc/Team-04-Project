import React from "react";
import Image from 'next/image';
import { Apple } from "react-bootstrap-icons"
import Link from "next/link";

export default function Page() {
  
  return (
    <div className="py-16 px-8 grid grid-cols-1 md:grid-cols-3">
      <div className="text-white hidden md:flex">blank</div>
      <div>
        <div className='flex justify-center mb-10 mt-8'>
          <span className="text-2xl uppercase tracking-[2.4px]">Log In</span>
        </div>
        
        <div className='p-2'>
          <p>Email</p>
          <input type="email" name="email" className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'/>
        </div>
        <div className='p-2'>
          <p>Password</p>
          <input type="password" name="password" className='outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1'/>
        </div>
        <div className='p-2 flex'>
          <div className="flex items-center pe-2">
            <input type="checkbox" id="rememberPw" name="rememberPw" value="" className="focus:border-grey focus:border-1 focus:ring-0"/>
          </div>
          <p className="text-xs">Remember Me</p>
        </div>

        <div className="flex my-5 items-center">
          <hr className="text-grey w-full"/>
          <div className="text-sm text-center w-72">Or log in with</div>
          <hr className="text-grey w-full "/>
        </div>

        <div className="flex justify-center mb-5">
          <Image src="/images/googleIcon.png" alt="google" width={27} height={27} className="me-2"/>
          <Apple size={25} className="ms-2"/>
        </div>

        <div className="flex justify-center text-sm py-2">
          <div className="">Trouble logging in? <span className="underline ">Reset Password</span></div>
        </div>

        <div className="flex justify-center text-sm p-2">
          <div className="">Don't have an account? <Link href="/signup/personal-particulars" className="underline">Sign up now</Link></div>
        </div>

        <div className="flex justify-center">
          <Link href="" className='m-4'>
            <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
              <div className="uppercase flex items-center justify-center">
                Log In
              </div>
            </button>
          </Link>
        </div>


      </div>
      <div className="text-white hidden md:flex">blank</div>
    </div> 
  );
}
