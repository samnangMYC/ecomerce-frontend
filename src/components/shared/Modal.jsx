import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X, ShoppingCart } from "lucide-react";

const Modal = ({ title, isOpen, setIsOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-200"
    >
      {/* Overlay */}
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 flex justify-end">
        <DialogPanel
          transition
          className="w-screen max-w-xl transform transition duration-500 ease-in-out data-closed:translate-x-full"
        >
          <div className="flex h-full flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-b-indigo-600">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
                <h2 className="text-lg font-semibold text-indigo-600">{title}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-red-500" />
              </button>
            </div>
            {children}

          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
