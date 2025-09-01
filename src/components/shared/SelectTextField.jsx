import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import React from "react";
const SelectTextField = ({
  id,
  label,
  selected,
  setSelect,
  lists = [],
  error,
}) => {
  return (
    <Listbox value={selected} onChange={setSelect}>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="id" className="font-semibold text-sm text-slate-800">
          {label}
        </label>

        <div className="relative">
          <ListboxButton
            className={`relative text-sm py-2 rounded-md border border-slate-700  w-full cursor-default  bg-white  text-left text-gray-600 sm:text-sm sm:leading-6`}
          >
            <span className="block truncate ps-2">
              {selected?.categoryName}
            </span>
          </ListboxButton>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <ListboxOptions
              transition
              className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 ring-black focus:outline-hidden"
            >
              {lists?.map((category) => (
                <ListboxOption
                  key={category.categoryId}
                  value={category}
                  className="group relative cursor-default py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate font-semibold group-data-selected:font-semibold">
                    {category.categoryName}
                  </span>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                    <FaCheck className="text-xl" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

export default SelectTextField;
