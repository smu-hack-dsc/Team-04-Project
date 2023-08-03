'use client';
import BrowsingCard from "../_components/BrowsingCard";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import type { NextPage } from "next";
import axios from 'axios'
import { genPreviewOperationsStyle } from "antd/es/image/style";
const sortOptions = [
  { name: 'Popularity', href: '#', current: true },
  { name: 'Latest Arrival', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const filtersOptions = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'Gucci', label: 'Gucci', checked: false },
      { value: 'Jacquemus', label: 'Jacquemus', checked: false },
      { value: 'Yves Saint Laurent', label: 'Yves Saint Laurent', checked: true },
      { value: 'Hermès', label: 'Hermès', checked: false },
      { value: 'Chanel', label: 'Chanel ', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const RentPage: NextPage = () => {
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const [colorOptions, setColorOptions] = useState(filtersOptions.find(option => option.id === 'color')?.options || []);
  const [gridColumns, setGridColumns] = useState(4);
  const toggleGridColumns = () => {
    setGridColumns(prevColumns => (prevColumns === 4 ? 3  : 4));
  };


  const handleColorOptionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFiltersDropdownOpen(false); // Close the Filters dropdown
    setColorOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index].checked = !updatedOptions[index].checked;
      return updatedOptions;
    });
  };

  let cols, gap, mdColumns;

  if (gridColumns === 4) {
    cols = 1;
    mdColumns = 4;
    gap = 3;
  } else if (gridColumns === 3) {
    mdColumns = 3;
    cols = 1;
    gap = 3; 
  }

  const gridClass = `grid grid-cols-${cols} gap-3 md:grid-cols-${mdColumns}`;

  const [productArr, setProductArr] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {

      try {
        const response = await axios.get('http://localhost:5000/api/product');
        //get product details
        for (const item of response.data) {
          const productId = item["product_id"]
          setProductArr((prevProductArr => [...prevProductArr, productId]));
          console.log(productId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromBackend();
  }, []);
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-10 lg:max-w-7xl lg:px-8">
        <div className="flex items-baseline justify-between pb-8">
          <h1 className="text-2xl uppercase tracking-[2.4px] mt-5">All Products</h1>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort By
                  <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}

                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>


            <Menu as="div" className="px-4 relative inline-block text-left">
              <div>
                <Menu.Button onClick={() => setFiltersDropdownOpen(false)} className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Filters
                  <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items static className="absolute right-0 z-10 mt-2 w-60 origin-top-right bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {filtersOptions.map((option) => (
                      <Menu.Item key={option.id}>
                        {({ active }) => (
                          <div>
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    onClick={event => {
                                      event.stopPropagation();
                                      setFiltersDropdownOpen(false);
                                    }}
                                    className={classNames(
                                      'flex items-center justify-between w-full text-gray-500',
                                      active ? 'bg-gray-100' : '',
                                      'px-4 py-2 text-sm'
                                    )}
                                  >
                                    <span>{option.name}</span>
                                    <span>
                                      {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                      ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                  <Disclosure.Panel>
                                    <div className="pl-4">
                                      {option.options.map((subOption, index) => (
                                        <label
                                          key={subOption.value}
                                          className={classNames(
                                            'flex items-center',
                                            subOption.checked ? 'font-medium text-gray-900' : 'text-gray-500',
                                            'block px-4 py-2 text-sm'
                                          )}
                                        >
                                          <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={subOption.checked}
                                            onChange={(event) => handleColorOptionChange(index, event)}
                                          />
                                          {subOption.label}
                                        </label>
                                      ))}
                                      {option.name === 'Price' && (
                                        <>
                                          <div className="border-gray-200 items-center py-2">
                                            <div className="flex px-4 gap-2">
                                              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">$</span>

                                                <input
                                                  type="number"
                                                  id="FilterPriceFrom"
                                                  placeholder="From"
                                                  className="w-full border-gray-200 shadow-sm sm:text-sm"
                                                />
                                              </label>

                                              <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                <span className="text-sm text-gray-600">$</span>

                                                <input
                                                  type="number"
                                                  id="FilterPriceTo"
                                                  placeholder="To"
                                                  className="w-full border-gray-200 shadow-sm sm:text-sm"
                                                />
                                              </label>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>


            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-300 sm:ml-7"
              onClick={toggleGridColumns}
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div>
            <div  className={gridClass}>
              {productArr.map((item, index) => (
                <BrowsingCard productId={productArr[index]} />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default RentPage;
