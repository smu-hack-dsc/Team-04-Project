"use client"
import { deleteAppClientCache } from "next/dist/server/lib/render-server";
import React, { useState, useEffect } from "react";
import {Playfair_Display} from 'next/font/google'
import { Heart } from 'react-bootstrap-icons';
import { Person } from "react-bootstrap-icons"
import { Bag } from "react-bootstrap-icons"
import { Search } from "react-bootstrap-icons"
import { List } from "react-bootstrap-icons"
import { X } from "react-bootstrap-icons"
import { Plus } from "react-bootstrap-icons"
import { Dash } from "react-bootstrap-icons"
import { Upload } from "react-bootstrap-icons"
import { twMerge } from "tailwind-merge"

const playfair = Playfair_Display({ subsets: ['latin'], weight :'400'})

const Navbar = () => {
    // hamburger menu
    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen)
    }

    // rent apparel in hamburger menu
    const [rentOptionOpen, setRentOptionOpen] = useState(false)
    const handleRentOption = () => {
        setRentOptionOpen(!rentOptionOpen)
    }

    // Men option in hamburger menu
    const [menOptionOpen, setMenOptionOpen] = useState(false)
    const handleMenOption = () => {
        setMenOptionOpen(!menOptionOpen)
    }

    // women option in hamburger menu
    const [womenOptionOpen, setWomenOptionOpen] = useState(false)
    const handleWomenOption = () => {
        setWomenOptionOpen(!womenOptionOpen)
    }

    // occasions option in hamburger menu
    const [occasionsOptionOpen, setOccasionsOptionOpen] = useState(false)
    const handleOccasionsOption = () => {
        setOccasionsOptionOpen(!occasionsOptionOpen)
    }

    // collections option in hamburger menu
    const [collectionsOptionOpen, setCollectionsOptionOpen] = useState(false)
    const handleCollectionsOption = () => {
        setCollectionsOptionOpen(!collectionsOptionOpen)
    }

    // account details in hamburger menu
    const [accDetailsOpen, setAccDetailsOpen] = useState(false)
    const handleAccDetails = () => {
        setAccDetailsOpen(!accDetailsOpen)
    }

    // rent dropdown
    const [rentDropdownOpen, setRentDropdownOpen] = useState(false)
    const handleRentDropdown = () => {
        setRentDropdownOpen(!rentDropdownOpen)
    }

    // search 
    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearch = () => {
        setSearchOpen(!searchOpen)
    }

    // account 
    const [accOpen, setAccOpen] = useState(false)
    const handleAcc = () => {
        setAccOpen(!accOpen)
    }

    const menOptionsArr = ["All Products", "New In", "Popular", "Tops", "Bottoms", "Suits", "Jackets & Vests", "Accessories"]
    const womenOptionsArr = ["All Products", "New In", "Popular", "Tops", "Bottoms", "Dresses", "Jumpsuits & Rompers", "Outerwear", "Suits", "Accessories", "Maternity"]
    const occasionsOptionsArr = ["Black Tie", "Casual", "Cocktail", "Date Night", "Prom", "Wedding", "Work Function"]
    const collectionsOptionsArr = ["Autumn 2022", "Winter 2022", "Spring 2023", "Summer 2023"]
    const accDetailsOptionsArr = ["Account Details", "My Rentals", "Logout"]
    const womenFirstCol = ["All Products", "New In", "Popular", "Tops", "Bottoms", "Dresses", "Jumpsuits & Rompers", "Outerwear"]
    const womenSecCol = ["Suits", "Accessories", "Maternity"]

    return (
        <nav className="fixed w-full h-16 outline-1 outline-grey outline bg-white px-3 z-50">
            <div className="flex flex-wrap justify-between items-center h-full w-full px-5 2xl:px-16">
                <div onClick={handleNav} className="lg:hidden cursor-pointer">
                    <List size={20}/>
                </div>
                <div className={
                    menuOpen
                    ? "fixed left-0 top-0 w-[50%] lg:hidden h-screen border-r-1 border border-grey bg-[#ffffff] p-7 ease-in duration-500 scroll-smooth overflow-y-auto z-10"
                    : "fixed left-[-100%] top-0 p-8 ease-in duration-500"
                }>
                    <div className="flex w-full items-center justify-end">
                        <div onClick={handleNav} className="cursor-pointer">
                            <X size={22}/>
                        </div>
                    </div>
                    <div className="flex-col">
                        <ul>
                            <a href="">
                                <li onClick={() => setMenuOpen(false)}
                                    className="py-2 cursor-pointer">
                                        Home
                                </li>
                            </a>
                            <a href="">
                                <li onClick={() => setMenuOpen(false)}
                                    className="py-2 cursor-pointer">
                                        About
                                </li>
                            </a>
                            <div className="flex justify-between">
                                <a href="">
                                    <li className="py-2">
                                        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Rent Apparel</span>
                                    </li>
                                </a>
                                <div className="flex items-center">
                                    <Plus size={17} onClick={handleRentOption} className={
                                            rentOptionOpen
                                            ? "hidden cursor-pointer"
                                            : "cursor-pointer"
                                        }/>
                                    <Dash size={16} onClick={handleRentOption} className={
                                        rentOptionOpen
                                        ? "cursor-pointer"
                                        : "hidden cursor-pointer"
                                    }/>
                                </div> 
                            </div>

                            {/* rent option opened */}
                            <ul className={
                                            rentOptionOpen
                                            ? "block pl-5"
                                            : "hidden"
                                        }>
                                            <div className="flex justify-between">
                                                <a href="">
                                                    <li className="py-2">
                                                        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Men</span>
                                                    </li>
                                                </a>
                                                <div className="flex items-center">
                                                    <Plus size={16} onClick={handleMenOption} className={
                                                        menOptionOpen
                                                        ? "hidden cursor-pointer"
                                                        : "cursor-pointer"
                                                    }/>
                                                    <Dash size={16} onClick={handleMenOption} className={
                                                        menOptionOpen
                                                        ? "cursor-pointer"
                                                        : "hidden cursor-pointer"
                                                    }/>
                                                </div> 
                                            </div>
                                            <ul className={
                                            menOptionOpen
                                            ? "block pl-5"
                                            : "hidden"
                                            }>
                                                {menOptionsArr.map((item, index) => (
                                                    <a href="" key={index}>
                                                        <li onClick={() => setMenuOpen(false)}
                                                            className="py-2 cursor-pointer">
                                                                {item}
                                                        </li>
                                                    </a>
                                                ))}
                                                
                                            </ul>
                                            <div className="flex justify-between">
                                                <a href="">
                                                    <li className="py-2">
                                                        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Women</span>
                                                    </li>
                                                </a>
                                                <div className="flex items-center">
                                                <Plus size={16} onClick={handleWomenOption} className={
                                                        womenOptionOpen
                                                        ? "hidden cursor-pointer"
                                                        : "cursor-pointer"
                                                    }/>
                                                <Dash size={16} onClick={handleWomenOption} className={
                                                    womenOptionOpen
                                                    ? "cursor-pointer"
                                                    : "hidden cursor-pointer"
                                                }/>
                                                </div> 
                                            </div>
                                            <ul className={
                                            womenOptionOpen
                                            ? "block pl-5"
                                            : "hidden"
                                            }>
                                                {womenOptionsArr.map((item, index) => (
                                                    <a href="" key={index}>
                                                        <li onClick={() => setMenuOpen(false)}
                                                            className="py-2 cursor-pointer">
                                                                {item}
                                                        </li>
                                                    </a>
                                                ))}
                                                
                                            </ul>
                                            <div className="flex justify-between">
                                                <a href="">
                                                    <li className="py-2">
                                                        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Occasions</span>
                                                    </li>
                                                </a>
                                                <div className="flex items-center">
                                                <Plus size={16} onClick={handleOccasionsOption} className={
                                                        occasionsOptionOpen
                                                        ? "hidden cursor-pointer"
                                                        : "cursor-pointer"
                                                    }/>
                                                    <Dash size={16} onClick={handleOccasionsOption} className={
                                                        occasionsOptionOpen
                                                        ? "cursor-pointer"
                                                        : "hidden cursor-pointer"
                                                    }/>
                                                </div> 
                                            </div>
                                            <ul className={
                                            occasionsOptionOpen
                                            ? "block pl-5"
                                            : "hidden"
                                            }>
                                                {occasionsOptionsArr.map((item, index) => (
                                                    <a href="" key={index}>
                                                        <li onClick={() => setMenuOpen(false)}
                                                            className="py-2 cursor-pointer">
                                                                {item}
                                                        </li>
                                                    </a>
                                                ))}
                                                
                                            </ul>
                                            <div className="flex justify-between">
                                                <a href="">
                                                    <li className="py-2">
                                                        <span onClick={() => setMenuOpen(false)} className="cursor-pointer">Collections</span>
                                                    </li>
                                                </a>
                                                <div className="flex items-center">
                                                <Plus size={16} onClick={handleCollectionsOption} className={
                                                        collectionsOptionOpen
                                                        ? "hidden cursor-pointer"
                                                        : "cursor-pointer"
                                                    }/>
                                                    <Dash size={16} onClick={handleCollectionsOption} className={
                                                        collectionsOptionOpen
                                                        ? "cursor-pointer"
                                                        : "hidden cursor-pointer"
                                                    }/>
                                                </div> 
                                            </div>
                                            <ul className={
                                            collectionsOptionOpen
                                            ? "block pl-5"
                                            : "hidden"
                                            }>
                                                {collectionsOptionsArr.map((item, index) => (
                                                    <a href="" key={index}>
                                                        <li onClick={() => setMenuOpen(false)}
                                                            className="py-2 cursor-pointer">
                                                                {item}
                                                        </li>
                                                    </a>
                                                ))}
                                                
                                            </ul>
                                        </ul>
                            <a href="">
                                <li onClick={() => setMenuOpen(false)}
                                    className="py-2 cursor-pointer">
                                        Wishlist
                                </li>
                            </a>
                            <a href="">
                                <li onClick={() => setMenuOpen(false)}
                                    className="py-2 cursor-pointer">
                                        Cart
                                </li>
                            </a>
                            <div className="flex justify-between">
                                <a href="">
                                    <li onClick={() => setMenuOpen(false)}
                                        className="py-2 cursor-pointer">
                                            Account
                                    </li>
                                </a>
                                <div className="flex items-center">
                                    <Plus size={16} onClick={handleAccDetails} className={
                                        accDetailsOpen
                                        ? "hidden cursor-pointer"
                                        : "cursor-pointer"
                                    }/>
                                    <Dash size={16} onClick={handleAccDetails} className={
                                        accDetailsOpen
                                        ? "cursor-pointer"
                                        : "hidden cursor-pointer"
                                    }/>
                                </div> 
                            </div>
                            <ul className={
                                accDetailsOpen
                                ? "block pl-5"
                                : "hidden"
                                }>
                                    {accDetailsOptionsArr.map((item, index) => (
                                        <a href="" key={index}>
                                            <li onClick={() => setMenuOpen(false)}
                                                className="py-2 cursor-pointer">
                                                    {item}
                                            </li>
                                        </a>
                                    ))}
                            </ul>
                            <a href="">
                                <li onClick={() => setMenuOpen(false)}
                                    className="py-2 cursor-pointer">
                                        Help
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="lg:w-1/3">
                    <ul className="hidden lg:flex">
                        <a href="">
                            <li className="mr-10 uppercase hover:border-b-2 text-sm">About</li>
                        </a>
                        <a href="" >
                            <li className="mr-10 uppercase hover:border-b-2 text-sm" onMouseOver={() => setRentDropdownOpen(true)}>Rent</li>
                        </a>
                        <a href="">
                            <li className="uppercase hover:border-b-2 text-sm">Help</li>
                        </a>
                    </ul>
                </div>
                <a href='../page.tsx' className="lg:w-1/3 absolute left-1/2 transform -translate-x-1/2">
                    <h2 className="playfair.className text-center">TO THE CLOSET</h2>
                </a>
                <div className="lg:w-1/3">
                    <ul className="hidden lg:flex justify-end items-center">
                        <Search 
                        size={15} 
                        onMouseOver={() => setSearchOpen(true)}
                        className={
                            searchOpen
                            ? "hidden"
                            : ""
                        }/>
                        <div onMouseLeave={() => setSearchOpen(false)} className={
                            searchOpen
                            ? "flex justify-between outline outline-1 rounded-lg py-1 px-2 w-52"
                            : "hidden"
                        }>
                            <Search size={15} className="ml-2 mr-3"/>
                            <input type="text" name="search" placeholder="Search ..." className="text-xs focus:outline-none"/>
                            <label>
                                <Upload size={15} className="mx-2"/>
                                <input type="file" name="search" className="hidden"/>
                            </label>
                        </div>
                        <a href="">
                            <Heart className="ml-7" size={15}/>
                        </a>
                        <a href="">
                            <Bag className="ml-7" size={15}/>
                        </a>
                        <a href="">
                            <Person className="ml-7" size={17} onMouseOver={() => setAccOpen(true)}/>
                        </a>
                    </ul>
                </div>
            </div>
            <div onMouseLeave={() => setRentDropdownOpen(false)} className={
                rentDropdownOpen
                ? "fixed grid grid-cols-5 w-full right-0 left-0 top-19 h-25 lg-hidden border-t border-b border-grey bg-[#ffffff] px-10 py-4 ease-in duration-500"
                : "hidden"
            }>
                <div>
                    <p className="text-darkgrey py-2">MEN</p>
                    {menOptionsArr.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
                </div>
                <div>
                    <p className="text-darkgrey py-2">WOMEN</p>
                    {womenFirstCol.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
                </div>
                <div>
                    <p className="text-white py-2">WHITE TEXT</p>
                    {womenSecCol.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
                </div>
                <div>
                    <p className="text-darkgrey py-2">OCCASIONS</p>
                    {occasionsOptionsArr.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
                </div>
                <div>
                    <p className="text-darkgrey py-2">COLLECTIONS</p>
                    {collectionsOptionsArr.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
                </div>
            </div>
            <div  onMouseLeave={() => setAccOpen(false)} className={
                accOpen
                ? "fixed right-0 top-19 h-25 lg-hidden border-t border-b border-s border-grey bg-[#ffffff] px-10 py-4 ease-in duration-500"
                : "hidden"
            }>
                {accDetailsOptionsArr.map((item, index) => (
                        <a href="">
                            <p key={index} className="py-1">{item}</p>
                        </a>
                    ))}
            </div>
        </nav>
    )
}

export default Navbar