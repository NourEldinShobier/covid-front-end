import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { ALert } from "../../../../shared/components";
import { useStores } from "../../../../../app/root.store";

interface Props {
  open: boolean;
  closeModal: () => void;
}

export function CreateEntryModal({ open, closeModal }: Props) {
  const { logsStore } = useStores();

  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [temperature, setTemperature] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string>("");

  const [alertValue, setAlertValue] = useState("");
  const [alertKind, setAlertKind] = useState<"success" | "error">("success");
  const [showAlert, setShowAlert] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) {
          setCoords(location.coords);
        }
      });
    }
  }, []);

  function temperatureOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setTemperature(e.target.value);
  }

  function symptomsOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    setSymptoms(e.target.value);
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkLocationAvailablity()) {
      return;
    }

    const token = await getAccessTokenSilently();
    const result = await logsStore.createLogEntry(token, {
      temperature,
      symptoms,
      date: new Date().toISOString(),
      location: {
        long: coords!.longitude!,
        lat: coords!.latitude!,
      },
    });

    result.ifSuccess((v) => {
      setAlertValue("Created entry successfully.");
      setAlertKind("success");
      setShowAlert(true);

      clearForm();
    });
  }

  function checkLocationAvailablity() {
    if (!coords) {
      setAlertValue("Please allow location tracking.");
      setAlertKind("error");
      setShowAlert(true);

      return false;
    }

    return true;
  }

  function clearForm() {
    setTemperature("");
    setSymptoms("");
  }

  function resetForm() {
    clearForm();
    setShowAlert(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          resetForm();
          closeModal();
        }}
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
                    Created New Entry
                  </Dialog.Title>
                  {showAlert && (
                    <div className="mt-6">
                      <ALert content={alertValue} kind={alertKind} />
                    </div>
                  )}
                  <div className="mt-2">
                    <form
                      onSubmit={onSubmitHandler}
                      className="mt-2 py-3 space-y-8 divide-y divide-y-blue-gray-200"
                    >
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium text-blue-gray-900"
                          >
                            Temperature
                          </label>
                          <input
                            value={temperature}
                            onChange={temperatureOnChange}
                            type="number"
                            name="temperature"
                            autoComplete="temperature"
                            className="border-gray-300 mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-gray-900 focus:border-gray-900"
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
                              value={symptoms}
                              onChange={symptomsOnChange}
                              name="description"
                              rows={4}
                              className="border-gray-300 block w-full border border-blue-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                              defaultValue={""}
                            />
                          </div>
                          <p className="mt-3 text-sm text-blue-gray-500">
                            Brief description for your symptoms.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-800 hover:bg-gray-900 focus:ring-gray-900 sm:col-start-2 sm:text-sm"
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => {
                            resetForm();
                            closeModal();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
