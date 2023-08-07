import React, { FC, useState } from "react";

interface CreditCardDropDownProps {
  onCardNumberBlur: () => void;
  onExpiryBlur: () => void;
  onCvcBlur: () => void;
}

const CreditCardDropDown: FC<CreditCardDropDownProps> = ({
  onCardNumberBlur,
  onExpiryBlur,
  onCvcBlur,
}) => {
  return (
    <div className="mx-8 mb-8">
      <div className="py-4">
        <p>Card Number</p>
        <input
          type="text"
          name="cardNum"
          placeholder="1234 1234 1234 1234"
          className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
          onBlur={onCardNumberBlur}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="pe-2">
          <p>Expiry</p>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
            onBlur={onExpiryBlur}
          />
        </div>
        <div className="ps-2">
          <p>CVC</p>
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            className="outline-none border border-midgrey border-1 w-full h-7 p-2 focus:ring-0 focus:border-grey focus:border-1 text-sm"
            onBlur={onCvcBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardDropDown;