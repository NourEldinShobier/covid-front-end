import "./App.css";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "../features/presentation/auth";
import { DashboardPage } from "../features/presentation/home/pages";
import { ProfilePage } from "../features/presentation/settings";
import { Navbar } from "../features/shared/components";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <ProtectedRoute component={DashboardPage} path="/" exact />
        <ProtectedRoute component={ProfilePage} path="/profile" />
      </Switch>
    </div>
  );
}

export default App;
