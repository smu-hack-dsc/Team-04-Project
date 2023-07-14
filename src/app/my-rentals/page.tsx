"use client"
import React from "react"
import { useState } from "react"
import RentalCard from "../_components/RentalCard"

export default function Page() {

    const [pastRentalOpen, setPastRentalOpen] = useState(false)
    const handlePastRental = () => {
      setPastRentalOpen(!pastRentalOpen)
    }

    return (
      <div className="py-16 px-8">
        <div className='text-2xl uppercase tracking-[2.4px] mb-10 mt-8'>My Rentals</div>

        <div className="mb-8">
          <span className="me-3" onClick={handlePastRental}>
            Ongoing Rentals
          </span>
          <span className="mx-3" onClick={handlePastRental}>
            Past Rentals
          </span>
          <hr className="w-[255px] mt-2 text-midgrey"/>
          {!pastRentalOpen && <hr className="w-[120px] text-black"/> }
          {pastRentalOpen && <hr className="w-[110px] ms-[130px] text-black"/> }
        </div>

        {/* ongoing rental tab */}
        <div className={
          pastRentalOpen
          ? "hidden"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        }>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
        </div>

        {/* past rental tab */}
        <div className={
          pastRentalOpen
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          : "hidden"
        }>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
          <RentalCard deliveryStatus="packing" deliveryDate="22 June 2023"/>
        </div>
      </div>
    )
  }