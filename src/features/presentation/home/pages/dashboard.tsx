import { LogsTable, PatientsMap, Toolbar } from "../components";

export function DashboardPage() {
  return (
    <div className="py-10 h-full">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <Toolbar />
          <PatientsMap />
          <LogsTable />
        </div>
      </div>
    </div>
  );
}
