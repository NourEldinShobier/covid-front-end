import { useEffect, useState } from "react";
import { LogEntry } from "../../../../infrastructure/logs";
import { ViewEntryModal } from "./view-entry-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from "../../../../../app/root.store";
import { useObserver } from "mobx-react";

export function LogsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | undefined>();
  const { getAccessTokenSilently } = useAuth0();
  const { logsStore } = useStores();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      logsStore.getUserLogs(token);
    });
  }, []);

  function openModal(entry: LogEntry) {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return useObserver(() => (
    <div className="my-8">
      <ViewEntryModal
        open={isModalOpen}
        entry={selectedEntry}
        closeModal={closeModal}
      />
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Logs</h3>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="border-gray-200 border-2 overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Temperature
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Show</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logsStore.userLogs.map((entry, index) => {
                    return (
                      <tr key={`${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(entry.date).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.location.long} - {entry.location.lat}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.temperature}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              openModal(entry);
                            }}
                            className="text-gray-500 hover:text-gray-900 font-semibold"
                          >
                            Show
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
