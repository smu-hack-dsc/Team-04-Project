'use client';
import BrowsingCard from "../_components/BrowsingCard";
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import type { NextPage } from "next";
import axios from 'axios'
import { genPreviewOperationsStyle } from "antd/es/image/style";
import debounce from 'lodash/debounce';

const sortOptions = [
  { name: 'Popularity', href: '#', current: true },
  { name: 'Latest Arrival', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const filtersOptions = [
  {
    id: 'colour',
    name: 'Colour',
    options: [
      { value: 'White', label: 'White', checked: false },
      { value: 'Beige', label: 'Beige', checked: false },
      { value: 'Black', label: 'Black', checked: false },
      { value: 'Brown', label: 'Brown', checked: false },
      { value: 'Green', label: 'Green', checked: false },
      { value: 'Purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'Gucci', label: 'Gucci', checked: false },
      { value: 'Jacquemus', label: 'Jacquemus', checked: false },
      { value: 'Yves Saint Laurent', label: 'Yves Saint Laurent', checked: false },
      { value: 'Hermès', label: 'Hermès', checked: false },
      { value: 'Chanel', label: 'Chanel ', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'XXS', label: 'XXS', checked: false },
      { value: 'XS', label: 'XS', checked: false },
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
      { value: 'XXL', label: 'XXL', checked: false },
    ],
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'Tops', label: 'Tops', checked: false },
      { value: 'Suits', label: 'Suits', checked: false },
      { value: 'Outerwear', label: 'Outerwear', checked: false },
      { value: 'Jackets & Vests', label: 'Jackets & Vests', checked: false },
      { value: 'Accessories', label: 'Accessories', checked: false },
      { value: 'Dresses', label: 'Dresses', checked: false },
    ],
  },
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'male', label: 'Male', checked: false },
      { value: 'female', label: 'Female', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
    ],
  },

];

