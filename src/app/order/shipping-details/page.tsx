import FirstComponent from '../images/Group 4.png';
import SecondComponent from '../images/Group 5.png';
import Image from 'next/image';
import { CheckCircleFill } from "react-bootstrap-icons";
import Link from 'next/link';

const Page = () => {
    const countryCodeArr=[
      "+65", // Singapore
      "+60", // Malaysia
      "+62", // Indonesia
      "+66", // Thailand
      "+84", // Vietnam
      "+95", // Myanmar
      "+855", // Cambodia
      "+856", // Laos
      "+673", // Brunei
      "+63", // Philippines
      "+91", // India
      "+92", // Pakistan
      "+880", // Bangladesh
      "+94", // Sri Lanka
      "+86", // China
      "+82", // South Korea
      "+81", // Japan
      "+855", // Cambodia
      "+670", // East Timor
      "+971", // United Arab Emirates
    ];

  return (
    <div className="py-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contact Information */}
        <div className="px-20 py-5">
          <div className="flex items-center">
            <Image src="/images/1-circle.svg" width ={25} height={25} alt="Icon 1" className="mr-2" />
            <p className="text">CONTACT INFORMATION</p>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <p className="text-sm text-gray-500">First Name</p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
              </div>

              <div className="w-1/2 pl-2">
                <p className="text-sm text-gray-500">Last Name</p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Email</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
            />
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Phone Number</p>
            <div className='flex flex-cols'>
            <select
              name="countryCode"
              className="focus:outline-none border border-gray-300 border-1 w-24 px-2 h-8 me-2 text-sm"
              style={{ paddingTop: '0.15rem', paddingBottom: '0.15rem', marginTop: '-0.15rem', verticalAlign: 'middle'}}
            >
                {countryCodeArr.map((countryCode, index) =>(
                  <option key={index} value={countryCode} className='text-sm'>{countryCode}</option>
                ))}
              </select>
              <input type="number" name="password" className='outline-none border border-gray-300 border-1 w-full h-8 p-2 ms-2'/>
            </div>
          </div>
        </div>


        {/* Shipping Address */}
        <div className="px-20 py-5">
          <div className="flex items-center">
            <Image src="/images/2-circle.svg" alt="Icon 2" className="mr-2" height={25} width={25}/>
            <p className="text">SHIPPING ADDRESS</p>
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Address 1</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
            />
          </div>

          <div className="mr-4 mt-4">
            <p className="text-sm text-gray-500">Address 2</p>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
            />
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-sm text-gray-500">City</p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
              </div>

              <div className="w-1/2">
                <p className="text-sm text-gray-500">State</p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mr-4 mt-4">
            <div className="flex">
              <div className="w-1/2 mr-4">
                <p className="text-sm text-gray-500">Postal Code</p>
                <input
                  type="text"
                  className="border border-gray-300 p-2 w-full h-8 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>


          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 transform scale-75 appearance-none border border-black checked:bg-black checked:border-black focus:ring-0"
              id="sameAddressCheckbox"
            />
            <label htmlFor="sameAddressCheckbox" className="text-sm text-black focus:text-black focus: ring-0">
              My shipping and billing address are the same
            </label>
          </div>
        </div>
      </div>

      {/* Button */}
      <Link href="/order/delivery-details" className='flex justify-center m-4 text-base'>
        <button className="my-2 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black">
          <div className="uppercase flex items-center justify-center">
            Continue
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Page;
