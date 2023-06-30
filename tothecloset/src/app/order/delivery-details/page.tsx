import Black from '../images/black.png';
import Grey from '../images/Group 5.png';
import Icon3 from '../images/3-circle.svg';

const Page = () => {
  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}

      {/* Progress bar */}
      <div className="flex items-center justify-center mt-8 mb-12"> {/* Padding adjustment */}
        <div className="flex items-center">
          <div className="w-24 flex-shrink-0 relative flex items-center">
            <p className="text-center text-2xl text-black mt-1">Shipping</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={Black.src} alt="Delivery" className="h-full object-cover absolute" />
              </div>
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
            </div>
            <p className="text-center text-2xl text-black mt-1">Review</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={Grey.src} alt="Payment" className="h-full object-cover absolute" />
              </div>
            </div>
            <p className="text-center text-2xl text-gray-500 opacity-50 mt-1">Payment</p>
          </div>
        </div>
      </div>

      <section className="mx-40 mt-8 flex">

        {/* Delivery & Return */}
        <div className="w-1/2 pr-2 pt-4">
          <div className="flex items-center">
            <img src={Icon3.src} alt="Icon 1" className="h-6 w-6 mr-2" />
            <p className="text-2xl">DELIVERY & RETURN</p>
          </div>

          <div className="mr-4 mt-4 ml-8">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <p className="text-lg text-black mb-2">Delivery Date</p>
                <p className="text-lg text-black font-bold mb-4">DD/MM/YY</p>
                <p className="text-lg text-black mb-2">Return Date</p>
                <p className="text-lg text-black font-bold">DD/MM/YY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Container */}
        <div className="w-1/6 pl-2 pt-4">
        </div>

        {/* Your Order */}
        <div className="flex items-center justify-center mt-2">
          <div className="border border-gray-300 p-8 w-96">
            <h2 className="text-2xl mb-4">YOUR ORDER</h2>

            <div className="flex items-center mb-4">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-lg text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-base text-gray-400 mb-2">Item Detail</p>
                <p className="text-base text-black mb-2">x1</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-lg text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-base text-gray-400 mb-2">Item Detail</p>
                <p className="text-base text-black mb-2">x1</p>
              </div>
            </div>
          </div>
        </div>
      
      </section>
  
      {/* Button */}
      <div className="flex justify-center"> {/* Centering wrapper */}
        <button className="my-2 mt-12 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
          bg-white text-black hover:bg-black hover:text-white">
          <div className="uppercase flex items-center justify-center">
            Continue
          </div>
        </button>
      </div>

    </section>
  );
};

export default Page;