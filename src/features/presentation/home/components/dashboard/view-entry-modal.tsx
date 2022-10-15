import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LogEntry } from "../../../../infrastructure/logs";

interface Props {
  open: boolean;
  closeModal: () => void;
  entry?: LogEntry;
}

export function ViewEntryModal({ open, closeModal, entry }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-lg leading-6 font-medium text-gray-900"
                  >
                    Log Entry
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="mt-2 py-3 space-y-8 divide-y divide-y-blue-gray-200">
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Temperature
                          </label>
                          <input
                            value={entry?.temperature}
                            type="text"
                            name="temperature"
                            autoComplete="temperature"
                            readOnly={true}
                            className="bg-gray-100 border-gray-300 mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Symptoms
                          </label>
                          <div className="mt-1">
                            <textarea
                              value={entry?.symptoms}
                              name="description"
                              rows={4}
                              readOnly={true}
                              className="bg-gray-100 border-gray-300 block w-full border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                            />
                          </div>
                          <p className="mt-3 text-sm text-blue-gray-500">
                            Brief description for your symptoms.
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
