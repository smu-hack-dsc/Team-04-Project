import FirstComponent from '../images/Group 4.png';
import SecondComponent from '../images/Group 5.png';

const Page = () => {
  return (
    <section className="font=lato">
      <section className="h-20 bg-gray-200"></section> {/* Navigation Bar Section */}
      <div className="flex items-center justify-center mt-8"> {/* Padding adjustment */}
        <div className="flex items-center">
          <div className="w-24 flex-shrink-0 relative flex items-center">
            <p className="text-center text-2xl text-black mt-1">Shipping</p>
          </div>
          <div className="flex items-center ml-15"> {/* Margin and alignment adjustment */}
            <div className="relative flex items-center">
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
              <div className="w-40 h-8 flex items-center justify-center">
                <img src={FirstComponent.src} alt="Delivery" className="h-full object-cover absolute" />
              </div>
              <div className="h-full w-1 bg-gray-300 opacity-30"></div>
            </div>
            <p className="text-center text-2xl text-gray-500 opacity-50 mt-1">Delivery</p>
          </div>
          <div className="flex items-center ml-15"> {/* Margin and alignment adjustment */}
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
    </section>
  );
};

export default Page;
