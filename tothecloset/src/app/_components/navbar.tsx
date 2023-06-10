import { deleteAppClientCache } from "next/dist/server/lib/render-server";
import React, { useState, useEffect } from "react";
import {Playfair_Display} from 'next/font/google'
import { Heart } from 'react-bootstrap-icons';
import { Person } from "react-bootstrap-icons"
import { Bag } from "react-bootstrap-icons"
import { Search } from "react-bootstrap-icons"
import { List } from "react-bootstrap-icons"

const playfair = Playfair_Display({ subsets: ['latin'], weight :'400'})

const Navbar = () => {
    // const [menuOpen, setMenuOpen] = useState(false)
    // const handleNav = () => {
    //     setMenuOpen(!menuOpen)
    // }

    // useEffect(() => {
    //     // This code will only run on the client-side
    //     fetchData().then((response) => {
    //       setData(response.data);
    //     });
    //   }, []);

    return (
        <nav className="fixed w-full h-16 outline-1 outline-grey outline bg-white">
            <div className="flex flex-wrap justify-between items-center h-full w-full px-5 2xl:px-16">
                <div className="sm:w-1/3">
                    <ul className="hidden sm:flex">
                        <a href="">
                            <li className="mr-10 uppercase hover:border-b text-sm ">About</li>
                        </a>
                        <a href="">
                            <li className="mr-10 uppercase hover:border-b text-sm">Rent</li>
                        </a>
                        <a href="">
                            <li className="uppercase hover:border-b text-sm">Help</li>
                        </a>
                    </ul>
                </div>
                <a href='../page.tsx' className="sm:w-1/3">
                    <h2 className="playfair.className uppercase text-center">To The Closet</h2>
                </a>
                <div className="sm:w-1/3">
                    <ul className="hidden sm:flex justify-end">
                        <a href="">
                            <Heart size={15}/>
                        </a>
                        <a href="">
                            <Person className="ml-4" size={15}/>
                        </a>
                        <a href="">
                            <Search className="ml-4" size={15}/>
                        </a>
                        <a href="">
                            <Bag className="ml-4" size={15}/>
                        </a>
                    </ul>
                </div>
                {/* <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
                    <List/>
                </div> */}
            </div>
        </nav>
    )
}

export default Navbar