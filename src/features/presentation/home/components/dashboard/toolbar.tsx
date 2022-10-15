import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateEntryModal } from "./create-entry-modal";

export function Toolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth0();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="md:flex md:items-center md:justify-between">
      <CreateEntryModal open={isModalOpen} closeModal={closeModal} />
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
          Welcome, {user!.name}
        </h1>
      </div>
      <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
        <button
          onClick={openModal}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Add Entry
        </button>
      </div>
    </div>
  );
}
