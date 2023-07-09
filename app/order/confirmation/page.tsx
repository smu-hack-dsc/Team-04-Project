import Black from '../images/black.png';
import Tick from '../images/vecteezy_tick-icon-accept-approve-sign-design-free-png_20906151_832.png';

const Page = () => {
  return (
    <section className="fontlato">
      <div className="h-20 bg-gray-200"></div> {/* Navigation Bar Section */}

      <div className="flex items-center justify-center flex-col mt-24">
        <img src={Tick.src} alt="tick" className="h-40 w-40 mr-2" />
      </div>

      <div className="flex items-center justify-center flex-col mt-4">
        <h1 className="text-2xl font-bold text-center">Thanks for your order!</h1>
        <p className="text-lg text-center text-gray-500 mt-4">Your order confirmation has been sent to email@gmail.com</p>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button className="my-2 mt-20 box-border text-sm py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-black
          bg-white text-black hover:bg-black hover:text-white">
          <div className="uppercase flex items-center justify-center">
            Back to shopping
          </div>
        </button>
      </div>

    </section>
  );
};

export default Page;
