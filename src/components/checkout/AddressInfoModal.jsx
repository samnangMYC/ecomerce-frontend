import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function AddressInfoModal({ address, isOpen, setIsOpen, children }) {
 //console.log("Address"+ address);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center bg-black/20 bg-opacity-40">
          {/* Trick to center the modal */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900"
              >
                {!address ? "Add New Address " : "Update Address"}
          

              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-gray-500">
                {/* Optional description */}
                Enter your full address information
              </Dialog.Description>

              <div className="mt-4">{children}</div>


            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