type FilterOption = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const RentPage: NextPage = () => {

  // useEffect(() => {

  //   const productIds = sessionStorage.getItem("productList");
  //   const storedProductIdsArray = productIds.split(',').map(Number);
  //   console.log(productIds);

  //   const apiUrl = `http://localhost:5000/api/product/by_ids?product_id=${storedProductIdsArray.join('&product_id=')}`;

  //   axios.get(apiUrl)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>(filtersOptions);
  const [colourOptions, setcolourOptions] = useState(filtersOptions.find(option => option.id === 'colour')?.options || []);
  const [gridColumns, setGridColumns] = useState(4);
  const toggleGridColumns = () => {
    setGridColumns(prevColumns => (prevColumns === 4 ? 3 : 4));

    const debouncedFetchFilteredProducts = debounce(fetchFilteredProducts, 500);

    const handlePriceInputChange = (e, field) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        if (field === 'min') {
          setPriceMin(value);
        } else if (field === 'max') {
          setPriceMax(value);
        }
        // Call the debounced function instead of fetchFilteredProducts directly
        debouncedFetchFilteredProducts(checkboxState);
      }
    }
  };
  const initialCheckboxState = filtersOptions.reduce((acc, option) => {
    acc[option.id] = {
      options: option.options.reduce((subAcc, subOption) => {
        subAcc[subOption.value] = subOption.checked;
        return subAcc;
      }, {}),
    };
    return acc;
  }, {});


  const [checkboxState, setCheckboxState] = useState(initialCheckboxState);
  const performFilterRequest = () => {
    // Your fetchFilteredProducts function here
    fetchFilteredProducts(checkboxState);
  };
  const debouncedPerformFilterRequest = debounce(performFilterRequest, 500); // 500 milliseconds debounce delay (adjust as needed)

  const handleOptionChange = (optionId, subOptionValue, event) => {
    const isChecked = event.target.checked;
    event.stopPropagation()
    setCheckboxState((prevState) => ({
      ...prevState,
      [optionId]: {
        options: {
          ...prevState[optionId].options,
          [subOptionValue]: isChecked,
        },
      },
    }));
    fetchFilteredProducts({
      ...checkboxState,
      [optionId]: {
        ...checkboxState[optionId],
        options: {
          ...checkboxState[optionId].options,
          [subOptionValue]: isChecked,
        },
      },
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
  let storedSearchedProducts = JSON.parse(sessionStorage.getItem('searchedProducts'));
  if (!storedSearchedProducts) {
    storedSearchedProducts = [];
  }
  if (storedSearchedProducts.length > 0) {
    sessionStorage.removeItem('searchedProducts');
  }
  // console.log("STORED RENT " + storedSearchedProducts)
  const [filteredProducts, setFilteredProductsArr] = useState(storedSearchedProducts);
  // console.log("FILTERED " + filteredProducts)
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(Number.MAX_SAFE_INTEGER);
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]); // Initialize with the default sort option

  useEffect(() => {
    fetchFilteredProducts(checkboxState);
  }, [selectedSortOption]);

  const fetchFilteredProducts = (checkboxState) => {
    if (storedSearchedProducts.length > 0) {
      setFilteredProductsArr(storedSearchedProducts)
    }
    else {
      const selectedColours = Object.keys(checkboxState.colour.options).filter((colour) => checkboxState.colour.options[colour]);
      const selectedBrands = Object.keys(checkboxState.brand.options).filter((brand) => checkboxState.brand.options[brand]);
      const selectedSizes = Object.keys(checkboxState.size.options).filter((size) => checkboxState.size.options[size]);
      const selectedTypes = Object.keys(checkboxState.type.options).filter((type) => checkboxState.type.options[type]);
      const selectedGender = Object.keys(checkboxState.gender.options).filter((gender) => checkboxState.gender.options[gender]);
      axios
        .get('http://localhost:5000/api/product/filter', {
          params: {
            brand: selectedBrands,
            size: selectedSizes,
            colour: selectedColours,
            type: selectedTypes,
            gender: selectedGender,
            price_min: priceMin,
            price_max: priceMax,
          },
        })
        .then((response) => {
          if (response.data.products && response.data.products.length > 0) {
            const filteredProductIds = response.data.products.map((item) => item.product_id);

            // Sort the products based on the selected sort option
            const sortedFilteredProductIds = filteredProductIds.slice();
            if (selectedSortOption.name === 'Price: Low to High') {
              sortedFilteredProductIds.sort((a, b) => {
                const productA = response.data.products.find((item) => item.product_id === a);
                const productB = response.data.products.find((item) => item.product_id === b);
                return productA.price - productB.price;
              });
            } else if (selectedSortOption.name === 'Price: High to Low') {
              sortedFilteredProductIds.sort((a, b) => {
                const productA = response.data.products.find((item) => item.product_id === a);
                const productB = response.data.products.find((item) => item.product_id === b);
                return productB.price - productA.price;
              });
            }

            setFilteredProductsArr(sortedFilteredProductIds);
           
          } else {
            setFilteredProductsArr([]); // Empty array if there is no data
          }

        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setFilteredProductsArr([]); // Empty array if there is an error
        });
    }
  };


  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-10 lg:max-w-7xl lg:px-8">
        <div className="flex items-baseline justify-between pb-8">
          <h1 className="text-2xl uppercase tracking-[2.4px] mt-5">Products</h1>
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
                            onClick={() => {
                              setSelectedSortOption(option);
                              fetchFilteredProducts(checkboxState); // Refetch filtered products with new sorting
                            }}
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
                                            checked={checkboxState[option.id]?.options[subOption.value] || false}
                                            onChange={(event) => handleOptionChange(option.id, subOption.value, event)}
                                          />
                                          {subOption.label}
                                        </label>
                                      ))}
                                      {option.name === 'Price' && (
                                        <>
                                          <div className="border-gray-200 items-center py-2">
                                            <div className="flex px-4 gap-2">
                                              <label htmlFor="FilterPriceFrom" className="flex items-center gap-2" onClick={(e) => e.stopPropagation()} >
                                                <span className="text-sm text-gray-600">$</span>

                                                <input
                                                  type="number"
                                                  id="FilterPriceFrom"
                                                  placeholder="From"
                                                  className="w-full border-gray-200 shadow-sm sm:text-sm"
                                                  value={priceMin}
                                                  onChange={(e) => {
                                                    setPriceMin(parseInt(e.target.value));
                                                    debouncedPerformFilterRequest(); // Call the debounced function after setting the state
                                                  }}
                                                />
                                              </label>

                                              <label htmlFor="FilterPriceTo" className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                <span className="text-sm text-gray-600">$</span>

                                                <input
                                                  type="number"
                                                  id="FilterPriceTo"
                                                  placeholder="To"
                                                  className="w-full border-gray-200 shadow-sm sm:text-sm"
                                                  value={priceMax}
                                                  onChange={(e) => {
                                                    setPriceMax(parseInt(e.target.value));
                                                    debouncedPerformFilterRequest(); // Call the debounced function after setting the state
                                                  }}

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
        <div className={gridClass}>
          {filteredProducts.map((productId, index) => {
            return (
              <BrowsingCard key={index} productId={productId} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RentPage;
