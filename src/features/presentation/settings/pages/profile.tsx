import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from "../../../../app/root.store";
import { ALert } from "../../../shared/components";

export function ProfilePage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const { userStore } = useStores();

  const [alertValue, setAlertValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState(user!.name!);

  function nameOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    setName(e.target.value);
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();

    const result = await userStore.updateUser(token, { name });

    result.ifSuccess((v) => {
      setAlertValue("Update profile successfully.");
      setShowAlert(true);
    });
  }

  return (
    <div className="min-h-full">
      <div className="py-10 h-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="flex-1 xl:overflow-y-auto">
              <div className="max-w-3xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold">Profile</h1>
                {showAlert && (
                  <div className="mt-6">
                    <ALert content={alertValue} kind={"success"} />
                  </div>
                )}
                <form
                  onSubmit={onSubmitHandler}
                  className="mt-2 space-y-8 divide-y divide-y-blue-gray-200"
                >
                  <div className="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                      <h2 className="text-xl font-medium text-slate-600">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        This information will be used to communicate with you.
                      </p>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-blue-gray-900"
                      >
                        Email address
                      </label>
                      <input
                        readOnly
                        value={user!.email}
                        type="text"
                        name="email-address"
                        autoComplete="email"
                        className="bg-gray-100 border-gray-300 mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium text-blue-gray-900"
                      >
                        Full name
                      </label>
                      <input
                        onChange={nameOnChange}
                        value={name}
                        type="text"
                        name="full-name"
                        autoComplete="family-name"
                        className="border-gray-300 mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
