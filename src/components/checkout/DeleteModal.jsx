import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DeleteModal = ({
  isOpen,
  loader,
  setIsOpen,
  onDeleteHandler,
  itemName = "this item",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center bg-black/20 bg-opacity-40">
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
                Delete Confirmation
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete <strong>{itemName}</strong>?
                This action cannot be undone.
              </Dialog.Description>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 hover:cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onDeleteHandler}
                  className="px-4 py-2 hover:cursor-pointer text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  {loader ? "Deleting...." : "Delete"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
