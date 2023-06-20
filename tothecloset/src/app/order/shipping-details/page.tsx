import FirstComponent from '../images/Group 4.png';
import SecondComponent from '../images/Group 5.png';
import Icon1 from '../images/1-circle.svg';
import Icon2 from '../images/2-circle.svg';

const Page = () => {
  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}
      <div className="flex items-center justify-center mt-8"> {/* Padding adjustment */}
        <div className="flex items-center">
          <div className="w-24 flex-shrink-0 relative flex items-center">
            <p className="text-center text-2xl text-black mt-1">Shipping</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={FirstComponent.src} alt="Delivery" className="h-full object-cover absolute" />
              </div>
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
            </div>
            <p className="text-center text-2xl text-gray-500 opacity-50 mt-1">Review</p>
          </div>

          <div className="flex items-center ml-4">
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={SecondComponent.src} alt="Payment" className="h-full object-cover absolute" />
              </div>
            </div>
            <p className="text-center text-2xl text-gray-500 opacity-50 mt-1">Payment</p>
          </div>
        </div>
      </div>

      <section className="mx-40 mt-8 flex">

        {/* Contact Information */}
        <div className="w-1/2 pr-2 pt-4">
          <div className="flex items-center">
            <img src={Icon1.src} alt="Icon 1" className="h-6 w-6 mr-2" />
            <p className="text-2xl">CONTACT INFORMATION</p>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <p className="text-xl text-gray-500">First Name</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>

              <div className="w-1/2 pl-2">
                <p className="text-xl text-gray-500">Last Name</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-xl text-gray-500">Email</p>
            <div className="border border-gray-300 p-2 flex items-center mt-2">
              <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
            </div>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/3 pr-2">
                <p className="text-xl text-gray-500">Phone Number</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <select className="w-full h-8 bg-transparent focus:outline-none">
                    <option value="+65">+65</option>
                    {/* Add other options here */}
                  </select>
                </div>
              </div>

              <div className="w-2/3 pl-2">
                <p className="text-xl text-white">Last Name</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Container */}
        <div className="w-1/6 pl-2 pt-4">
        </div>

        {/* Shipping Address */}
        <div className="w-1/2 pl-2 pt-4">
          <div className="flex items-center">
            <img src={Icon2.src} alt="Icon 2" className="h-6 w-6 mr-2" />
            <p className="text-2xl">SHIPPING ADDRESS</p>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-xl text-gray-500">Address 1</p>
            <div className="border border-gray-300 p-2 flex items-center mt-2">
              <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
            </div>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-xl text-gray-500">Address 2</p>
            <div className="border border-gray-300 p-2 flex items-center mt-2">
              <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
            </div>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-xl text-gray-500">City</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>

              <div className="w-1/2">
                <p className="text-xl text-gray-500">State</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-xl text-gray-500">Postal Code</p>
                <div className="border border-gray-300 p-2 flex items-center mt-2">
                  <input type="text" className="w-full h-8 bg-transparent focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2 h-6 w-6 transform scale-150"
              id="sameAddressCheckbox"
            />
            <label htmlFor="sameAddressCheckbox" className="text-lg whitespace-nowrap">
              My shipping and billing address are the same
            </label>
          </div>
        </div>
      </section>
  
      {/* Button */}
      <div className="flex justify-center"> {/* Centering wrapper */}
        <button className="my-2 mt-4 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
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