import Black from '../images/black.png';
import Grey from '../images/Group 5.png';
import Icon3 from '../images/3-circle.svg';
import { CheckCircleFill } from "react-bootstrap-icons";

const Page = () => {
  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}

      {/* Progress bar */}
      <div className="flex flex-rows justify-center my-10 mx-6 text-xs sm:text-base">
        <div>Shipping</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className="text-midgrey" />
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className="flex items-center text-midgrey">Review</div>

        <div className="flex items-center">
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
          <CheckCircleFill className="text-midgrey" />
          <hr className="w-6 inline-block align-middle text-midgrey mx-2" />
        </div>

        <div className="text-midgrey">Payment</div>
      </div>

      <section className="mx-40 mt-8 flex">

        {/* Delivery & Return */}
        <div className="w-1/2 pr-2 pt-4">
        <div className="flex items-center">
            <img src={Icon3.src} alt="Icon 3" className="h-6 w-6 mr-2" />
            <p className="text">DELIVERY & RETURN</p>
          </div>

          <div className="mr-4 mt-4 ml-8">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <p className="text-sm text-black mb-2">Delivery Date</p>
                <p className="text-sm text-black font-bold mb-4">DD/MM/YY</p>
                <p className="text-sm text-black mb-2">Return Date</p>
                <p className="text-sm text-black font-bold">DD/MM/YY</p>
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
            <h2 className="text mb-4">YOUR ORDER</h2>

            <div className="flex items-center mb-4">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-sm text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-xs text-gray-400 mb-2">Item Detail</p>
                <p className="text-xs text-black mb-2">x1</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-20 h-24 bg-gray-200 mr-4"></div>
              <div className="flex-grow">
                <p className="text-sm text-black mb-2 flex justify-between">
                  <span>Item Name</span>
                  <span>$$$</span>
                </p>
                <p className="text-xs text-gray-400 mb-2">Item Detail</p>
                <p className="text-xs text-black mb-2">x1</p>
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